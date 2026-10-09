"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BRAND } from "@/data/brandConfig";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Technical Inquiry",
    timberSpecies: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiries/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setReferenceId(data.referenceId || "NG-CNT-CONFIRMED");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to reach server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact Us" }]} />

        {/* Header */}
        <div className="py-8 border-b border-stone mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-semibold tracking-widest text-walnut uppercase mb-3">
            <Mail className="w-3.5 h-3.5 text-copper" />
            <span>DIRECT ATELIER CHANNELS</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-forest-dark font-normal">
            Consult Our Wood-Care Specialists
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal/80 max-w-3xl font-sans leading-relaxed">
            Have a question regarding wood species pore density, sample testing batches, thinning ratios, or architectural specifications? Our technical desk is here to assist.
          </p>
        </div>

        {/* Clear Placeholder Notice */}
        <div className="mb-12 p-4 bg-stone-light border border-stone-muted rounded-xl text-xs text-charcoal/80 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-copper flex-shrink-0 mt-0.5" />
          <p>
            <strong>Contact Transparency Notice:</strong> The contact endpoints below represent development placeholders for the NOVA GRAIN evaluation brand. Commercial phone switches and studio addresses will be activated upon official market launch.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Details Left */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-forest-dark text-ivory p-8 rounded-2xl border border-forest-surface shadow-xl space-y-6">
              <h2 className="font-serif text-2xl text-ivory font-normal border-b border-forest-surface pb-3">
                Atelier Communications
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-copper-light mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-muted block">Direct Inquiry Email</span>
                    <a href={`mailto:${BRAND.contact.email}`} className="text-ivory hover:text-copper-light font-medium text-sm">
                      {BRAND.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-copper-light mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-muted block">Trade & B2B Procurement</span>
                    <a href={`mailto:${BRAND.contact.tradeEmail}`} className="text-ivory hover:text-copper-light font-medium text-sm">
                      {BRAND.contact.tradeEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-copper-light mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-muted block">Direct Telephone Desk</span>
                    <a href={`tel:${BRAND.contact.phonePlaceholder.replace(/[^0-9+]/g, "")}`} className="text-ivory hover:text-copper-light font-medium text-sm">
                      {BRAND.contact.phonePlaceholder}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-copper-light mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-muted block">Atelier Location (Placeholder)</span>
                    <span className="text-stone-muted/90 leading-relaxed block mt-0.5">{BRAND.contact.studioAddressPlaceholder}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-forest-surface">
                  <Clock className="w-4 h-4 text-copper-light mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-muted block">Response Commitment</span>
                    <span className="text-stone-muted/90">{BRAND.contact.responseTimeline}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Consultation Callout */}
            <div className="p-6 bg-ivory-light rounded-xl border border-stone text-xs text-charcoal/80 space-y-2">
              <h3 className="font-serif text-lg font-medium text-forest-dark">
                Are you an Architect or Contractor?
              </h3>
              <p className="leading-relaxed">
                If you are planning an architectural build, commercial hospitality woodwork, or flooring project requiring over 50 liters, we recommend using our specialized B2B Procurement Portal.
              </p>
              <a
                href="/bulk-enquiry"
                className="inline-block text-forest font-semibold uppercase tracking-wider text-[11px] underline underline-offset-4 mt-2"
              >
                Go to B2B Procurement Portal →
              </a>
            </div>
          </div>

          {/* Form Right */}
          <div className="lg:col-span-7 bg-ivory-light p-8 md:p-10 rounded-2xl border border-stone shadow-sm">
            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-forest mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-forest-dark mb-2">
                  Message Recorded
                </h3>
                <p className="text-xs text-charcoal/80 max-w-md mx-auto mb-4 leading-relaxed">
                  Thank you, <strong>{form.name}</strong>. Your inquiry regarding <em>{form.subject}</em> has been securely staged in the customer service ledger.
                </p>
                <div className="p-4 bg-stone rounded text-xs text-charcoal/80 max-w-md mx-auto mb-6 text-left border border-stone-muted">
                  <p className="font-semibold text-forest-dark mb-1">
                    Enquiry Reference ID: <span className="font-mono text-copper font-bold">{referenceId}</span>
                  </p>
                  <p className="text-[11px] text-charcoal/70">
                    A confirmation record has been registered for technical review. Our specialists will respond to <strong>{form.email}</strong> within 1 business day.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setReferenceId("");
                  }}
                  className="px-6 py-2.5 bg-forest text-ivory text-xs uppercase tracking-widest font-medium hover:bg-forest-light"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="border-b border-stone pb-3 mb-4">
                  <h2 className="font-serif text-2xl font-medium text-forest-dark">
                    Send an Inquiry
                  </h2>
                  <p className="text-[11px] text-charcoal/60 mt-0.5">
                    Our technical finishing team reviews all messages within 1 business day.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-charcoal mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Claire Bennett"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2.5 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-charcoal mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="deepusahani08@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-charcoal mb-1">Inquiry Topic</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3 py-2.5 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    >
                      <option>General Technical Inquiry</option>
                      <option>Timber Species Compatibility</option>
                      <option>Dilution & Application Advice</option>
                      <option>Food Contact Safety Verification</option>
                      <option>Wholesale & Workshop Supply</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-charcoal mb-1">Timber Species (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. American Walnut, White Oak, Teak"
                      value={form.timberSpecies}
                      onChange={(e) => setForm({ ...form, timberSpecies: e.target.value })}
                      className="w-full px-3 py-2.5 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-charcoal mb-1">Your Message or Technical Question *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your woodworking project, dimensions, current surface sanding, or specific formulation queries."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2.5 bg-ivory border border-stone-muted rounded focus:border-copper focus:outline-none resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-950/10 border border-red-800/30 rounded text-red-900 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-700" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-charcoal/60 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                    Private & confidential under draft terms
                  </span>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-forest hover:bg-forest-light text-ivory text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 rounded-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
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
}
