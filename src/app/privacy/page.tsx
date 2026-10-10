import React from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BRAND } from "@/data/brandConfig";
import { Shield, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy (Draft Template) — NOVA GRAIN",
  description: "Draft template privacy policy for the NOVA GRAIN evaluation brand specimen.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Privacy Policy (Draft)" }]} />

        <div className="py-8 border-b border-stone mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-semibold tracking-widest text-walnut uppercase mb-3">
            <Shield className="w-3.5 h-3.5 text-copper" />
            <span>LEGAL DRAFT DOCUMENT</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-forest-dark font-normal">
            Privacy Policy (Draft Framework)
          </h1>
          <p className="mt-2 text-xs text-charcoal/60 font-mono">
            Last Updated: October 2026 • Status: Pending Official Corporate Confirmation
          </p>
        </div>

        <div className="mb-10 p-5 bg-amber-500/10 border border-amber-600/30 rounded-lg text-sm text-charcoal/80 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" />
          <p>
            <strong>Draft Policy Notice:</strong> This privacy framework is provided as a production structural placeholder for {BRAND.name}. Prior to commercial deployment and collecting end-user consumer data, company legal counsel should review and finalize binding statutory terms (including GDPR, CCPA, and regional disclosures).
          </p>
        </div>

        <div className="prose prose-stone text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl text-forest-dark font-normal">1. Data Collected for Inquiries & Quotes</h2>
          <p>
            When craftspeople, architects, or industrial procurement teams submit a quotation or technical request on this website, we collect only necessary contact and project specification details: name, business name, professional email address, phone number, and intended wood finishing parameters.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl text-forest-dark font-normal">2. Purpose of Processing</h2>
          <p>
            Submitted information is utilized exclusively to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Generate tailored batch pricing and volume quotes.</li>
            <li>Provide technical data sheets (TDS) and material safety documentation.</li>
            <li>Coordinate trial sample testing kits and dispatch logistics.</li>
          </ul>

          <h2 className="font-serif text-xl sm:text-2xl text-forest-dark font-normal">3. Data Retention & Third Parties</h2>
          <p>
            We do not sell, rent, or trade customer contact details to third-party marketing networks. In production, transactional data is securely routed to authorized enterprise CRM and mail systems.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl text-forest-dark font-normal">4. Contact Channels</h2>
          <p>
            For privacy inquiries or deletion requests regarding trial data, contact our administrative desk at <code>{BRAND.contact.email}</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
