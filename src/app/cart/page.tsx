"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  FileCheck,
  Loader2,
} from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, subtotal } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "enquiry" | "success">("cart");
  const [invoiceRef, setInvoiceRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
    notes: "",
  });

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiries/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionType: "full_checkout",
          name: customerDetails.name,
          company: customerDetails.company,
          email: customerDetails.email,
          phone: customerDetails.phone || "Not Provided",
          address: customerDetails.address,
          city: customerDetails.city || customerDetails.address.split(",")[0] || "Workshop Address",
          postalCode: customerDetails.postalCode || "00000",
          country: customerDetails.country || "United States",
          notes: customerDetails.notes,
          items: items,
          subtotal: subtotal,
          totalUnits: totalItems,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const detailMsg = data.details ? Object.values(data.details).join(" ") : "";
        throw new Error(detailMsg || data.error || "Failed to stage order quotation.");
      }

      setInvoiceRef(data.referenceId || data.orderRef || "NG-ORD-CONFIRMED");
      setCheckoutStep("success");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to reach server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Atelier Order Bag & Staged Checkout" }]} />

        {/* Page Header */}
        <div className="py-8 border-b border-stone mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-semibold tracking-widest text-walnut uppercase mb-3">
              <ShoppingBag className="w-3.5 h-3.5 text-copper" />
              <span>ATELIER PROCUREMENT BAG</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-forest-dark font-normal">
              Your Order Bag ({totalItems} Units)
            </h1>
            <p className="mt-2 text-sm text-charcoal/80 max-w-2xl font-sans">
              Review selected finishes, volume sizes, and draft subtotal estimates before submitting for workshop quotation or batch allocation.
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-charcoal/50 hover:text-red-700 underline underline-offset-4"
            >
              Clear Entire Bag
            </button>
          )}
        </div>

        {/* Draft Catalogue Status Notice */}
        <div className="mb-10 p-4 bg-stone-light border border-stone-muted rounded-xl text-xs text-charcoal/80 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-copper flex-shrink-0 mt-0.5" />
          <p>
            <strong>E-Commerce Implementation Architecture:</strong> NOVA GRAIN is deployed with an active cart management state and direct batch quotation pipeline. Because live merchant credentials (Stripe / ERP gateway) have not yet been assigned by the business owner, this checkout stage functions as a formal draft order request.
          </p>
        </div>

        {/* Empty Bag State */}
        {items.length === 0 ? (
          <div className="bg-ivory-light rounded-2xl border border-stone p-12 text-center max-w-2xl mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-stone flex items-center justify-center mx-auto mb-4 text-walnut">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-3xl text-forest-dark mb-2">Your Bag is Empty</h2>
            <p className="text-sm text-charcoal/70 mb-8 max-w-sm mx-auto">
              You haven&apos;t added any Tung Oil formulations or sample testing sizes yet.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-forest-light transition-colors rounded-xs shadow-md"
            >
              Browse Catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : checkoutStep === "success" ? (
          /* Staged Order Success State */
          <div className="bg-ivory-light rounded-2xl border border-stone p-10 md:p-14 text-center max-w-3xl mx-auto my-8 shadow-sm">
            <CheckCircle2 className="w-16 h-16 text-forest mx-auto mb-4" />
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-dark mb-2">
              Batch Order Request Staged
            </h2>
            <p className="text-sm text-charcoal/80 max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <strong>{customerDetails.name}</strong>. Your staged procurement of {totalItems} unit(s) has been catalogued for technical fulfillment confirmation.
            </p>

            <div className="bg-stone p-6 rounded-xl text-xs text-charcoal/80 max-w-lg mx-auto mb-8 text-left border border-stone-muted space-y-2">
              <div className="flex justify-between border-b border-stone-muted/60 pb-2">
                <span className="font-semibold text-forest-dark">Reference Invoice:</span>
                <span className="font-mono">{invoiceRef || "NG-DRAFT-0001"}</span>
              </div>
              <div className="flex justify-between border-b border-stone-muted/60 pb-2">
                <span className="text-charcoal/70">Confirmation Target:</span>
                <span>{customerDetails.email}</span>
              </div>
              <div className="flex justify-between border-b border-stone-muted/60 pb-2">
                <span className="text-charcoal/70">Draft Estimated Value:</span>
                <span className="font-semibold text-forest-dark">${subtotal.toFixed(2)}</span>
              </div>
              <p className="pt-2 text-[11px] text-charcoal/60 leading-relaxed">
                <strong>Next Step:</strong> Your formal quotation has been recorded in the database and dispatched to the procurement queue. Our logistics desk will contact you to coordinate freight and batch allocation.
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  clearCart();
                  setCheckoutStep("cart");
                }}
                className="px-6 py-3 bg-forest text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-forest-light"
              >
                Clear Bag & Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          /* Cart & Checkout Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
            {/* Items Table Left (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-ivory-light rounded-xl border border-stone overflow-hidden shadow-xs divide-y divide-stone">
                <div className="p-4 bg-stone text-xs font-semibold uppercase tracking-wider text-forest-dark flex justify-between">
                  <span>Product Item</span>
                  <span>Quantity & Value</span>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="p-5 flex gap-4 items-center">
                    <div className="relative w-20 h-20 rounded bg-stone overflow-hidden flex-shrink-0 border border-stone-muted">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg font-medium text-forest-dark truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-walnut font-medium mt-0.5">
                        Size: {item.size} • <span className="text-charcoal/50 font-mono">{item.sku}</span>
                      </p>
                      <p className="text-xs text-charcoal/70 font-mono mt-1">
                        Est. Unit: {item.unitPriceEstimate}
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <div className="inline-flex items-center border border-stone-muted rounded bg-ivory text-xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-stone text-charcoal/80"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 font-semibold text-charcoal">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-stone text-charcoal/80"
                            aria-label="Increase"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-charcoal/50 hover:text-red-700 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-serif text-lg font-semibold text-forest-dark">
                        {item.numericPrice > 0
                          ? `$${(item.numericPrice * item.quantity).toFixed(2)}`
                          : "Quote"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Free Sample & Guide Note */}
              <div className="p-4 bg-stone/40 rounded-lg border border-stone text-xs text-charcoal/70 flex items-center gap-3">
                <Truck className="w-4 h-4 text-copper flex-shrink-0" />
                <span>
                  All workshop orders include printed <strong>NOVA GRAIN Workbench Application Protocol Sheets</strong> and rag safety stickers.
                </span>
              </div>
            </div>

            {/* Summary & Staged Checkout Right (5 Cols) */}
            <div className="lg:col-span-5 bg-ivory-light p-6 md:p-8 rounded-xl border border-stone shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-normal text-forest-dark border-b border-stone pb-3">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs text-charcoal/80">
                <div className="flex justify-between">
                  <span>Selected Total Units:</span>
                  <span className="font-semibold text-forest-dark">{totalItems} containers</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Freight Estimate:</span>
                  <span className="text-walnut">Calculated at dispatch</span>
                </div>
                <div className="flex justify-between text-base font-serif text-forest-dark border-t border-stone pt-3">
                  <span>Estimated Total (Draft):</span>
                  <span className="font-bold text-xl text-forest-dark">
                    {subtotal > 0
                      ? items.some((i) => i.numericPrice === 0)
                        ? `$${subtotal.toFixed(2)} (+ Quote Items)`
                        : `$${subtotal.toFixed(2)}`
                      : "Batch Quote Required"}
                  </span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleEnquirySubmit} className="space-y-3 text-xs pt-3 border-t border-stone">
                <h3 className="font-medium text-forest-dark uppercase tracking-wider text-[11px]">
                  Fulfillment & Dispatch Contact:
                </h3>

                <div>
                  <label className="block text-charcoal/80 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                    className="w-full px-3 py-2 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-charcoal/80 mb-1">Company (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Vance Studios"
                      value={customerDetails.company}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, company: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal/80 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="deepusahani08@gmail.com"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-charcoal/80 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91-9616495093"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal/80 mb-1">Delivery Destination / City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Seattle, WA, United States"
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-950/10 border border-red-800/30 rounded text-red-900 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-700" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-forest hover:bg-forest-light text-ivory text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-md mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Staging Quotation...</span>
                    </>
                  ) : (
                    <>
                      <FileCheck className="w-4 h-4" />
                      <span>Stage Formal Order & Quotation</span>
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 text-[11px] text-charcoal/60 leading-relaxed border-t border-stone flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                <span>
                  No live payment card is charged. In live release, credentials will connect to your payment processor.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
