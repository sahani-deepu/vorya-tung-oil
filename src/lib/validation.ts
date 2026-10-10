/**
 * Validation & Sanitization Utilities for NOVA GRAIN Form Submissions
 */

export interface ValidationResult<T> {
  isValid: boolean;
  errors: Record<string, string>;
  data?: T;
}

// Basic in-memory rate limiting map (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();

/**
 * Check if an IP address has exceeded rate limits (e.g., max 5 submissions per 60 seconds)
 */
export function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Clean expired timestamps
  const recent = timestamps.filter((time) => now - time < windowMs);
  
  if (recent.length >= maxRequests) {
    return false; // Rate limit exceeded
  }
  
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

/**
 * Escape HTML special characters to prevent HTML/XSS injection in emails and displays
 */
export function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return "";
  const text = String(str);
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Email format verification (supports standard RFC domains and local dev addresses like admin@localhost)
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim().toLowerCase();
  if (trimmed.length < 3 || trimmed.length > 254) return false;
  // RFC-compatible pattern that also accommodates localhost/local dev domains
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(trimmed) && trimmed.includes("@") && !trimmed.endsWith("@");
}

/**
 * Sanitize telephone string
 */
export function sanitizePhone(phone?: string): string {
  if (!phone) return "";
  return phone.trim().slice(0, 50);
}

/**
 * Clean & truncate a string to maximum length
 */
export function cleanString(val: unknown, maxLength = 255): string {
  if (!val || typeof val !== "string") return "";
  return val.trim().slice(0, maxLength);
}
