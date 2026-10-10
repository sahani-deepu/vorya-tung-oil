import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Sparkles, Layers, ShieldCheck, Droplets, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About NOVA GRAIN — Crafted for People Who Understand Wood",
  description:
    "The story and material philosophy behind NOVA GRAIN. Unadulterated botanical drying oils, cellular timber penetration, and non-plastic wood preservation.",
};

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "About Us" }]} />

        {/* Hero Section */}
        <div className="py-8 border-b border-stone mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-semibold tracking-widest text-walnut uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-copper" />
            <span>ORIGIN & ETHOS</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-forest-dark font-normal max-w-4xl leading-tight">
            Made for People Who Understand Wood.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal/80 max-w-3xl font-sans leading-relaxed">
            NOVA GRAIN was created from a reverence for natural timber. We reject synthetic plastic film coatings that suffocate wood pores, choosing instead the quiet, honest permanence of genuine cold-pressed Tung Oil.
          </p>
        </div>

        {/* Prototype Brand Disclaimer */}
        <div className="mb-14 p-5 bg-stone/50 border border-stone-muted rounded-xl text-sm text-charcoal/85 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-copper flex-shrink-0 mt-0.5" />
          <p>
            <strong>Brand Genesis Note:</strong> NOVA GRAIN is an emerging brand concept currently in active formula evaluation. We do not publish fabricated histories, unverified certifications, or exaggerated heritage claims. Our commitment is rooted in verifiable botanical material science and pure workshop performance.
          </p>
        </div>

        {/* Dual Split Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-stone shadow-xl">
              <Image
                src="/images/craftsman-applying.jpg"
                alt="Woodworker applying tung oil"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans">
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-dark font-normal">
              The Living Material Doctrine
            </h2>

            <p>
              When a tree is felled and milled into boards, its physical life changes, but its organic response to the atmosphere never ceases. Wood breathes. It expands across the summer humidity and contracts through the dry winter frost.
            </p>

            <p>
              When modern commercial finishes encase timber in rigid polyurethane or synthetic lacquer films, they trap moisture beneath an unyielding plastic crust. Over time, seasonal dimensional movement creates micro-fissures in the finish, causing yellowing, clouding, and irreversible peeling.
            </p>

            <p>
              <strong>Tung Oil works differently.</strong> Cold-pressed from the seeds of <em>Vernicia fordii</em>, it contains pure conjugated triene fatty acids. When introduced to raw wood, capillary suction draws the oil into the deepest lumens of the wood cells. Here, it reacts directly with atmospheric oxygen to form an insoluble, flexible polymer <em>within the wood fibers themselves</em>.
            </p>

            <div className="p-5 bg-ivory-light rounded-xl border border-stone space-y-3 text-base">
              <span className="font-serif text-xl font-semibold text-forest-dark block">
                The Three Guiding Principles:
              </span>
              <p>• <strong>Cellular Penetration:</strong> Never build a film over the wood. Fill the pores and let the wood breathe.</p>
              <p>• <strong>Uncut Integrity:</strong> Never compromise purity with hidden synthetic metallic driers.</p>
              <p>• <strong>Tactile Reverence:</strong> The finished object must feel warm, smooth, and authentic to the human hand.</p>
            </div>
          </div>
        </div>

        {/* Botanical Origin Grid */}
        <div className="bg-stone-light/40 rounded-2xl p-8 md:p-12 border border-stone mb-20">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-copper font-bold block mb-1">
              THE BOTANICAL SOURCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-dark font-normal">
              The Chemistry of Vernicia fordii
            </h2>
            <p className="mt-3 text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
              Tung trees have been cultivated for centuries across East Asia for their seed oil, celebrated as the world&apos;s most naturally water-repellent plant extract.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base">
            <div className="bg-ivory p-7 rounded-xl border border-stone shadow-xs">
              <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-forest-dark mb-2.5">Alpha-Eleostearic Acid</h3>
              <p className="text-charcoal/80 leading-relaxed">
                Making up over 80% of Tung Oil’s fatty acid profile, this conjugated triene contains three alternating double bonds that trigger spontaneous oxidative cross-linking upon exposure to air.
              </p>
            </div>

            <div className="bg-ivory p-7 rounded-xl border border-stone shadow-xs">
              <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mb-4">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-forest-dark mb-2.5">Mechanical Expeller Extraction</h3>
              <p className="text-charcoal/80 leading-relaxed">
                Our seed oil is mechanically cold-pressed without chemical hexane solvents, preserving the natural triglyceride integrity and warm amber color of the pure seed.
              </p>
            </div>

            <div className="bg-ivory p-7 rounded-xl border border-stone shadow-xs">
              <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-forest-dark mb-2.5">Non-Toxic When Cured</h3>
              <p className="text-charcoal/80 leading-relaxed">
                Because our Pure Tung Oil contains no synthetic heavy metal driers, the fully cross-linked polymer is chemically stable and inert once the 30-day cure cycle is completed.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 border-t border-stone">
          <h2 className="font-serif text-3xl sm:text-4xl text-forest-dark font-normal mb-4">
            Experience the Touch of Genuine Tung Oil
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              href="/shop"
              className="px-7 py-3.5 bg-forest hover:bg-forest-light text-ivory text-sm uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-md"
            >
              Explore the Collection
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3.5 bg-ivory border border-stone-muted hover:border-forest text-forest-dark text-sm uppercase tracking-widest font-semibold transition-colors rounded-xs"
            >
              Contact Our Atelier
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
