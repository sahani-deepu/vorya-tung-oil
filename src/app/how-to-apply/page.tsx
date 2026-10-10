import React from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ApplicationGuideSteps } from "@/components/ApplicationGuideSteps";
import { Clock, Sparkles, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Apply Tung Oil — Masterclass on Sanding, Dilution, Wiping & Curing",
  description:
    "Master woodworkers step-by-step guide to applying pure Tung Oil on hardwoods. Sanding progression, citrus solvent ratios, the 45-minute wipe-off rule, and crucial rag disposal safety.",
};

export default function HowToApplyPage() {
  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "How to Apply Tung Oil" }]} />

        {/* Masterclass Hero Header */}
        <div className="py-8 border-b border-stone mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-semibold tracking-widest text-walnut uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-copper" />
            <span>THE BENCH PROTOCOL</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-forest-dark font-normal">
            The Pure Tung Oil Masterclass
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal/80 max-w-3xl font-sans leading-relaxed">
            Finishing wood with pure cold-pressed Tung Oil is a tactile, deeply satisfying woodworking craft. It cannot be rushed with artificial heaters or toxic chemical driers; it rewards patient craftsmanship with unmatched grain definition and heirloom permanence.
          </p>
        </div>

        {/* 4 Steps Component embedded */}
        <ApplicationGuideSteps />

        {/* Comprehensive Deep Dive Breakdown */}
        <div className="py-16 space-y-16 max-w-4xl mx-auto">
          {/* Phase 1: Preparation */}
          <div className="border-b border-stone pb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-copper font-semibold block mb-2">
              PHASE 01 • SURFACE PREPARATION
            </span>
            <h2 className="font-serif text-3xl text-forest-dark font-normal mb-4">
              Proper Sanding & Grain Opening
            </h2>
            <div className="space-y-4 text-base text-charcoal/85 leading-relaxed font-sans">
              <p>
                The foundation of any oil finish is established in the raw wood preparation. Because pure Tung Oil does not build a heavy plastic surface film, any sanding scratches, planer chatter marks, or glue residues will be amplified by the oil rather than covered up.
              </p>
              <div className="bg-ivory-light p-6 rounded-xl border border-stone space-y-3 text-base">
                <p className="font-bold text-forest-dark text-lg">Recommended Sanding Progression:</p>
                <p>• <strong>120 Grit:</strong> Level surface and eliminate planer knife marks or jointer scallops.</p>
                <p>• <strong>150 Grit:</strong> Remove 120-grit scratches uniformly across the workpiece.</p>
                <p>• <strong>180 Grit:</strong> Standard finish grit for open-grained softwoods (Pine, Cedar, Fir).</p>
                <p>• <strong>220 Grit:</strong> Final stopping grit for fine hardwoods (Walnut, White Oak, Cherry, Maple). Do not sand past 220 grit prior to initial oiling, as higher grits burnish timber pores shut and impede cellular absorption.</p>
              </div>
              <p>
                <strong>Water-Popping (Optional for Maximum Penetration):</strong> After sanding to 220 grit, lightly wipe the raw timber with a distilled water-damp cloth to raise compressed wood fibers. Allow to dry completely (approx. 2 hours), then kiss the wood with 220-grit sandpaper lightly by hand before oiling.
              </p>
            </div>
          </div>

          {/* Phase 2: Dilution Ratios */}
          <div className="border-b border-stone pb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-copper font-bold block mb-2">
              PHASE 02 • DILUTION & VISCOSITY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-dark font-normal mb-4">
              The Three-Coat Dilution Schedule
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans">
              <p>
                Pure virgin Tung Oil has a naturally high honey-like viscosity. For initial coats on dense hardwoods, thinning with a pure natural bio-solvent (such as 100% pure Citrus Solvent / D-Limonene) allows the oil molecules to migrate deep into capillary pores.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-base">
                <div className="p-5 bg-stone/40 rounded-xl border border-stone-muted">
                  <span className="text-copper font-bold block mb-1 text-sm uppercase tracking-wider">Coat 1: Anchor Pass</span>
                  <p className="font-semibold text-forest-dark mb-1.5 text-lg">50% Pure Tung + 50% Citrus Solvent</p>
                  <p className="text-charcoal/80 leading-relaxed">Drives deep into open xylem channels to anchor the finish directly into the cellular structure.</p>
                </div>
                <div className="p-5 bg-stone/40 rounded-xl border border-stone-muted">
                  <span className="text-copper font-bold block mb-1 text-sm uppercase tracking-wider">Coat 2: Body Pass</span>
                  <p className="font-semibold text-forest-dark mb-1.5 text-lg">75% Pure Tung + 25% Citrus Solvent</p>
                  <p className="text-charcoal/80 leading-relaxed">Builds solid resin density within the pores without overwhelming the drying rate.</p>
                </div>
                <div className="p-5 bg-stone/40 rounded-xl border border-stone-muted">
                  <span className="text-copper font-bold block mb-1 text-sm uppercase tracking-wider">Coat 3+: Finish Passes</span>
                  <p className="font-semibold text-forest-dark mb-1.5 text-lg">100% Pure Tung Oil (Uncut)</p>
                  <p className="text-charcoal/80 leading-relaxed">Applied very thinly. Buffs into a lustrous, water-repellent satin sheen.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3: The 45-Minute Wipe-off Rule */}
          <div className="border-b border-stone pb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-copper font-bold block mb-2">
              PHASE 03 • BUFFING AWAY EXCESS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-dark font-normal mb-4">
              The Non-Negotiable 45-Minute Wipe-Off Window
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans">
              <p>
                The number one mistake made by beginners is treating Tung Oil like varnish. <strong>Tung oil is an in-the-wood finish, not an on-the-wood finish.</strong>
              </p>
              <p>
                After applying oil across the piece, let it soak for 35 to 45 minutes. Watch for thirsty areas that drink in the oil and apply a little more to keep the surface uniformly wet.
              </p>
              <div className="p-6 bg-amber-500/10 border-l-4 border-amber-600 rounded-r-xl text-base sm:text-lg text-charcoal/90 leading-relaxed">
                <strong>Crucial Warning:</strong> At the 45-minute mark, vigorously buff the entire piece with clean, dry cotton rags until the timber is dry to the touch. If you leave puddles or thick wet sheen on the surface, the top layer will dry faster than the bottom, resulting in an unsightly, wrinkled frosted film that must be stripped with solvent.
              </div>
            </div>
          </div>

          {/* Phase 4: Curing Timeline */}
          <div className="border-b border-stone pb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-copper font-bold block mb-2">
              PHASE 04 • CURE CHEMISTRY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-dark font-normal mb-4">
              The 30-Day Polymerization Clock
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans">
              <p>
                Tung Oil cures via <strong>atmospheric oxidation and cross-linking</strong>, not evaporation. Fresh air (oxygen) and moderate ambient room temperatures (18°C–24°C / 65°F–75°F) are essential.
              </p>
              <div className="space-y-3 text-base">
                <div className="flex gap-4 p-4.5 bg-ivory-light rounded-xl border border-stone items-center">
                  <Clock className="w-6 h-6 text-forest flex-shrink-0" />
                  <div>
                    <span className="font-bold text-forest-dark text-lg">24 – 48 Hours:</span> Touch-dry. Safe to lightly de-nib with 0000 steel wool or 800-grit pad and apply subsequent coats.
                  </div>
                </div>
                <div className="flex gap-4 p-4.5 bg-ivory-light rounded-xl border border-stone items-center">
                  <Clock className="w-6 h-6 text-forest flex-shrink-0" />
                  <div>
                    <span className="font-bold text-forest-dark text-lg">5 – 7 Days:</span> Dry for light decorative use. Keep dry from standing liquids.
                  </div>
                </div>
                <div className="flex gap-4 p-4.5 bg-ivory-light rounded-xl border border-stone items-center">
                  <Clock className="w-6 h-6 text-forest flex-shrink-0" />
                  <div>
                    <span className="font-bold text-forest-dark text-lg">21 – 30 Days:</span> Full cellular polymerization achieved. Maximum water-repellency, heat resilience, and chemical inertness reached.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rag Safety Detailed Directive */}
          <div className="p-7 bg-red-950/10 border-2 border-red-900/30 rounded-2xl space-y-4 text-base sm:text-lg text-charcoal/90">
            <div className="flex items-center gap-2.5 text-red-900 font-serif text-2xl font-semibold">
              <AlertTriangle className="w-6 h-6 text-red-700 flex-shrink-0" />
              <span>Non-Negotiable Safety Protocol: Oily Rag Disposal</span>
            </div>
            <p className="leading-relaxed">
              Drying oils undergo an exothermic reaction as they absorb atmospheric oxygen. In a crumpled rag, the internal heat cannot dissipate into the air. Temperatures can reach 200°C+ internally, igniting spontaneous combustion within hours.
            </p>
            <p className="font-bold text-red-950 text-lg">
              Safe Disposal Options:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-charcoal/90">
              <li>Immediately immerse all oil-soaked cloths in a sealed, water-filled metal bucket.</li>
              <li>Alternatively, hang cloths completely unfolded outdoors across a metal clothesline or spread flat on bare concrete until they cure into stiff, brittle dry sheets before discarding in household waste.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
