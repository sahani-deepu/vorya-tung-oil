"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BRAND } from "@/data/brandConfig";
import { Boxes, CheckCircle2, Send, ShieldCheck } from "lucide-react";

export default function BulkEnquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    customerType: "Furniture Manufacturer",
    estimatedQuantity: "50 – 200 Litres (Contractor Drum)",
    intendedApplication: "Solid Wood Furniture & Tables",
    deliveryTimeline: "Within 30 Days",
    message: "",
    honeypot: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // spam honey catch
    setSubmitted(true);
  };

  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Bulk & B2B Procurement" }]} />

        {/* Header */}
        <div className="py-8 border-b border-stone mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-semibold tracking-widest text-walnut uppercase mb-3">
            <Boxes className="w-3.5 h-3.5 text-copper" />
            <span>TRADE & WHOLESALE SUPPLY</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-forest-dark font-normal">
            B2B & Industrial Bulk Procurement
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal/80 max-w-3xl font-sans leading-relaxed">
            Standardized batch supply for furniture manufacturing plants, commercial architectural millwork contractors, flooring lines, and specialty coating formulators.
          </p>
        </div>

        {/* Volume Tiers Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 bg-ivory-light rounded-xl border border-stone shadow-xs">
            <span className="text-[10px] text-copper uppercase font-mono tracking-wider font-semibold block mb-1">
              TIER 01 • WORKSHOP
            </span>
            <h3 className="font-serif text-2xl font-normal text-forest-dark mb-1">5 – 20 Litres</h3>
            <p className="text-xs text-charcoal/70 mb-3">Steel jerrycans & pails for custom furniture studios.</p>
            <span className="text-[11px] text-walnut font-medium">Standard freight dispatch</span>
          </div>

          <div className="p-6 bg-ivory-light rounded-xl border border-stone shadow-xs">
            <span className="text-[10px] text-copper uppercase font-mono tracking-wider font-semibold block mb-1">
              TIER 02 • CONTRACTOR
            </span>
            <h3 className="font-serif text-2xl font-normal text-forest-dark mb-1">50 – 200 Litres</h3>
            <p className="text-xs text-charcoal/70 mb-3">55-Gallon (200L) steel drums for large architectural millwork.</p>
            <span className="text-[11px] text-walnut font-medium">CoA certificate included</span>
          </div>

          <div className="p-6 bg-ivory-light rounded-xl border border-stone shadow-xs">
            <span className="text-[10px] text-copper uppercase font-mono tracking-wider font-semibold block mb-1">
              TIER 03 • INDUSTRIAL
            </span>
            <h3 className="font-serif text-2xl font-normal text-forest-dark mb-1">1,000L IBC Totes</h3>
            <p className="text-xs text-charcoal/70 mb-3">Intermediate bulk containers for automated flooring lines.</p>
            <span className="text-[11px] text-walnut font-medium">Custom viscosity tuning</span>
          </div>

          <div className="p-6 bg-forest-dark text-ivory rounded-xl border border-forest-surface shadow-xs">
            <span className="text-[10px] text-copper-light uppercase font-mono tracking-wider font-semibold block mb-1">
              SAMPLE BENCHMARK
            </span>
            <h3 className="font-serif text-2xl font-normal text-ivory mb-1">Testing Kits</h3>
            <p className="text-xs text-stone-muted mb-3">500ml trial kits for laboratory & penetration validation.</p>
            <span className="text-[11px] text-copper-light font-medium">Available on qualification</span>
          </div>
        </div>

        {/* Form & Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 items-start">
          {/* Form Left (7 Cols) */}
          <div className="lg:col-span-7 bg-ivory-light p-8 md:p-10 rounded-2xl border border-stone shadow-sm">
            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-forest mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-forest-dark mb-2">
                  Procurement Enquiry Staged
                </h3>
                <p className="text-xs text-charcoal/80 max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong> from <strong>{formData.businessName}</strong>. Your volume request for {formData.estimatedQuantity} has been successfully validated.
                </p>
                <div className="p-4 bg-stone rounded-lg text-xs text-charcoal/80 max-w-md mx-auto mb-6 text-left border border-stone-muted">
                  <p className="font-semibold text-forest-dark mb-1">Production System Hook:</p>
                  <p>In the live operational environment, this triggers an automated ticketing alert in our ERP trade queue and dispatches lot specifications to <code>{formData.email}</code>.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-forest text-ivory text-xs uppercase tracking-widest font-medium hover:bg-forest-light"
                >
                  Submit Another Procurement Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Honeypot */}
                <input
                  type="text"
                  name="fax_number_verification"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="border-b border-stone pb-3 mb-4">
                  <h2 className="font-serif text-2xl font-medium text-forest-dark">
                    Request Formal Bulk Quotation
                  </h2>
                  <p className="text-[11px] text-charcoal/60 mt-0.5">
                    Direct access to trade discounts, batch CoA certificates, and scheduled dispatch agreements.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-charcoal mb-1">Procurement Contact *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Richard Hawthorne"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-charcoal mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hawthorne Timber Mill Ltd."
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-charcoal mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="richard@hawthornewood.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-charcoal mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 987-6543"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-medium text-charcoal mb-1">Enterprise Type</label>
                    <select
                      value={formData.customerType}
                      onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    >
                      <option>Furniture Manufacturer</option>
                      <option>Architectural Millwork Studio</option>
                      <option>Commercial Flooring Contractor</option>
                      <option>Historic Restoration Specialist</option>
                      <option>Coatings Formulator / Compounder</option>
                      <option>Wholesale Timber Distributor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-charcoal mb-1">Target Volume Tier</label>
                    <select
                      value={formData.estimatedQuantity}
                      onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    >
                      <option>5 – 20 Litres (Workshop Tier)</option>
                      <option>50 – 200 Litres (Contractor Drum)</option>
                      <option>500 – 1,000 Litres (Quarterly Supply)</option>
                      <option>1,000L IBC Tote / Custom Pallet</option>
                      <option>Trial Evaluation Sample Kit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-charcoal mb-1">Fulfillment Horizon</label>
                    <select
                      value={formData.deliveryTimeline}
                      onChange={(e) => setFormData({ ...formData, deliveryTimeline: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    >
                      <option>Immediate / Within 14 Days</option>
                      <option>Within 30 Days</option>
                      <option>Quarterly Contract Schedule</option>
                      <option>Ongoing Annual Agreement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-charcoal mb-1">Application Scope & Technical Specifications *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Include details on your application line (e.g. spray-and-wipe, dip tank, roller-coater), timber substrate (e.g. kiln-dried American Walnut, White Oak), annual volume projections, and certification requirements."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-charcoal/60 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                    Commercial NDA & pricing confidentiality maintained
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-forest hover:bg-forest-light text-ivory text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 rounded-xs"
                  >
                    <span>Request Quotation</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Details Right (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-stone shadow-xl bg-stone">
              <Image
                src="/images/product-bulk-oil.jpg"
                alt="NOVA GRAIN Bulk Industrial 5L Canister in woodworking workshop"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            <div className="p-6 bg-ivory-light rounded-xl border border-stone text-xs text-charcoal/80 space-y-3">
              <h3 className="font-serif text-xl font-medium text-forest-dark">
                Why Contract with NOVA GRAIN?
              </h3>
              <p className="leading-relaxed">
                We eliminate the supply volatility and chemical dilution common in retail timber oils. Each commercial shipment arrives with a verified Certificate of Analysis confirming mechanical cold-press purity, specific gravity (ASTM D1963), and acid index.
              </p>
              <div className="pt-2 border-t border-stone/60 flex items-center justify-between text-[11px]">
                <span className="text-charcoal/60">Direct Trade Desk:</span>
                <a href={`mailto:${BRAND.contact.tradeEmail}`} className="text-forest font-semibold hover:underline">
                  {BRAND.contact.tradeEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
