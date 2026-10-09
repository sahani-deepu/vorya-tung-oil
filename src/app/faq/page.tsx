import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Tung Oil Chemistry, Application & Safety",
  description:
    "Everything you need to know about Pure Tung Oil: drying vs curing, food safety, water resistance, wood prep, recoat times, and spontaneous combustion safety.",
};

export default function FaqPage() {
  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Frequently Asked Questions" }]} />

        {/* Header */}
        <div className="py-8 border-b border-stone mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-semibold tracking-widest text-walnut uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-copper" />
            <span>EXPERT KNOWLEDGE BASE</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-forest-dark font-normal">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal/80 max-w-3xl font-sans leading-relaxed">
            Craft-accurate technical answers regarding cold-pressed plant drying oils, cellular penetration, chemical cross-linking, and responsible workshop practices.
          </p>
        </div>

        {/* Embed full accordion */}
        <FaqAccordion initialCategory="All" />

        {/* Workshop Consultation Card */}
        <div className="my-16 p-8 md:p-12 bg-forest-dark text-ivory rounded-2xl border border-forest-surface text-center max-w-4xl mx-auto shadow-xl">
          <h2 className="font-serif text-3xl font-normal text-ivory mb-3">
            Did not find your specific timber finishing inquiry?
          </h2>
          <p className="text-sm text-stone-muted max-w-xl mx-auto mb-6 leading-relaxed">
            Our material specialists and conservation craftsmen work daily with architects, master joiners, and woodworkers. Send us your project details for direct bench guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-copper hover:bg-copper-light text-ivory text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs"
            >
              Contact Our Technical Desk
            </Link>
            <Link
              href="/how-to-apply"
              className="px-6 py-3 bg-forest hover:bg-forest-light text-ivory text-xs uppercase tracking-widest font-medium transition-colors rounded-xs border border-forest-surface"
            >
              Read the Application Protocol
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
