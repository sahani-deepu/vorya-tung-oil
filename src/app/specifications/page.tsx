import React from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TechSpecsTable } from "@/components/TechSpecsTable";
import { FileText, ShieldAlert, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Specifications & Chemical Data Sheets — NOVA GRAIN",
  description:
    "Engineering specifications, ASTM standards, viscosity, refractive index, drying times, and VOC metrics for NOVA GRAIN Tung Oil formulations.",
};

export default function SpecificationsPage() {
  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Technical Specifications" }]} />

        {/* Hero Header */}
        <div className="py-8 border-b border-stone mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-semibold tracking-widest text-walnut uppercase mb-3">
            <FileText className="w-3.5 h-3.5 text-copper" />
            <span>ARCHITECTURAL & CONTRACT SPECIFICATION</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-forest-dark font-normal">
            Technical Data & Material Matrix
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal/80 max-w-3xl font-sans leading-relaxed">
            Standardized technical parameters, ASTM testing references, and safety protocols for professional specifiers, furniture manufacturers, and architectural coating teams.
          </p>
        </div>

        {/* Compliance & Audit Transparency Note */}
        <div className="mb-12 p-6 bg-stone-light border border-stone-muted rounded-xl text-base sm:text-lg text-charcoal/85 leading-relaxed shadow-xs flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-serif text-lg font-bold text-forest-dark mb-1.5">
              Specification Verification Protocol
            </h2>
            <p>
              In strict accordance with our engineering honesty policy, physical values marked <em>Confirmed</em> represent verified cold-press botanical constants. Laboratory measurements marked <em>To be confirmed</em> reflect ongoing third-party ASTM D1639, D1959, and D1544 batch certifications that will be populated with exact certificate numbers upon commercial release.
            </p>
          </div>
        </div>

        {/* The Interactive Tech Specs Table */}
        <TechSpecsTable />

        {/* Storage & Shelf Life Guidelines */}
        <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-base text-charcoal/85">
          <div className="p-7 bg-ivory-light rounded-xl border border-stone shadow-xs space-y-3.5">
            <h3 className="font-serif text-2xl font-normal text-forest-dark border-b border-stone/60 pb-2">
              Storage & Shelf Life Preservation
            </h3>
            <p className="leading-relaxed">
              Because pure Tung Oil reacts with atmospheric oxygen, proper storage prevents premature thickening or skinning within the container:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-charcoal/80">
              <li>Store between 10°C and 25°C (50°F – 77°F) away from direct sunlight.</li>
              <li>Always secure caps immediately after dispensing to minimize oxygen exchange.</li>
              <li>When partial containers remain, transfer oil to smaller glass/metal containers with minimal headspace, or purge headspace with an inert gas (e.g. Bloxygen).</li>
              <li>Unopened containers maintain verified stability for up to 36 months from press date.</li>
            </ul>
          </div>

          <div className="p-7 bg-ivory-light rounded-xl border border-stone shadow-xs space-y-3.5">
            <h3 className="font-serif text-2xl font-normal text-forest-dark border-b border-stone/60 pb-2">
              Batch Quality Assurance & Lot Testing
            </h3>
            <p className="leading-relaxed">
              Each industrial lot shipped in 20L pails, 200L drums, or 1,000L IBC totes undergoes testing to verify:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-charcoal/80">
              <li><strong>Specific Gravity (ASTM D1963):</strong> Target range 0.936 – 0.940</li>
              <li><strong>Refractive Index (ASTM D1747):</strong> Purity benchmark 1.516 – 1.520</li>
              <li><strong>Acid Value (ASTM D1639):</strong> Low acid number indicating minimal hydrolysis</li>
              <li><strong>Clarity & Color (Gardner Scale):</strong> Light amber honey clarity without particulate sediment</li>
            </ul>
          </div>
        </div>

        {/* Safety Data Callout */}
        <div className="p-7 bg-red-950/10 border border-red-900/30 rounded-xl mb-16 flex flex-col sm:flex-row items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-red-800 flex-shrink-0 mt-0.5" />
          <div className="text-base sm:text-lg text-charcoal/85 leading-relaxed">
            <h4 className="font-serif text-xl font-semibold text-red-900 mb-1.5">
              Safety Data Sheet (SDS) Reference Framework (Pending Formal SDS Registration): Exothermic Oxidation
            </h4>
            <p>
              Under OSHA / GHS classification, unpolymerized drying oils present a known spontaneous combustion risk when absorbed into porous fibrous materials (cotton rags, paper towels, steel wool). All industrial operations must mandate water-immersion disposal bins (NFPA 30 compliant) in finishing bays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
