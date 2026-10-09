"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, ShieldCheck, Loader2, AlertCircle } from "lucide-react";

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  defaultProduct = "Pure Tung Oil",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    customerType: "Cabinetmaker / Furniture Maker",
    estimatedQuantity: "5 – 20 Litres (Workshop Tier)",
    intendedApplication: "Solid Furniture & Tables",
    productInterest: defaultProduct,
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Spam caught

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/enquiries/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit quote request.");
      }

      setReferenceId(data.referenceId || "NG-QTE-CONFIRMED");
      setStatus("success");
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Unable to reach server. Please check your connection.");
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal Window */}
        <div className="relative transform overflow-hidden rounded-xl bg-ivory text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-stone">
          {/* Header */}
          <div className="bg-forest-dark px-6 py-5 text-ivory flex items-center justify-between border-b border-forest-surface">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-copper-light font-semibold block mb-0.5">
                B2B & Trade Procurement
              </span>
              <h3 id="quote-modal-title" className="font-serif text-2xl font-normal text-ivory">
                Request Trade Specifications & Bulk Pricing
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-muted hover:text-ivory rounded-full hover:bg-forest-surface transition-colors focus:outline-none focus:ring-2 focus:ring-copper"
              aria-label="Close quote modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-8">
            {status === "success" ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-forest mx-auto mb-4" />
                <h4 className="font-serif text-2xl text-forest-dark mb-2">
                  Enquiry Registered for Validation
                </h4>
                <p className="text-sm text-charcoal/80 max-w-md mx-auto mb-4 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry for <strong>{formData.estimatedQuantity}</strong> has been staged in the trade pipeline.
                </p>
                <div className="bg-stone p-4 rounded-lg text-xs text-charcoal/80 max-w-md mx-auto mb-6 text-left border border-stone-muted">
                  <p className="font-semibold text-forest-dark mb-1">
                    Enquiry Reference ID: <span className="font-mono text-copper font-bold">{referenceId}</span>
                  </p>
                  <p className="text-[11px] text-charcoal/70">
                    Your custom workshop specifications for <strong>{formData.productInterest}</strong> have been registered. Our technical desk will review your inquiry and follow up at <strong>{formData.email}</strong> within 1 business day.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setReferenceId("");
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-forest text-ivory text-xs uppercase tracking-widest font-medium hover:bg-forest-light"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Honeypot hidden input */}
                <input
                  type="text"
                  name="company_title_verification"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-charcoal mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alistair Wright"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-charcoal mb-1">Workshop or Business Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wright & Co. Cabinetmakers"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-charcoal mb-1">Professional Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="deepusahani08@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-charcoal mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+91-9616495093"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-medium text-charcoal mb-1">Customer Classification</label>
                    <select
                      value={formData.customerType}
                      onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                    >
                      <option>Cabinetmaker / Furniture Maker</option>
                      <option>Architect / Interior Studio</option>
                      <option>Flooring & Millwork Contractor</option>
                      <option>Historic Restoration Specialist</option>
                      <option>Industrial Timber Manufacturer</option>
                      <option>Wholesale Distributor</option>
                      <option>Discerning Individual Maker</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-charcoal mb-1">Estimated Batch Volume</label>
                    <select
                      value={formData.estimatedQuantity}
                      onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                    >
                      <option>Sample Trial Batch (250ml - 1L)</option>
                      <option>5 – 20 Litres (Workshop Tier)</option>
                      <option>50 – 200 Litres (Contractor Drum)</option>
                      <option>Full Pallet / IBC Tote (1,000L+)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-charcoal mb-1">Intended Application</label>
                    <select
                      value={formData.intendedApplication}
                      onChange={(e) => setFormData({ ...formData, intendedApplication: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                    >
                      <option>Solid Furniture & Tables</option>
                      <option>Architectural Wall Paneling</option>
                      <option>Hardwood Flooring</option>
                      <option>Turned Objects & Craft</option>
                      <option>Exterior Decking / Cladding</option>
                      <option>Industrial Manufacturing Coating</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-charcoal mb-1">Project Details or Specific Technical Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your timber species (e.g. American Walnut, White Oak), surface square footage, drying chamber parameters, or certificate requirements."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-950/10 border border-red-800/30 rounded text-red-900 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-700" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-charcoal/60 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                    Data treated confidentially under draft policy
                  </span>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="px-6 py-3 bg-forest hover:bg-forest-light text-ivory text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 rounded-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Trade Enquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
