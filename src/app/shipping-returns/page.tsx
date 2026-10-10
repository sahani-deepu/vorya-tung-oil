import React from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BRAND } from "@/data/brandConfig";
import { Truck, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping, Freight & Returns Policy (Draft) — NOVA GRAIN",
  description: "Draft shipping guidelines, hazardous material freight rules, and return policies for NOVA GRAIN.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Shipping & Returns (Draft)" }]} />

        <div className="py-8 border-b border-stone mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-semibold tracking-widest text-walnut uppercase mb-3">
            <Truck className="w-3.5 h-3.5 text-copper" />
            <span>LOGISTICS FRAMEWORK</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-forest-dark font-normal">
            Shipping & Returns Policy (Draft)
          </h1>
          <p className="mt-2 text-xs text-charcoal/60 font-mono">
            Status: Logistics Template • Pending Final Carrier Contracts
          </p>
        </div>

        <div className="mb-10 p-5 bg-amber-500/10 border border-amber-600/30 rounded-lg text-sm text-charcoal/80 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" />
          <p>
            <strong>Draft Policy Notice:</strong> This shipping policy represents an operational framework. Binding regional transit timelines and return terms will be finalized upon carrier account integration.
          </p>
        </div>

        <div className="prose prose-stone text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl text-forest-dark font-normal">1. Packaging & Hazardous Material Classification</h2>
          <p>
            Pure, unthinned virgin Tung Oil is non-hazardous and ships via standard parcel freight without hazmat surcharges. Blended products containing natural citrus solvents or terpene carriers are packaged in UN-certified metal containers with tamper-evident caps.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl text-forest-dark font-normal">2. Freight & Industrial Drum Dispatch</h2>
          <p>
            Orders exceeding 100 liters (such as 200L drums and 1,000L IBC containers) ship via LTL commercial freight with pallet shrink-wrap. Liftgate delivery and inside delivery must be specified at time of quotation.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl text-forest-dark font-normal">3. Inspection upon Delivery & Returns</h2>
          <p>
            Given the sensitive nature of drying oils, containers that have been opened, broken seal-tapes, or partially dispensed cannot be restocked due to risk of oxidative contamination. Unopened containers in original factory packaging may be returned within 30 days of receipt following written RMA authorization from <code>{BRAND.contact.tradeEmail}</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
