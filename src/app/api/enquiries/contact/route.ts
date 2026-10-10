import { NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabaseServer";
import { sendEnquiryEmails } from "@/lib/resendServer";
import { syncToGoogleSheet } from "@/lib/googleSheetServer";
import {
  checkRateLimit,
  cleanString,
  isValidEmail,
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
      // Spam detected, return silent fake success
      return NextResponse.json({
        success: true,
        referenceId: `NG-SPAM-${Date.now().toString(36).toUpperCase()}`,
        message: "Enquiry recorded.",
      });
    }

    // 4. Field Extraction & Validation
    const name = cleanString(body.name, 150);
    const email = cleanString(body.email, 255).toLowerCase();
    const subject = cleanString(body.subject || "General Technical Inquiry", 200);
    const timberSpecies = cleanString(body.timberSpecies, 200);
    const message = cleanString(body.message, 5000);

    const errors: Record<string, string> = {};
    if (!name || name.length < 2) errors.name = "Full name is required (minimum 2 characters).";
    if (!email || !isValidEmail(email)) errors.email = "A valid professional email address is required.";
    if (!message || message.length < 5) errors.message = "Message details are required (minimum 5 characters).";

    if (Object.keys(errors).length > 0) {
      const errorSummary = Object.values(errors).join(" ");
      return NextResponse.json(
        { error: `Validation failed: ${errorSummary}`, details: errors },
        { status: 422 }
      );
    }

    // 5. Database Persistence Verification (Requirement 4: Fail with 500 if not configured)
    const referenceId = `NG-CNT-${Math.floor(100000 + Math.random() * 900000)}`;

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
      .from("contact_enquiries")
      .insert({
        name,
        email,
        subject,
        timber_species: timberSpecies || null,
        message,
        status: "new",
        email_notification_status: "pending",
        customer_acknowledgement_status: "pending",
        ip_hash: escapeHtml(ip).slice(0, 64),
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("[Supabase Error - Contact]", dbError);
      return NextResponse.json(
        { error: "Database registration failed. Please try again." },
        { status: 500 }
      );
    }

    const recordId = dbData.id;

    // 6. Resend Email Dispatch
    const emailResult = await sendEnquiryEmails({
      type: "contact",
      customerName: name,
      customerEmail: email,
      referenceId,
      subject: `General Inquiry: ${subject}`,
      details: {
        "Contact Name": name,
        "Email Address": email,
        Subject: subject,
        "Timber Species Under Review": timberSpecies || "Not Specified",
        "Inquiry Message": message,
      },
    });

    // 7. Update Email Status in Supabase
    await supabase
      .from("contact_enquiries")
      .update({
        email_notification_status: emailResult.adminSent ? "sent" : "failed",
        customer_acknowledgement_status: emailResult.customerSent ? "sent" : "failed",
        email_error_message: emailResult.error || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", recordId);

    // 8. Google Sheet Real-time Sync (Non-blocking)
    await syncToGoogleSheet({
      formType: "contact",
      id: recordId,
      referenceId,
      name,
      email,
      subject,
      timberSpecies: timberSpecies || "",
      message,
      status: "new",
      emailStatus: emailResult.adminSent ? "sent" : "failed",
    });

    return NextResponse.json({
      success: true,
      referenceId,
      id: recordId,
      emailSent: emailResult.adminSent || emailResult.customerSent,
      message: "Your inquiry has been successfully registered in the atelier ledger.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("[Contact API Exception]", message);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your inquiry." },
      { status: 500 }
    );
  }
}
