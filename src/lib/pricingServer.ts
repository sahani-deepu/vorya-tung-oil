import { PRODUCTS } from "@/data/brandConfig";
import { cleanString } from "./validation";

export interface VerifiedCartItem {
  id: string;
  productId: string;
  name: string;
  variant: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  priceDisplay: string;
  lineTotal: number;
}

export interface PricingCalculationResult {
  isValid: boolean;
  error?: string;
  items: VerifiedCartItem[];
  subtotal: number;
  totalUnits: number;
}

/**
 * Extracts numeric price from a price string like "Draft: $46.00" or "$38.00"
 */
function parsePrice(priceStr?: string): number {
  if (!priceStr || priceStr.toLowerCase().includes("quote")) return 0;
  const match = priceStr.match(/\$([0-9]+(?:\.[0-9]{1,2})?)/);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  return isNaN(num) ? 0 : num;
}

/**
 * Validates cart items against the authoritative server catalogue.
 * Prevents client-side price tampering by recalculating all unit prices and subtotals.
 */
export function verifyAndCalculateCart(rawItems: unknown[]): PricingCalculationResult {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return {
      isValid: false,
      error: "Cart contains no items to calculate.",
      items: [],
      subtotal: 0,
      totalUnits: 0,
    };
  }

  const verifiedItems: VerifiedCartItem[] = [];
  let subtotal = 0;
  let totalUnits = 0;

  for (let i = 0; i < rawItems.length; i++) {
    const raw = rawItems[i] as Record<string, unknown>;
    if (!raw || typeof raw !== "object") {
      return {
        isValid: false,
        error: `Item at index ${i} is invalid.`,
        items: [],
        subtotal: 0,
        totalUnits: 0,
      };
    }

    const rawSku = cleanString(raw.sku, 50);
    const rawProductId = cleanString(raw.productId || raw.id, 100);
    const rawSize = cleanString(raw.size || raw.variant, 50);
    const quantity = Math.max(1, Math.min(1000, parseInt(String(raw.quantity), 10) || 1));

    // Look up product and variant from authoritative catalogue
    let matchedProduct = PRODUCTS.find(
      (p) => p.id === rawProductId || p.slug === rawProductId
    );
    let matchedVariant = matchedProduct?.variants.find(
      (v) => (rawSku && v.sku.toLowerCase() === rawSku.toLowerCase()) || v.size.toLowerCase() === rawSize.toLowerCase()
    );

    // If not found by productId, search all products by SKU directly
    if (!matchedVariant && rawSku) {
      for (const prod of PRODUCTS) {
        const v = prod.variants.find((variant) => variant.sku.toLowerCase() === rawSku.toLowerCase());
        if (v) {
          matchedProduct = prod;
          matchedVariant = v;
          break;
        }
      }
    }

    if (!matchedProduct || !matchedVariant) {
      return {
        isValid: false,
        error: `Item '${cleanString(raw.name, 50)}' (${rawSize || rawSku || "unknown"}) does not match any recognized product SKU in the catalogue.`,
        items: [],
        subtotal: 0,
        totalUnits: 0,
      };
    }

    // Authoritative pricing from server
    const unitPrice = parsePrice(matchedVariant.priceEstimatePlaceholder);
    const lineTotal = Math.round(unitPrice * quantity * 100) / 100;
    const priceDisplay = unitPrice > 0 ? `$${unitPrice.toFixed(2)}` : "Quote Required";

    verifiedItems.push({
      id: `${matchedVariant.sku}-${quantity}`,
      productId: matchedProduct.id,
      name: matchedProduct.name,
      variant: matchedVariant.size,
      sku: matchedVariant.sku,
      quantity,
      unitPrice,
      priceDisplay,
      lineTotal,
    });

    subtotal += lineTotal;
    totalUnits += quantity;
  }

  // Round subtotal to 2 decimal places
  subtotal = Math.round(subtotal * 100) / 100;

  return {
    isValid: true,
    items: verifiedItems,
    subtotal,
    totalUnits,
  };
}
