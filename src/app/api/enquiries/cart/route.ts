import { NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabaseServer";
import { sendEnquiryEmails } from "@/lib/resendServer";
import { syncToGoogleSheet } from "@/lib/googleSheetServer";
import { verifyAndCalculateCart } from "@/lib/pricingServer";
import {
  checkRateLimit,
  cleanString,
  isValidEmail,
  sanitizePhone,
  escapeHtml,
} from "@/lib/validation";

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting Check
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        { error: "Too many submission attempts. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    // 2. Body Parsing
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    // 3. Honeypot check
    if (body.honeypot || body.company_title_verification) {
      return NextResponse.json({
        success: true,
        referenceId: `NG-SPAM-${Date.now().toString(36).toUpperCase()}`,
        message: "Order inquiry registered.",
      });
    }

    // 4. Field Extraction & Sanitization
    const submissionType = cleanString(body.submissionType || "full_checkout", 50);
    const email = cleanString(body.email, 255).toLowerCase();
    const name = cleanString(body.name, 150);
    const company = cleanString(body.company, 200);
    const phone = sanitizePhone(body.phone);
    const address = cleanString(body.address, 255);
    const city = cleanString(body.city, 100);
    const postalCode = cleanString(body.postalCode, 30);
    const country = cleanString(body.country || "United States", 100);
    const notes = cleanString(body.notes, 3000);

    const resolvedCity = city || (address ? address.split(",")[0]?.trim() : "") || "Workshop Destination";
    const resolvedPostalCode = postalCode || "00000";

    const errors: Record<string, string> = {};
    if (!email || !isValidEmail(email)) {
      errors.email = "A valid contact email is required.";
    }

    if (submissionType === "full_checkout") {
      if (!name || name.length < 2) errors.name = "Full name is required (minimum 2 characters).";
      if (!phone || phone.length < 5) errors.phone = "A valid phone number (minimum 5 digits) is required for freight dispatch.";
      if (!address || address.length < 3) errors.address = "Shipping destination address is required (minimum 3 characters).";
    }

    if (Object.keys(errors).length > 0) {
      const errorSummary = Object.values(errors).join(" ");
      return NextResponse.json(
        { error: `Validation failed: ${errorSummary}`, details: errors },
        { status: 422 }
      );
    }

    // 5. Authoritative Server Pricing Validation & Calculation
    // Never trust client-submitted unit prices, currency formats, or calculated totals.
    const rawItems = Array.isArray(body.items) ? body.items : [];
    if (rawItems.length === 0) {
      return NextResponse.json(
        { error: "Your cart bag contains no items to quote." },
        { status: 422 }
      );
    }

    const pricingResult = verifyAndCalculateCart(rawItems);
    if (!pricingResult.isValid) {
      return NextResponse.json(
        { error: pricingResult.error || "Cart contains invalid products or variants." },
        { status: 422 }
      );
    }

    const { items: verifiedItems, subtotal, totalUnits } = pricingResult;

    // 6. Database Persistence Verification (Requirement 4: Fail with 500 if not configured)
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          error: "Database service is not configured. Missing Supabase credentials.",
          code: "SUPABASE_UNCONFIGURED",
        },
        { status: 500 }
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        {
          error: "Failed to initialize Supabase server client.",
          code: "SUPABASE_CLIENT_ERROR",
        },
        { status: 500 }
      );
    }

    const orderRef = `NG-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const { data: dbData, error: dbError } = await supabase
      .from("cart_orders")
      .insert({
        order_ref: orderRef,
        submission_type: submissionType,
        name: name || null,
        company: company || null,
        email,
        phone: phone || null,
        address: address || null,
        city: resolvedCity || null,
        postal_code: resolvedPostalCode || null,
        country: country || "United States",
        notes: notes || null,
        items: verifiedItems,
        subtotal,
        total_units: totalUnits,
        status: "new",
        email_notification_status: "pending",
        customer_acknowledgement_status: "pending",
        ip_hash: escapeHtml(ip).slice(0, 64),
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("[Supabase Error - Cart Order]", dbError);
      return NextResponse.json(
        { error: "Database registration failed. Please try again." },
        { status: 500 }
      );
    }

    const recordId = dbData.id;

    // 7. Resend Email Dispatch
    const emailResult = await sendEnquiryEmails({
      type: "cart",
      customerName: name || email,
      customerEmail: email,
      referenceId: orderRef,
      subject: `Batch Quote / Order Allocation: ${orderRef} (${totalUnits} Units)`,
      details: {
        "Order Reference": orderRef,
        "Submission Channel": submissionType === "drawer_quick_quote" ? "Slide-over Cart Drawer Quick Quote" : "Full Bag Checkout",
        "Customer Name": name || "Not Specified (Quick Quote)",
        "Company / Studio": company || "Individual Artisan",
        "Contact Email": email,
        "Contact Phone": phone || "Not Provided",
        "Destination Address": address ? `${address}, ${city}, ${postalCode}, ${country}` : "To be confirmed during freight dispatch",
        "Delivery Notes / Instructions": notes || "Standard dispatch",
      },
      cartSummary: {
        totalUnits,
        subtotal: subtotal > 0 ? `$${subtotal.toFixed(2)}` : "Custom Tier Quote Required",
        items: verifiedItems.map((item) => ({
          name: item.name,
          variant: item.variant,
          quantity: item.quantity,
          price: item.priceDisplay,
        })),
      },
    });

    // 8. Update Email Status in Supabase
    await supabase
      .from("cart_orders")
      .update({
        email_notification_status: emailResult.adminSent ? "sent" : "failed",
        customer_acknowledgement_status: emailResult.customerSent ? "sent" : "failed",
        email_error_message: emailResult.error || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", recordId);

    // 9. Google Sheet Real-time Sync (Non-blocking)
    const itemsSummary = verifiedItems
      .map((item) => `${item.name} (${item.variant}): Qty ${item.quantity} [${item.priceDisplay}]`)
      .join(" | ");

    await syncToGoogleSheet({
      formType: "cart",
      id: recordId,
      referenceId: orderRef,
      submissionType,
      name: name || "",
      company: company || "",
      email,
      phone: phone || "",
      address: address || "",
      city: resolvedCity,
      postalCode: resolvedPostalCode,
      country,
      totalUnits,
      subtotal,
      itemsSummary,
      notes: notes || "",
      status: "new",
      emailStatus: emailResult.adminSent ? "sent" : "failed",
    });

    return NextResponse.json({
      success: true,
      referenceId: orderRef,
      orderRef,
      id: recordId,
      subtotal,
      totalUnits,
      emailSent: emailResult.adminSent || emailResult.customerSent,
      message: "Your order bag has been registered for workshop quotation and dispatch coordination.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("[Cart Order API Exception]", message);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your order quotation." },
      { status: 500 }
    );
  }
}
