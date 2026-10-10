import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { APPLICATIONS } from "@/data/brandConfig";
import { ArrowRight, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tung Oil Applications — Hardwood Furniture, Cabinetry, Turning & Outdoor Care",
  description:
    "Comprehensive architectural and woodworking guide to applying pure Tung Oil on solid furniture, kitchen blocks, architectural wall paneling, and exterior timber.",
};

export default function ApplicationsPage() {
  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Applications Guide" }]} />

        {/* Header */}
        <div className="py-8 border-b border-stone mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-semibold tracking-widest text-walnut uppercase mb-3">
            <Layers className="w-3.5 h-3.5 text-copper" />
            <span>ARCHITECTURAL & WORKSHOP SPECIFICATION</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-forest-dark font-normal">
            Applications Across Timber Disciplines
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal/80 max-w-3xl font-sans leading-relaxed">
            Pure Tung Oil penetrates cellular lumens to create a resilient, natural-feeling timber finish. However, proper performance demands matching coat schedules, dilution ratios, and maintenance cycles to the specific demands of each architectural environment.
          </p>
        </div>

        {/* Responsible Suitability Warning Callout */}
        <div className="mb-14 p-5 bg-stone-light border-l-4 border-copper rounded-r-xl text-sm text-charcoal/80 leading-relaxed shadow-xs">
          <h2 className="font-serif text-base font-semibold text-forest-dark mb-1">
            Material Suitability Notice
          </h2>
          <p>
            Suitability depends strictly on specific timber species density, atmospheric exposure, surface preparation, and adherence to complete curing intervals. Tung Oil is not an impermeable epoxy barrier, nor does it contain synthetic UV biocides. Outdoor timber applications require regular seasonal maintenance coats. Direct food contact surfaces require a verified 30-day oxygen cure.
          </p>
        </div>

        {/* Deep Dive Applications */}
        <div className="space-y-20 mb-24">
          {APPLICATIONS.map((app, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={app.id}
                id={app.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual */}
                <div className={`lg:col-span-6 relative ${isReversed ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-stone shadow-xl bg-stone">
                    <Image
                      src={app.image}
                      alt={app.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className={`lg:col-span-6 space-y-4 ${isReversed ? "lg:order-1" : ""}`}>
                  <span className="text-xs uppercase tracking-widest text-copper font-semibold font-mono">
                    APPLICATION DISCIPLINE 0{index + 1}
                  </span>

                  <h2 className="font-serif text-3xl sm:text-4xl text-forest-dark font-normal">
                    {app.title}
                  </h2>

                  <p className="text-base font-medium text-walnut italic">
                    {app.subtitle}
                  </p>

                  <p className="text-base text-charcoal/85 leading-relaxed font-sans">
                    {app.description}
                  </p>

                  {/* Specification Box */}
                  <div className="p-4.5 bg-ivory-light rounded-xl border border-stone space-y-2.5 text-sm text-charcoal/80">
                    <div className="flex justify-between border-b border-stone/50 pb-1.5">
                      <span className="font-medium text-charcoal/60">Recommended Formulation:</span>
                      <span className="font-semibold text-forest-dark">{app.recommendedProduct}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone/50 pb-1.5">
                      <span className="font-medium text-charcoal/60">Coat Schedule:</span>
                      <span className="font-medium text-walnut">{app.recommendedCoats}</span>
                    </div>
                    <div className="pt-1">
                      <span className="font-medium text-charcoal/60 block mb-0.5">Critical Suitability Factor:</span>
                      <p className="text-charcoal/80">{app.suitabilityNote}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/how-to-apply"
                      className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-forest hover:text-copper transition-colors"
                    >
                      <span>Read Step-by-Step Workshop Protocol</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation CTA */}
        <div className="bg-forest-dark text-ivory rounded-2xl p-8 md:p-12 text-center border border-forest-surface mb-16 shadow-xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal mb-3 text-ivory">
            Specifying Tung Oil for an Architectural Project?
          </h2>
          <p className="text-base text-stone-muted max-w-xl mx-auto leading-relaxed mb-8">
            Our material consultants provide tailored recommendations on timber preparation, dilution ratios, and coat intervals for commercial fit-outs and volume manufacturing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/bulk-enquiry"
              className="px-6 py-3 bg-copper hover:bg-copper-light text-ivory text-sm uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-md"
            >
              Request Architectural Specification Support
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 bg-forest hover:bg-forest-light text-ivory text-sm uppercase tracking-widest font-medium transition-colors rounded-xs border border-forest-surface"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
