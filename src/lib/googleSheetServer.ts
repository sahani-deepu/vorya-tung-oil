/**
 * Google Sheet Real-time Synchronization Utility
 * Dispatches form submissions directly to Google Sheets via Google Apps Script Webhook
 */

export interface GoogleSheetPayload {
  formType: "quote" | "contact" | "bulk" | "cart";
  id?: string;
  referenceId: string;
  name?: string;
  email: string;
  phone?: string;
  businessName?: string;
  company?: string;
  customerType?: string;
  estimatedQuantity?: string;
  intendedApplication?: string;
  productInterest?: string;
  subject?: string;
  timberSpecies?: string;
  deliveryTimeline?: string;
  source?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  submissionType?: string;
  totalUnits?: number;
  subtotal?: number;
  itemsSummary?: string;
  notes?: string;
  message?: string;
  leadSourceUrl?: string;
  status?: string;
  emailStatus?: string;
}

export function isGoogleSheetConfigured(): boolean {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  return Boolean(url && url.startsWith("https://script.google.com"));
}

export async function syncToGoogleSheet(payload: GoogleSheetPayload): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    return false;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      }),
      signal: AbortSignal.timeout(8000),
    });

    return res.ok;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[Google Sheet Sync Notice] Failed to push to sheet: ${message}`);
    return false;
  }
}
