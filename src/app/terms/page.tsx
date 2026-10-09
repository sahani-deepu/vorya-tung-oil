import React from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BRAND } from "@/data/brandConfig";
import { FileText, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions (Draft Framework) — NOVA GRAIN",
  description: "Draft terms of service and commercial specification provisions for NOVA GRAIN.",
};

export default function TermsPage() {
  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Terms & Conditions (Draft)" }]} />

        <div className="py-8 border-b border-stone mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-semibold tracking-widest text-walnut uppercase mb-3">
            <FileText className="w-3.5 h-3.5 text-copper" />
            <span>COMMERCIAL DRAFT FRAMEWORK</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-forest-dark font-normal">
            Terms & Conditions (Draft)
          </h1>
          <p className="mt-2 text-xs text-charcoal/60 font-mono">
            Status: Working Prototype Document • Subject to Legal Entity Finalization
          </p>
        </div>

        <div className="mb-10 p-4 bg-amber-500/10 border border-amber-600/30 rounded-lg text-xs text-charcoal/80 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-copper flex-shrink-0 mt-0.5" />
          <p>
            <strong>Commercial Framework Notice:</strong> These draft terms govern usage of the conceptual NOVA GRAIN platform. Official contract terms for bulk industrial supply and e-commerce transactions will be finalized upon corporate establishment.
          </p>
        </div>

        <div className="prose prose-stone text-xs sm:text-sm text-charcoal/85 leading-relaxed font-sans space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl text-forest-dark font-normal">1. Product Catalogue & Formulation Data</h2>
          <p>
            All descriptions, coverage metrics, and container sizes published on this website reflect current development formulations. Physical wood finishing results may vary according to species porosity, ambient moisture, and user application techniques.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl text-forest-dark font-normal">2. User Safety Responsibility & Rag Disposal</h2>
          <p>
            Because Tung Oil is an organic drying oil undergoing exothermic oxidative polymerization, users assume full responsibility for complying with workshop safety standards. <strong>All cloths, rags, or steel wool saturated with oil must be immersed in water or laid completely flat outdoors to cure prior to disposal.</strong> {BRAND.name} disclaims liability for damages arising from failure to observe drying oil fire prevention protocols.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl text-forest-dark font-normal">3. Quotations & Bulk Estimates</h2>
          <p>
            Estimates provided through the online checkout staging or B2B procurement portal represent preliminary quotations subject to formal verification, freight calculation, and Certificate of Analysis confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
