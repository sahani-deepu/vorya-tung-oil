import { Resend } from "resend";
import { escapeHtml } from "./validation";
import { BRAND } from "@/data/brandConfig";

let cachedResend: Resend | null = null;

export function isResendConfigured(): boolean {
  const apiKey = process.env.RESEND_API_KEY;
  return Boolean(apiKey && apiKey.startsWith("re_") && !apiKey.includes("your_resend"));
}

export function getResendClient(): Resend | null {
  if (!isResendConfigured()) {
    return null;
  }
  if (!cachedResend) {
    cachedResend = new Resend(process.env.RESEND_API_KEY);
  }
  return cachedResend;
}

export interface EmailDispatchOptions {
  type: "contact" | "bulk" | "quote" | "cart";
  customerName?: string;
  customerEmail: string;
  referenceId: string;
  subject: string;
  details: Record<string, string | number | undefined | null>;
  cartSummary?: {
    totalUnits: number;
    subtotal: string;
    items: Array<{ name: string; variant?: string; quantity: number; price: string }>;
  };
}

export interface EmailDispatchResult {
  adminSent: boolean;
  customerSent: boolean;
  error?: string;
}

/**
 * Generate luxury responsive HTML template for NOVA GRAIN emails
 */
function generateEmailHtml({
  title,
  subtitle,
  referenceId,
  recipientType,
  details,
  cartSummary,
}: {
  title: string;
  subtitle: string;
  referenceId: string;
  recipientType: "admin" | "customer";
  details: Record<string, string | number | undefined | null>;
  cartSummary?: EmailDispatchOptions["cartSummary"];
}): string {
  const detailRows = Object.entries(details)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(
      ([key, val]) => `
      <tr>
        <td style="padding: 9px 12px; font-weight: 600; color: #173A32; background-color: #FAF8F2; width: 35%; border-bottom: 1px solid #E8E3D9; font-size: 13px;">
          ${escapeHtml(key)}
        </td>
        <td style="padding: 9px 12px; color: #252A27; border-bottom: 1px solid #E8E3D9; font-size: 13px; line-height: 1.5;">
          ${escapeHtml(val)}
        </td>
      </tr>
    `
    )
    .join("");

  let cartSectionHtml = "";
  if (cartSummary && cartSummary.items.length > 0) {
    const itemRows = cartSummary.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #E8E3D9; font-size: 13px; color: #252A27;">
            <strong>${escapeHtml(item.name)}</strong>
            ${item.variant ? `<br><span style="font-size: 11px; color: #76513C;">${escapeHtml(item.variant)}</span>` : ""}
          </td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #E8E3D9; font-size: 13px; text-align: center; color: #252A27;">
            ${item.quantity}
          </td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #E8E3D9; font-size: 13px; text-align: right; color: #173A32; font-weight: 600;">
            ${escapeHtml(item.price)}
          </td>
        </tr>
      `
      )
      .join("");

    cartSectionHtml = `
      <div style="margin-top: 24px;">
        <h3 style="font-family: Georgia, serif; font-size: 18px; color: #173A32; margin-bottom: 10px; border-bottom: 2px solid #B77B51; padding-bottom: 4px;">
          Requested Order Bag Items (${cartSummary.totalUnits} Units)
        </h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <thead>
            <tr style="background-color: #173A32; color: #F7F4EC;">
              <th style="padding: 8px 12px; text-align: left; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Product</th>
              <th style="padding: 8px 12px; text-align: center; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Qty</th>
              <th style="padding: 8px 12px; text-align: right; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Est. Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
          <tfoot>
            <tr style="background-color: #FAF8F2;">
              <td colspan="2" style="padding: 10px 12px; font-weight: 700; color: #173A32; font-size: 14px;">Estimated Draft Subtotal</td>
              <td style="padding: 10px 12px; font-weight: 700; color: #173A32; font-size: 14px; text-align: right;">${escapeHtml(cartSummary.subtotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;
  }

  const customerGreeting =
    recipientType === "customer"
      ? `<p style="font-size: 14px; line-height: 1.6; color: #252A27; margin-bottom: 20px;">
          Thank you for contacting <strong>NOVA GRAIN</strong>. We have securely registered your enquiry in our atelier ledger under reference <strong>${escapeHtml(referenceId)}</strong>.
          Our technical finishing team reviews all submissions within <strong>1 business day</strong>.
        </p>`
      : `<p style="font-size: 14px; line-height: 1.6; color: #252A27; margin-bottom: 20px;">
          A new trade submission has been logged on the website with reference <strong>${escapeHtml(referenceId)}</strong>.
        </p>`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F7F4EC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #252A27;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #F7F4EC; padding: 24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" style="width: 100%; max-width: 620px; border-collapse: collapse; background-color: #FFFFFF; border: 1px solid #E8E3D9; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 12px rgba(23, 58, 50, 0.04);">
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #173A32; padding: 28px 32px; text-align: center; border-bottom: 4px solid #B77B51;">
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 24px; font-weight: 400; letter-spacing: 0.15em; color: #F7F4EC; text-transform: uppercase;">
                NOVA GRAIN
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #CA8E64; font-weight: 500;">
                Pure Tung Oil Atelier &amp; Architectural Finishes
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="font-family: Georgia, serif; font-size: 22px; color: #173A32; margin: 0 0 6px 0; font-weight: 400;">
                ${escapeHtml(title)}
              </h2>
              <p style="font-size: 13px; color: #76513C; margin: 0 0 20px 0; font-weight: 500;">
                ${escapeHtml(subtitle)} • Reference: <span style="font-family: monospace; font-weight: 700; color: #173A32;">${escapeHtml(referenceId)}</span>
              </p>

              ${customerGreeting}

              <div style="margin-top: 16px; border: 1px solid #E8E3D9; border-radius: 4px; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tbody>
                    ${detailRows}
                  </tbody>
                </table>
              </div>

              ${cartSectionHtml}

              <div style="margin-top: 28px; padding: 16px; background-color: #FAF8F2; border-left: 3px solid #B77B51; font-size: 12px; color: #76513C; line-height: 1.5;">
                <strong>Workshop Notice:</strong> Pure Tung Oil requires atmospheric oxygen polymerization and contains zero metallic driers. For application queries, review our Bench Protocol at <a href="https://novagrain.example.com/how-to-apply" style="color: #173A32; text-decoration: underline;">How to Apply Tung Oil</a>.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0E231E; padding: 24px 32px; text-align: center; color: #DDD6C8; font-size: 11px; line-height: 1.6;">
              <p style="margin: 0 0 6px 0; color: #F7F4EC; font-weight: 600; letter-spacing: 0.05em;">
                ${escapeHtml(BRAND.legalName)}
              </p>
              <p style="margin: 0 0 4px 0;">
                Direct Trade Desk: <a href="mailto:${escapeHtml(BRAND.contact.tradeEmail)}" style="color: #CA8E64; text-decoration: none;">${escapeHtml(BRAND.contact.tradeEmail)}</a>
              </p>
              <p style="margin: 0; color: #8F9E99; font-size: 10px;">
                This communication was triggered by a website submission on ${new Date().toUTCString()}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate plain-text fallback for email clients
 */
function generatePlainText({
  title,
  referenceId,
  details,
  cartSummary,
}: {
  title: string;
  referenceId: string;
  details: Record<string, string | number | undefined | null>;
  cartSummary?: EmailDispatchOptions["cartSummary"];
}): string {
  let text = `NOVA GRAIN - Pure Tung Oil Atelier\n`;
  text += `=====================================\n\n`;
  text += `${title}\n`;
  text += `Reference ID: ${referenceId}\n\n`;
  text += `Submitted Details:\n`;
  text += `------------------\n`;

  for (const [key, val] of Object.entries(details)) {
    if (val !== undefined && val !== null && val !== "") {
      text += `${key}: ${val}\n`;
    }
  }

  if (cartSummary && cartSummary.items.length > 0) {
    text += `\nOrder Bag Items (${cartSummary.totalUnits} Units):\n`;
    text += `-------------------------------------------------\n`;
    for (const item of cartSummary.items) {
      text += `- ${item.name} ${item.variant ? `(${item.variant})` : ""}: Qty ${item.quantity} [${item.price}]\n`;
    }
    text += `Estimated Subtotal: ${cartSummary.subtotal}\n`;
  }

  text += `\n=====================================\n`;
  text += `Technical Desk: ${BRAND.contact.tradeEmail}\n`;
  text += `Response timeline: 1 business day.\n`;

  return text;
}

/**
 * Primary dispatch function to send admin notification and customer acknowledgement emails
 */
export async function sendEnquiryEmails(options: EmailDispatchOptions): Promise<EmailDispatchResult> {
  const resend = getResendClient();

  if (!resend) {
    console.warn(
      `[Resend Notice] RESEND_API_KEY is not configured. Email notification for ${options.referenceId} was recorded in database but skipped from email delivery.`
    );
    return {
      adminSent: false,
      customerSent: false,
      error: "RESEND_API_KEY is not configured in environment.",
    };
  }

  const fromAddress =
    process.env.RESEND_FROM_EMAIL || "NOVA GRAIN Finishes <onboarding@resend.dev>";
  const adminRecipient =
    process.env.ADMIN_NOTIFICATION_EMAIL || BRAND.contact.tradeEmail || "procurement@novagrain-draft.com";

  let adminSent = false;
  let customerSent = false;
  let dispatchError: string | undefined;

  // 1. Send Admin Notification Email
  try {
    const adminHtml = generateEmailHtml({
      title: `New Trade Submission: ${options.subject}`,
      subtitle: `Admin Alert from Website Portal`,
      referenceId: options.referenceId,
      recipientType: "admin",
      details: options.details,
      cartSummary: options.cartSummary,
    });

    const adminText = generatePlainText({
      title: `New Trade Submission: ${options.subject}`,
      referenceId: options.referenceId,
      details: options.details,
      cartSummary: options.cartSummary,
    });

    const adminResponse = await resend.emails.send({
      from: fromAddress,
      to: [adminRecipient],
      replyTo: options.customerEmail,
      subject: `[NOVA GRAIN] ${options.subject} (${options.referenceId})`,
      html: adminHtml,
      text: adminText,
    });

    if (adminResponse.error) {
      console.error("[Resend Error - Admin]", adminResponse.error);
      dispatchError = adminResponse.error.message;
    } else {
      adminSent = true;
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Resend Exception - Admin]", message);
    dispatchError = message;
  }

  // 2. Send Customer Acknowledgement Email (if customerEmail is provided)
  if (options.customerEmail) {
    try {
      const customerHtml = generateEmailHtml({
        title: "Thank You for Your Enquiry",
        subtitle: options.subject,
        referenceId: options.referenceId,
        recipientType: "customer",
        details: options.details,
        cartSummary: options.cartSummary,
      });

      const customerText = generatePlainText({
        title: `Thank You for Your Enquiry - ${options.subject}`,
        referenceId: options.referenceId,
        details: options.details,
        cartSummary: options.cartSummary,
      });

      const customerResponse = await resend.emails.send({
        from: fromAddress,
        to: [options.customerEmail],
        replyTo: adminRecipient,
        subject: `Your NOVA GRAIN Enquiry Confirmation [${options.referenceId}]`,
        html: customerHtml,
        text: customerText,
      });

      if (customerResponse.error) {
        console.error("[Resend Error - Customer]", customerResponse.error);
        if (!dispatchError) dispatchError = customerResponse.error.message;
      } else {
        customerSent = true;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[Resend Exception - Customer]", message);
      if (!dispatchError) dispatchError = message;
    }
  }

  return {
    adminSent,
    customerSent,
    error: dispatchError,
  };
}
