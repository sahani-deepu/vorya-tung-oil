"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalItems, subtotal } = useCart();
  const [checkoutRequested, setCheckoutRequested] = useState(false);
  const [quoteEmail, setQuoteEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderRef, setOrderRef] = useState("");

  if (!isOpen) return null;

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteEmail) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiries/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionType: "drawer_quick_quote",
          email: quoteEmail,
          items: items,
          subtotal: subtotal,
          totalUnits: totalItems,
          leadSourceUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const detailMsg = data.details ? Object.values(data.details).join(" ") : "";
        throw new Error(detailMsg || data.error || "Failed to submit batch quote request.");
      }

      setOrderRef(data.referenceId || data.orderRef || "NG-ORD-CONFIRMED");
      setCheckoutRequested(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to reach server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="cart-drawer-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory shadow-2xl flex flex-col border-l border-stone">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone bg-ivory-light flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-forest" />
              <h2 id="cart-drawer-title" className="font-serif text-xl font-medium text-forest-dark tracking-wide">
                Your Atelier Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-charcoal/70 hover:text-forest transition-colors rounded-full hover:bg-stone/50 focus:outline-none focus:ring-2 focus:ring-copper"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Draft Catalogue Notice */}
          <div className="bg-stone-light/80 px-6 py-3 border-b border-stone text-sm text-charcoal/85 flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-copper mt-1.5 flex-shrink-0" />
            <p>
              <strong>Draft Catalogue:</strong> Pricing & specifications are development placeholders. You can submit your bag as a direct workshop quote request.
            </p>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone/60">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-stone flex items-center justify-center mx-auto mb-4 text-walnut/70">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-forest-dark mb-2">Your Bag is Empty</h3>
                <p className="text-sm text-charcoal/70 mb-6 max-w-xs mx-auto">
                  Explore our cold-pressed Pure Tung Oil and architectural wood finishes.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-ivory text-sm font-medium tracking-wide uppercase hover:bg-forest-light transition-colors"
                >
                  Browse Catalogue <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : checkoutRequested ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-14 h-14 text-forest mx-auto mb-3" />
                <h3 className="font-serif text-2xl text-forest-dark mb-2">Quote Request Received</h3>
                <p className="text-sm text-charcoal/80 mb-4 leading-relaxed">
                  Thank you. Your request for {totalItems} item(s) has been staged for technical confirmation to <strong>{quoteEmail}</strong>.
                </p>
                <div className="p-4 bg-stone rounded text-sm text-charcoal/80 mb-6 text-left">
                  <p className="font-medium text-forest-dark mb-1">Production Handshake:</p>
                  <p>In commercial release, this will transmit through your ERP or wholesale checkout gateway. No mock transaction was executed.</p>
                </div>
                <button
                  onClick={() => {
                    setCheckoutRequested(false);
                    clearCart();
                    closeCart();
                  }}
                  className="px-6 py-2.5 bg-forest text-ivory text-sm font-medium uppercase tracking-wide hover:bg-forest-light"
                >
                  Close & Clear
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start">
                  <div className="relative w-18 h-18 bg-stone rounded overflow-hidden flex-shrink-0 border border-stone-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="72px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-base font-medium text-forest-dark truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-walnut font-medium mt-0.5">
                      Size: {item.size} • <span className="text-charcoal/60">{item.sku}</span>
                    </p>
                    <p className="text-sm text-charcoal/70 mt-1 font-mono">
                      {item.unitPriceEstimate}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center border border-stone-muted rounded bg-ivory">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone text-charcoal/80"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-sm font-medium text-charcoal">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-stone text-charcoal/80"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-charcoal/60 hover:text-red-700 flex items-center gap-1 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Actions */}
          {items.length > 0 && !checkoutRequested && (
            <div className="p-6 border-t border-stone bg-ivory-light">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-charcoal/80">
                  <span>Selected Items</span>
                  <span className="font-medium">{totalItems} units</span>
                </div>
                <div className="flex justify-between text-base font-serif text-forest-dark border-t border-stone pt-2">
                  <span>Draft Subtotal Estimate</span>
                  <span className="font-semibold text-lg">
                    {subtotal > 0 ? `$${subtotal.toFixed(2)}` : "Batch Quote Required"}
                  </span>
                </div>
                <p className="text-xs text-charcoal/60">
                  Taxes, shipping freight, and commercial volume tier discounts are calculated at quote confirmation.
                </p>
              </div>

              {/* Quote Submission Form */}
              <form onSubmit={handleQuoteSubmit} className="space-y-2.5">
                <div>
                  <label htmlFor="quote-email" className="block text-sm font-medium text-charcoal/80 mb-1">
                    Send Quote & Batch Specs To (Email):
                  </label>
                  <input
                    id="quote-email"
                    type="email"
                    required
                    placeholder="deepusahani08@gmail.com"
                    value={quoteEmail}
                    onChange={(e) => setQuoteEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-ivory border border-stone-muted focus:border-copper focus:outline-none rounded"
                  />
                </div>

                {error && (
                  <div className="p-2.5 bg-red-950/10 border border-red-800/30 rounded text-red-900 text-sm flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-700" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-forest hover:bg-forest-light text-ivory text-sm font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Quote...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Formal Batch Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-3 text-center">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="text-sm text-walnut hover:text-forest underline underline-offset-4"
                >
                  View Full Cart & Coverage Estimator
                </Link>
              </div>
            </div>
          )}

          {checkoutRequested && (
            <div className="p-6 border-t border-stone bg-ivory-light text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-forest mx-auto" />
              <div>
                <h3 className="font-serif text-xl font-medium text-forest-dark">
                  Batch Quote Registered
                </h3>
                <p className="text-xs text-charcoal/80 mt-1">
                  Enquiry Reference: <span className="font-mono font-bold text-copper">{orderRef}</span>
                </p>
                <p className="text-[11px] text-charcoal/60 mt-2 leading-relaxed">
                  Specifications have been dispatched to <strong>{quoteEmail}</strong>. Our logistics desk will review your {totalItems} item(s) and follow up within 1 business day.
                </p>
              </div>
              <div className="flex gap-2 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutRequested(false);
                    setOrderRef("");
                    setQuoteEmail("");
                    closeCart();
                  }}
                  className="px-5 py-2.5 bg-forest text-ivory text-xs uppercase tracking-widest font-medium hover:bg-forest-light rounded-xs"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
