"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldAlert, ArrowRight, Printer, FileText } from "lucide-react";

export const ApplicationGuideSteps: React.FC = () => {
  const [printModalOpen, setPrintModalOpen] = useState(false);

  const steps = [
    {
      step: "01",
      title: "Prepare the Wood",
      eyebrow: "SURFACE PREPARATION",
      summary: "Progressive sanding to open cellular vascular pores without glaze.",
      detail: "Sand timber through progressive grits: 120 → 150 → 180, finishing at 220 grit for hardwoods (stop at 180 for softwoods). Avoid ultra-high grits that polish wood pores shut. Vacuum all timber dust thoroughly and wipe down with a dry microfiber cloth. Moisture content of wood must be under 12%.",
      tip: "For refractory timbers like Teak or Ipe, wipe with mineral spirits to remove surface resins 15 minutes before oiling.",
    },
    {
      step: "02",
      title: "Apply the Oil Generously",
      eyebrow: "PORE SATURATION",
      summary: "Work oil into the grain with brush, natural bristle, or lint-free cotton.",
      detail: "Apply an even, liberal coat in the direction of the timber grain. On raw hardwood, thin the first coat 50/50 with pure citrus solvent or use NOVA GRAIN Pro Finishing Oil for maximum cellular depth. Let the wood drink the oil for 30 to 45 minutes, re-wetting any dry hungry spots that absorb rapidly.",
      tip: "Do not leave puddles unattended beyond 45 minutes; raw tung oil will begin surface skinning.",
    },
    {
      step: "03",
      title: "Wipe Away All Excess",
      eyebrow: "THE 40-MINUTE RULE",
      summary: "Vigorously buff surface completely dry until no wet sheen transfers to a clean cloth.",
      detail: "This is the single most critical step in pure tung oil finishing. With clean, dry cotton cloths, buff the wood surface thoroughly. Pure Tung oil must cure INSIDE the wood cells, not as a thick pool on the surface. If you see sticky spots or tacky puddles later, wipe them vigorously immediately.",
      tip: "Check the timber after 1 hour: some wood species 'weep' oil back out of pores. Buff away any weep dots.",
    },
    {
      step: "04",
      title: "Allow to Cure & Recoat",
      eyebrow: "POLYMERIZATION",
      summary: "Allow 24–48 hours between thin coats. Full cross-link cure in 21–30 days.",
      detail: "Place the piece in an airy room with good oxygen circulation (20°C / 68°F). Tung oil cures via oxidation, not solvent evaporation. Apply 3 to 5 coats total. Burnish lightly with ultra-fine abrasive pad (0000 steel wool or 800 grit) between coats. Allow 21 to 30 days before exposing to standing water or heat.",
      tip: "Patience creates the finish: unadulterated botanical oil builds one of the world's most resilient natural finishes.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-stone-light/50 border-y border-stone" id="application-guide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-stone">
          <div>
            <span className="text-xs uppercase tracking-widest text-copper font-semibold block mb-1">
              THE ARTISAN PROTOCOL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest-dark font-normal">
              How to Apply Tung Oil: Four Essential Steps
            </h2>
            <p className="mt-3 text-base text-charcoal/80 max-w-2xl font-sans leading-relaxed">
              Applying genuine Tung Oil is a tactile, meditative woodworking ritual. Unlike synthetic polyurethane, there are no fumes or brush marks—only deep cellular saturation that deepens with time.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={() => setPrintModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-ivory border border-stone-muted hover:border-forest text-forest-dark text-xs uppercase tracking-widest font-medium transition-colors rounded-xs shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-copper" />
              <span>View Printable Guide Sheet</span>
            </button>
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-ivory p-6 rounded-lg border border-stone shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-stone pb-3">
                  <span className="font-serif text-3xl font-light text-copper">
                    {st.step}
                  </span>
                  <span className="text-xs tracking-widest uppercase font-semibold text-charcoal/70 bg-stone/70 px-2.5 py-0.5 rounded">
                    {st.eyebrow}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium text-forest-dark mb-2">
                  {st.title}
                </h3>
                <p className="text-sm font-medium text-walnut mb-3 italic">
                  {st.summary}
                </p>
                <p className="text-sm text-charcoal/85 leading-relaxed font-sans mb-4">
                  {st.detail}
                </p>
              </div>

              <div className="mt-auto pt-3 border-t border-stone/50 bg-stone/30 p-3 rounded text-xs text-charcoal/75">
                <strong className="text-forest-dark block mb-0.5">Craftsman Tip:</strong>
                {st.tip}
              </div>
            </div>
          ))}
        </div>

        {/* Safety Warning Box */}
        <div className="mt-12 p-6 bg-red-950/5 border border-red-900/20 rounded-xl flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-800/10 text-red-800 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="text-sm text-charcoal/85 leading-relaxed">
            <h4 className="text-base font-serif font-semibold text-red-900 mb-1 uppercase tracking-wide">
              Mandatory Safety Warning: Spontaneous Combustion Risk
            </h4>
            <p>
              Like all natural drying oils (such as raw linseed or walnut oil), Tung Oil cures via an exothermic oxidation reaction. <strong>Cloth rags, towels, or steel wool saturated with Tung Oil can generate sufficient internal heat to ignite spontaneously if left crumpled in a pile.</strong> After use, ALWAYS immediately submerge application rags in a water-filled metal bucket or lay them completely flat outdoors on concrete to dry stiff before disposal.
            </p>
          </div>
        </div>

        {/* Link to Full Masterclass */}
        <div className="mt-10 text-center">
          <Link
            href="/how-to-apply"
            className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-copper underline underline-offset-4 tracking-wide"
          >
            Read Our Comprehensive Hardwood Finishing Masterclass <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Printable Sheet Modal */}
      {printModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-ivory max-w-2xl w-full p-8 rounded-xl shadow-2xl border border-stone text-left">
            <div className="flex items-center justify-between border-b border-stone pb-4 mb-6">
              <div>
                <h3 className="font-serif text-2xl text-forest-dark">NOVA GRAIN • Workshop Protocol Card</h3>
                <p className="text-xs text-charcoal/60 uppercase tracking-widest mt-0.5">Quick Reference for Benches & Studios</p>
              </div>
              <button
                onClick={() => setPrintModalOpen(false)}
                className="text-charcoal/60 hover:text-charcoal text-sm p-1"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-xs text-charcoal/80 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <div className="p-3 bg-stone rounded">
                <p className="font-semibold text-forest-dark">Ratio Guidelines for Pure Tung Oil:</p>
                <p>• <strong>Coat 1 (Pore Anchor):</strong> 1 part Pure Tung Oil + 1 part Citrus Solvent (50/50)</p>
                <p>• <strong>Coat 2 (Grain Body):</strong> 2 parts Pure Tung Oil + 1 part Citrus Solvent (67/33)</p>
                <p>• <strong>Coat 3 & 4 (Finish Film):</strong> 100% Pure Tung Oil (Uncut)</p>
              </div>
              <p><strong>Wipe-Off Window:</strong> Wait exactly 35 to 45 minutes after application. Wipe down aggressively until dry to the touch.</p>
              <p><strong>Recoat Interval:</strong> Minimum 24 hours under active room ventilation (20°C / 68°F).</p>
              <p><strong>Cure Time:</strong> Surface usable with light care in 5 days. Full chemical cure in 30 days.</p>
              <div className="p-3 bg-red-100/50 text-red-950 rounded border border-red-200">
                <strong>Oily Rags:</strong> Submerge in water immediately after wiping.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone flex justify-between items-center">
              <span className="text-[11px] text-charcoal/60">Ready for workshop clipboards</span>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-forest text-ivory text-xs uppercase tracking-wider font-medium flex items-center gap-2 hover:bg-forest-light"
              >
                <Printer className="w-4 h-4" /> Print Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
