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
        message: "Quote request registered.",
      });
    }

    // 4. Field Extraction & Sanitization
    const productInterest = cleanString(body.productInterest || "Pure Tung Oil", 200);
    const name = cleanString(body.name, 150);
    const businessName = cleanString(body.businessName, 200);
    const email = cleanString(body.email, 255).toLowerCase();
    const phone = sanitizePhone(body.phone);
    const customerType = cleanString(body.customerType || "Cabinetmaker / Furniture Maker", 100);
    const estimatedQuantity = cleanString(body.estimatedQuantity || "5 – 20 Litres", 100);
    const intendedApplication = cleanString(body.intendedApplication || "Solid Furniture & Tables", 150);
    const message = cleanString(body.message, 5000);

    const errors: Record<string, string> = {};
    if (!name || name.length < 2) errors.name = "Your name is required.";
    if (!businessName || businessName.length < 2) errors.businessName = "Workshop or company name is required.";
    if (!email || !isValidEmail(email)) errors.email = "A valid professional email is required.";
    if (!message || message.length < 5) errors.message = "Project specifications and details are required.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed.", details: errors }, { status: 422 });
    }

    // 5. Database Persistence
    const referenceId = `NG-QTE-${Math.floor(100000 + Math.random() * 900000)}`;
    let recordId = crypto.randomUUID();
    let dbSaved = false;

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        const { data: dbData, error: dbError } = await supabase
          .from("quote_requests")
          .insert({
            product_interest: productInterest,
            name,
            business_name: businessName,
            email,
            phone: phone || null,
            customer_type: customerType,
            estimated_quantity: estimatedQuantity,
            intended_application: intendedApplication,
            message,
            status: "new",
            email_notification_status: "pending",
            customer_acknowledgement_status: "pending",
            ip_hash: escapeHtml(ip).slice(0, 64),
          })
          .select("id")
          .single();

        if (dbError) {
          console.error("[Supabase Error - Quote]", dbError);
          return NextResponse.json(
            { error: "Database registration failed. Please try again." },
            { status: 500 }
          );
        }

        if (dbData?.id) {
          recordId = dbData.id;
          dbSaved = true;
        }
      }
    } else {
      console.warn(
        `[Dev Warning] Supabase is not configured. Simulating persistence for quote request: ${referenceId}`
      );
      dbSaved = true;
    }

    // 6. Resend Email Dispatch
    const emailResult = await sendEnquiryEmails({
      type: "quote",
      customerName: name,
      customerEmail: email,
      referenceId,
      subject: `Workshop Quote Request: ${productInterest} - ${businessName}`,
      details: {
        "Product Interest": productInterest,
        "Contact Person": name,
        "Workshop / Business": businessName,
        "Email Address": email,
        "Phone Number": phone || "Not Provided",
        "Customer Type": customerType,
        "Estimated Volume": estimatedQuantity,
        "Application": intendedApplication,
        "Project Specifications": message,
      },
    });

    // 7. Update Email Status in Supabase if saved
    if (dbSaved && isSupabaseConfigured()) {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        await supabase
          .from("quote_requests")
          .update({
            email_notification_status: emailResult.adminSent ? "sent" : "failed",
            customer_acknowledgement_status: emailResult.customerSent ? "sent" : "failed",
            email_error_message: emailResult.error || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", recordId);
      }
    }

    return NextResponse.json({
      success: true,
      referenceId,
      id: recordId,
      emailSent: emailResult.adminSent || emailResult.customerSent,
      message: "Your custom workshop quote request has been registered for technical evaluation.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("[Quote API Exception]", message);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your quote request." },
      { status: 500 }
    );
  }
}
