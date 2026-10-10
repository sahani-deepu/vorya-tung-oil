import { NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabaseServer";
import { sendEnquiryEmails } from "@/lib/resendServer";
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
        message: "Trade inquiry registered.",
      });
    }

    // 4. Field Extraction & Sanitization
    const name = cleanString(body.name, 150);
    const businessName = cleanString(body.businessName, 200);
    const email = cleanString(body.email, 255).toLowerCase();
    const phone = sanitizePhone(body.phone);
    const customerType = cleanString(body.customerType || "Cabinetmaker / Furniture Studio", 100);
    const estimatedQuantity = cleanString(body.estimatedQuantity || "5 – 20 Litres", 100);
    const intendedApplication = cleanString(body.intendedApplication || "Solid Wood Furniture", 150);
    const deliveryTimeline = cleanString(body.deliveryTimeline || "Standard Workshop Schedule", 100);
    const rawMessage = cleanString(body.message, 5000);
    const message = rawMessage || `Trade procurement request for ${estimatedQuantity} intended for ${intendedApplication}.`;
    const source = cleanString(body.source || "bulk_page", 50);

    const errors: Record<string, string> = {};
    if (!name || name.length < 2) errors.name = "Contact name is required (minimum 2 characters).";
    if (!businessName || businessName.length < 2) errors.businessName = "Workshop or business name is required.";
    if (!email || !isValidEmail(email)) errors.email = "A valid professional email is required.";
    if (rawMessage && rawMessage.length < 3) errors.message = "Project scope details must be at least 3 characters if provided.";

    if (Object.keys(errors).length > 0) {
      const errorSummary = Object.values(errors).join(" ");
      return NextResponse.json(
        { error: `Validation failed: ${errorSummary}`, details: errors },
        { status: 422 }
      );
    }

    // 5. Database Persistence Verification (Requirement 4: Fail with 500 if not configured)
    const referenceId = `NG-BLK-${Math.floor(100000 + Math.random() * 900000)}`;

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

    const { data: dbData, error: dbError } = await supabase
      .from("bulk_enquiries")
      .insert({
        source,
        name,
        business_name: businessName,
        email,
        phone: phone || null,
        customer_type: customerType,
        estimated_quantity: estimatedQuantity,
        intended_application: intendedApplication,
        delivery_timeline: deliveryTimeline || null,
        message,
        status: "new",
        email_notification_status: "pending",
        customer_acknowledgement_status: "pending",
        ip_hash: escapeHtml(ip).slice(0, 64),
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("[Supabase Error - Bulk]", dbError);
      return NextResponse.json(
        { error: "Database registration failed. Please try again." },
        { status: 500 }
      );
    }

    const recordId = dbData.id;

    // 6. Resend Email Dispatch
    const emailResult = await sendEnquiryEmails({
      type: "bulk",
      customerName: name,
      customerEmail: email,
      referenceId,
      subject: `B2B Procurement Request: ${businessName} (${estimatedQuantity})`,
      details: {
        "Contact Person": name,
        "Workshop / Business": businessName,
        "Email Address": email,
        "Phone Number": phone || "Not Provided",
        "Customer Classification": customerType,
        "Estimated Volume": estimatedQuantity,
        "Primary Application": intendedApplication,
        "Required Timeline": deliveryTimeline,
        "Portal Source": source === "homepage_b2b" ? "Homepage B2B Section" : "Dedicated Bulk Procurement Portal",
        "Timber Species & Scope": message,
      },
    });

    // 7. Update Email Status in Supabase
    await supabase
      .from("bulk_enquiries")
      .update({
        email_notification_status: emailResult.adminSent ? "sent" : "failed",
        customer_acknowledgement_status: emailResult.customerSent ? "sent" : "failed",
        email_error_message: emailResult.error || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", recordId);

    return NextResponse.json({
      success: true,
      referenceId,
      id: recordId,
      emailSent: emailResult.adminSent || emailResult.customerSent,
      message: "Your trade requirement has been successfully registered in the B2B procurement ledger.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("[Bulk API Exception]", message);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your procurement request." },
      { status: 500 }
    );
  }
}
