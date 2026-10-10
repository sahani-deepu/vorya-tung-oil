"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Droplets,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Sliders,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { ProductCard } from "@/components/ProductCard";
import { ApplicationGuideSteps } from "@/components/ApplicationGuideSteps";
import { TechSpecsTable } from "@/components/TechSpecsTable";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QuoteRequestModal } from "@/components/QuoteRequestModal";
import { PRODUCTS, APPLICATIONS, ARTICLES, BRAND } from "@/data/brandConfig";

export default function HomePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState("Pure Tung Oil");
  const [b2bSubmitted, setB2bSubmitted] = useState(false);
  const [b2bLoading, setB2bLoading] = useState(false);
  const [b2bError, setB2bError] = useState<string | null>(null);
  const [b2bReferenceId, setB2bReferenceId] = useState("");
  const [b2bFormData, setB2bFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    customerType: "Cabinetmaker / Furniture Studio",
    estimatedQuantity: "5 – 20 Litres (Workshop Tier)",
    intendedApplication: "Solid Wood Furniture & Tables",
    message: "",
  });

  const handleOpenQuoteModal = (productName: string) => {
    setSelectedProductForQuote(productName);
    setQuoteModalOpen(true);
  };

  const handleB2bSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setB2bLoading(true);
    setB2bError(null);

    try {
      const res = await fetch("/api/enquiries/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...b2bFormData,
          source: "homepage_b2b",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const detailMsg = data.details ? Object.values(data.details).join(" ") : "";
        throw new Error(detailMsg || data.error || "Failed to submit trade inquiry.");
      }

      setB2bReferenceId(data.referenceId || "NG-BLK-CONFIRMED");
      setB2bSubmitted(true);
    } catch (err: unknown) {
      setB2bError(err instanceof Error ? err.message : "Unable to reach server. Please check your connection.");
    } finally {
      setB2bLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* ======================================================== */}
      {/* 1. HERO SECTION                                          */}
      {/* ======================================================== */}
      <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center bg-forest-dark text-ivory overflow-hidden">
        {/* Editorial Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-walnut.jpg"
            alt="NOVA GRAIN Pure Tung Oil bottle on rich dark walnut wood table with directional morning sunlight"
            fill
            priority
            className="object-cover object-center opacity-45 lg:opacity-50 filter brightness-95 contrast-105"
            sizes="100vw"
          />
          {/* Subtle gradient vignette for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/75 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-transparent to-forest-dark/40 z-10" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-ivory/10 backdrop-blur-md border border-ivory/20 rounded-full text-[11px] md:text-xs tracking-[0.25em] text-copper-light uppercase font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-copper-light animate-pulse" />
              <span>WOOD FINISHING • MATERIAL CARE • CRAFTSMANSHIP</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory tracking-tight leading-[1.08] mb-6">
              Let the Natural Beauty of Wood Speak.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-stone-muted/90 font-sans font-normal leading-relaxed max-w-2xl mb-10">
              Thoughtfully formulated Tung Oil for enhancing wood grain and creating a rich, natural-looking finish. Explore a considered approach to wood care, from furniture restoration to professional woodworking.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/shop"
                className="px-8 py-4 bg-copper hover:bg-copper-light text-ivory text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-xs shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2 group"
              >
                <span>Explore Tung Oil</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="#applications"
                className="px-8 py-4 bg-ivory/10 hover:bg-ivory/20 backdrop-blur-sm border border-ivory/30 text-ivory text-xs uppercase tracking-widest font-medium transition-all duration-300 rounded-xs text-center"
              >
                Find Your Application
              </Link>
            </div>

            {/* Responsible Baseline Metrics (No fake claims) */}
            <div className="mt-14 pt-8 border-t border-ivory/15 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl text-xs">
              <div>
                <span className="font-serif text-2xl md:text-3xl font-light text-ivory block">
                  100%
                </span>
                <span className="text-[11px] uppercase tracking-wider text-stone-muted/70 mt-0.5 block font-sans">
                  Pure Seed Oil (Uncut)
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl md:text-3xl font-light text-copper-light block">
                  0 g/L
                </span>
                <span className="text-[11px] uppercase tracking-wider text-stone-muted/70 mt-0.5 block font-sans">
                  Zero Petroleum VOCs
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="font-serif text-2xl md:text-3xl font-light text-ivory block">
                  Non-Film
                </span>
                <span className="text-[11px] uppercase tracking-wider text-stone-muted/70 mt-0.5 block font-sans">
                  Deep Pore Penetration
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. PRODUCT INTRODUCTION                                   */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 bg-ivory relative overflow-hidden" id="about-tung-oil">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Left: Dual image composition (Botanical seeds + Bottle) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-stone shadow-xl">
                <Image
                  src="/images/product-pure-tung.jpg"
                  alt="NOVA GRAIN 100% Pure Cold-Pressed Tung Oil 500ml studio packaging"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Floating Botanical Seed Card */}
              <div className="hidden sm:block absolute -bottom-8 -right-8 w-48 h-48 rounded-lg overflow-hidden border-4 border-ivory shadow-2xl">
                <Image
                  src="/images/tung-seeds.jpg"
                  alt="Raw Vernicia fordii seeds and nuts on slate"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[9px] uppercase tracking-widest text-ivory font-mono font-medium">
                    Vernicia fordii Seeds
                  </span>
                </div>
              </div>
            </div>

            {/* Copy Right */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-medium tracking-widest text-walnut uppercase">
                <Layers className="w-3.5 h-3.5 text-copper" />
                <span>The Botanical Finish</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest-dark font-normal tracking-tight">
                More Than a Finish. A Celebration of Wood.
              </h2>

              <p className="text-base text-charcoal/85 leading-relaxed font-sans">
                Tung Oil is one of nature’s most remarkable finishing materials. Cold-pressed from the seed nuts of the Tung tree (<em>Vernicia fordii</em>), it contains a rare biological composition rich in <strong>alpha-eleostearic acid</strong>—a conjugated triene fatty acid that polymerizes naturally when exposed to ambient atmospheric oxygen.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-4 bg-ivory-light rounded-lg border border-stone">
                  <h3 className="font-serif text-lg font-medium text-forest-dark mb-1.5">
                    How It Interacts with Wood
                  </h3>
                  <p className="text-xs text-charcoal/80 leading-relaxed">
                    Unlike polyurethane which coats timber in a rigid plastic film that eventually cracks, Tung Oil is drawn deep into open cellular lumens. It cures <em>inside</em> the grain, flexing with natural seasonal wood movement.
                  </p>
                </div>

                <div className="p-4 bg-ivory-light rounded-lg border border-stone">
                  <h3 className="font-serif text-lg font-medium text-forest-dark mb-1.5">
                    Awakening Natural Chatoyancy
                  </h3>
                  <p className="text-xs text-charcoal/80 leading-relaxed">
                    As pure oil saturates the wood cells, light refracts through the translucent resin matrix, illuminating hidden fiddleback, curls, and medullary rays with unmatched three-dimensional depth.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-stone/50 rounded-lg border-l-4 border-copper text-xs text-charcoal/80 leading-relaxed">
                <strong>Pure vs. Blended Finishes:</strong> Many retail products labelled “Tung Oil Finish” contain only minimal plant oil diluted with synthetic varnishes and mineral spirits. NOVA GRAIN Pure Tung Oil is unadulterated Grade A cold-pressed seed oil with zero added driers or petroleum fillers.
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-forest hover:text-copper transition-colors"
                >
                  <span>Read the Full NOVA GRAIN Philosophy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. PRODUCT COLLECTION SHOWCASE                           */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 bg-stone-light/40 border-t border-stone" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-stone">
            <div>
              <span className="text-xs uppercase tracking-widest text-copper font-semibold block mb-1">
                CURATED OIL FORMULATIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest-dark font-normal">
                The Product Collection
              </h2>
              <p className="mt-2 text-sm text-charcoal/75 max-w-xl font-sans">
                Available in draft catalogue quantities for workshop trials, architectural specification samples, and industrial contract supply.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <span className="text-xs text-charcoal/60 bg-stone px-3 py-1.5 rounded-full border border-stone-muted">
                3 Catalogue Proposals
              </span>
              <Link
                href="/shop"
                className="text-xs uppercase tracking-widest font-semibold text-forest hover:text-copper flex items-center gap-1"
              >
                View Full Shop <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 3 Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onOpenQuoteModal={handleOpenQuoteModal}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. WOOD TRANSFORMATION (BEFORE & AFTER SLIDER)           */}
      {/* ======================================================== */}
      <BeforeAfterSlider />

      {/* ======================================================== */}
      {/* 5. APPLICATIONS GALLERY                                  */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 bg-stone-light/50 border-t border-stone" id="applications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs uppercase tracking-widest text-copper font-semibold block mb-1">
              SURFACE ARCHITECTURE & JOINERY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest-dark font-normal">
              Applications Across Woodworking Disciplines
            </h2>
            <p className="mt-3 text-base text-charcoal/80 font-sans leading-relaxed">
              From heirloom walnut dining tables to architectural interior millwork. Each application requires careful consideration of timber porosity, exposure moisture, and recommended coat schedules.
            </p>
          </div>

          {/* Applications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {APPLICATIONS.map((app) => (
              <div
                key={app.id}
                className="bg-ivory rounded-xl border border-stone overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone">
                  <Image
                    src={app.image}
                    alt={app.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-ivory text-xs font-serif font-light tracking-wide">
                    {app.subtitle}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-forest-dark mb-2">
                      {app.title}
                    </h3>
                    <p className="text-xs text-charcoal/80 leading-relaxed mb-4">
                      {app.description}
                    </p>

                    <div className="p-3 bg-ivory-light rounded border border-stone space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-charcoal/60 font-medium">Recommended:</span>
                        <span className="text-forest-dark font-semibold text-right">{app.recommendedProduct}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal/60 font-medium">Coat Schedule:</span>
                        <span className="text-walnut font-medium">{app.recommendedCoats}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-stone">
                    <p className="text-[11px] text-charcoal/60 italic leading-relaxed mb-3">
                      <strong>Suitability:</strong> {app.suitabilityNote}
                    </p>
                    <Link
                      href="/applications"
                      className="text-xs uppercase tracking-widest font-semibold text-forest hover:text-copper flex items-center gap-1.5 transition-colors"
                    >
                      <span>{app.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Broad Suitability Clarification Notice */}
          <div className="mt-12 p-4 bg-stone rounded-lg border border-stone-muted text-xs text-charcoal/80 text-center max-w-3xl mx-auto">
            <strong>Suitability Clarification:</strong> Suitability depends strictly on specific formulation dilution, wood species density, ambient temperature, and post-cure exposure. Pure Tung Oil is not recommended for submersion marine hulls or unmaintained exterior horizontal decking in wet climates without scheduled recoats.
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. WHY CHOOSE OUR PRODUCTS (BENEFITS)                    */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 bg-forest-dark text-ivory relative overflow-hidden" id="why-choose">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-copper-light font-semibold block mb-2">
              RESTRAINED MATERIAL INTEGRITY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory font-normal">
              Why Discerning Craftspeople Choose NOVA GRAIN
            </h2>
            <p className="mt-4 text-base text-stone-muted leading-relaxed font-sans">
              We make no unverified claims of miracle longevity or universal suitability. We rely on the verified physical chemistry of pure plant-drying oils and honest workshop formulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-forest/40 border border-forest-surface hover:border-copper/40 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-copper/20 text-copper-light flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-ivory font-normal mb-3">
                Non-Film Forming Cellular Bond
              </h3>
              <p className="text-xs text-stone-muted leading-relaxed">
                Polyurethane and thick varnishes rest as a plastic film above the timber. When wood expands and contracts with atmospheric humidity, film finishes develop microscopic fissures that trap moisture, turn cloudy, and peel. Tung Oil cures deep inside the cell walls—meaning it can never flake, peel, or blister.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-forest/40 border border-forest-surface hover:border-copper/40 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-copper/20 text-copper-light flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-ivory font-normal mb-3">
                Natural Chatoyancy & Warmth
              </h3>
              <p className="text-xs text-stone-muted leading-relaxed">
                Rather than muddying wood grain behind chemical pigments or artificial dyes, pure Tung Oil saturates the vascular channels of hardwoods, increasing the refractive contrast between earlywood and latewood rings. The result is a luminous, shimmering depth that intensifies with every buffed coat.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-forest/40 border border-forest-surface hover:border-copper/40 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-copper/20 text-copper-light flex items-center justify-center mb-6">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-ivory font-normal mb-3">
                Flexible Atmospheric Cure
              </h3>
              <p className="text-xs text-stone-muted leading-relaxed">
                Pure Tung oil polymerizes into a natural thermoset-like polymer that repels water, resists mild fruit acids and alcohol spills, and allows the timber beneath to breathe. Water beads naturally across the surface without synthetic sealants.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-forest/40 border border-forest-surface hover:border-copper/40 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-copper/20 text-copper-light flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-ivory font-normal mb-3">
                Zero Toxic Synthetic Driers
              </h3>
              <p className="text-xs text-stone-muted leading-relaxed">
                Many modern “drying oils” add toxic cobalt or zirconium heavy-metal driers to force rapid drying. NOVA GRAIN Pure Tung Oil is unadulterated cold-pressed seed oil. Once fully cured (21–30 days), it is inert, non-toxic, and traditionally prized for wooden tableware.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-forest/40 border border-forest-surface hover:border-copper/40 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-copper/20 text-copper-light flex items-center justify-center mb-6">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-ivory font-normal mb-3">
                Effortless Spot Repairs
              </h3>
              <p className="text-xs text-stone-muted leading-relaxed">
                When polyurethane is scratched or dented, repairing the surface requires sanding down the entire tabletop. With a Tung Oil finish, scratches can be localized, touched up with a small drop of oil on a rag, and buffed back to a seamless matching sheen without edge rings.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-forest/40 border border-forest-surface hover:border-copper/40 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-copper/20 text-copper-light flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-ivory font-normal mb-3">
                Batch Testing & Industrial Support
              </h3>
              <p className="text-xs text-stone-muted leading-relaxed">
                For manufacturing operations and architectural projects, we offer verified batch lots with Certificates of Analysis covering specific gravity, acid index, and iodine numbers to ensure consistent cure times in automated or shop environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. APPLICATION GUIDE (4 STEPS)                           */}
      {/* ======================================================== */}
      <ApplicationGuideSteps />

      {/* ======================================================== */}
      {/* 8. TECHNICAL SPECIFICATIONS TABLE                        */}
      {/* ======================================================== */}
      <TechSpecsTable />

      {/* ======================================================== */}
      {/* 9. BRAND STORY                                           */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 bg-ivory relative overflow-hidden" id="brand-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Text Left */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-copper font-semibold block mb-1">
                OUR PHILOSOPHY OF SLOW CRAFT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest-dark font-normal leading-tight">
                Made for People Who Understand Wood.
              </h2>

              <p className="text-base text-charcoal/85 leading-relaxed font-sans">
                Wood is not plastic. It is not inert drywall or painted metal. Wood is an organic, cellular organism that lived, grew rings across decades of sunlight and rain, and continues to breathe moisture as temperatures fluctuate.
              </p>

              <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
                Covering high-character American Walnut, White Oak, or reclaimed Teak beneath heavy coats of plastic synthetic varnish suffocates its tactile warmth and conceals its natural texture under glossy artificial reflection.
              </p>

              <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
                NOVA GRAIN was conceived on a simple premise: honor the material. By harvesting pure, unadulterated Tung seed oil and combining it with uncompromising batch standards, we provide craftsmen with a finish that feels like wood, moves with wood, and ages gracefully across generations of use.
              </p>

              <div className="pt-4 border-t border-stone flex flex-wrap gap-8 text-xs text-charcoal/70">
                <div>
                  <span className="font-serif text-xl font-medium text-forest-dark block">Zero Compromise</span>
                  <span>Pure botanical cold-press oil</span>
                </div>
                <div>
                  <span className="font-serif text-xl font-medium text-forest-dark block">Slow Polymerization</span>
                  <span>Honest curing timelines</span>
                </div>
                <div>
                  <span className="font-serif text-xl font-medium text-forest-dark block">Tactile Reverence</span>
                  <span>Never a plastic film barrier</span>
                </div>
              </div>
            </div>

            {/* Photo Right */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-stone shadow-xl">
                <Image
                  src="/images/craftsman-applying.jpg"
                  alt="Master artisan buffing pure Tung oil into live edge walnut slab in natural workshop light"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="mt-3 text-[11px] text-charcoal/60 text-right italic font-mono">
                Artisan applying second coat to live-edge walnut slab table.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. PROFESSIONAL & BULK ENQUIRIES (B2B SECTION)          */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 bg-forest-dark text-ivory relative" id="bulk-enquiries">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Context */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest text-copper-light font-semibold block mb-1">
                COMMERCIAL & TRADE DESK
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory font-normal leading-tight">
                Your Next Project Deserves the Right Finish.
              </h2>
              <p className="text-sm text-stone-muted leading-relaxed font-sans">
                We partner with bespoke furniture workshops, architectural millwork suppliers, flooring manufacturers, and restoration practices requiring dependable, bulk-calibrated Tung Oil supply.
              </p>

              <div className="space-y-4 pt-2 text-xs text-stone-muted/90">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-copper-light flex-shrink-0 mt-0.5" />
                  <span>Tiered wholesale volume pricing for 5L, 20L pails, and 200L drums</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-copper-light flex-shrink-0 mt-0.5" />
                  <span>Batch lot consistency and Certificate of Analysis (CoA) documentation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-copper-light flex-shrink-0 mt-0.5" />
                  <span>Technical consultations for automated wipe setups and spray-rag protocols</span>
                </div>
              </div>

              <div className="p-4 bg-forest-surface/50 rounded-lg border border-forest-surface text-xs text-stone-muted">
                <span className="font-semibold text-ivory block mb-1">Direct Trade Desk Email:</span>
                <a href={`mailto:${BRAND.contact.tradeEmail}`} className="text-copper-light underline hover:text-ivory">
                  {BRAND.contact.tradeEmail}
                </a>
              </div>
            </div>

            {/* Right B2B Form */}
            <div className="lg:col-span-7 bg-ivory text-charcoal rounded-xl p-6 sm:p-8 border border-stone shadow-2xl">
              {b2bSubmitted ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-forest mx-auto mb-4" />
                  <h3 className="font-serif text-2xl text-forest-dark mb-2">Trade Inquiry Logged</h3>
                  <p className="text-xs text-charcoal/80 max-w-md mx-auto mb-4 leading-relaxed">
                    Thank you, <strong>{b2bFormData.name}</strong> from <strong>{b2bFormData.businessName}</strong>. Your requirement for <strong>{b2bFormData.estimatedQuantity}</strong> has been securely registered in the trade ledger.
                  </p>
                  <div className="p-4 bg-stone rounded-lg text-xs text-charcoal/80 text-left mb-6 border border-stone-muted">
                    <p className="font-semibold text-forest-dark mb-1">
                      Enquiry Reference ID: <span className="font-mono text-copper font-bold">{b2bReferenceId}</span>
                    </p>
                    <p className="text-[11px] text-charcoal/70">
                      Our commercial technical team will review your specifications and contact <strong>{b2bFormData.email}</strong> within 1 business day.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setB2bSubmitted(false);
                      setB2bReferenceId("");
                    }}
                    className="px-6 py-2.5 bg-forest text-ivory text-xs uppercase tracking-widest font-medium hover:bg-forest-light"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleB2bSubmit} className="space-y-4 text-xs">
                  <div className="border-b border-stone pb-3 mb-4">
                    <h3 className="font-serif text-2xl font-medium text-forest-dark">
                      Request Bulk Trade Pricing & Samples
                    </h3>
                    <p className="text-[11px] text-charcoal/60 mt-0.5">
                      Fill out your workshop specifications below. All fields marked with * are required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-charcoal mb-1">Contact Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Thomas Avery"
                        value={b2bFormData.name}
                        onChange={(e) => setB2bFormData({ ...b2bFormData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-charcoal mb-1">Workshop or Business Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Avery Architectural Joinery"
                        value={b2bFormData.businessName}
                        onChange={(e) => setB2bFormData({ ...b2bFormData, businessName: e.target.value })}
                        className="w-full px-3 py-2 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-charcoal mb-1">Professional Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="deepusahani08@gmail.com"
                        value={b2bFormData.email}
                        onChange={(e) => setB2bFormData({ ...b2bFormData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-charcoal mb-1">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        placeholder="+91-9616495093"
                        value={b2bFormData.phone}
                        onChange={(e) => setB2bFormData({ ...b2bFormData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-medium text-charcoal mb-1">Customer Classification</label>
                      <select
                        value={b2bFormData.customerType}
                        onChange={(e) => setB2bFormData({ ...b2bFormData, customerType: e.target.value })}
                        className="w-full px-3 py-2 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                      >
                        <option>Cabinetmaker / Furniture Studio</option>
                        <option>Architect / Interior Designer</option>
                        <option>Flooring & Decking Contractor</option>
                        <option>Industrial Timber Mill</option>
                        <option>Distributor / Reseller</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-charcoal mb-1">Estimated Quantity</label>
                      <select
                        value={b2bFormData.estimatedQuantity}
                        onChange={(e) => setB2bFormData({ ...b2bFormData, estimatedQuantity: e.target.value })}
                        className="w-full px-3 py-2 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                      >
                        <option>Trial Sample Kit (250ml - 1L)</option>
                        <option>5 – 20 Litres (Workshop Tier)</option>
                        <option>50 – 200 Litres (Contractor Drum)</option>
                        <option>1,000L IBC Tote / Pallet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-charcoal mb-1">Primary Application</label>
                      <select
                        value={b2bFormData.intendedApplication}
                        onChange={(e) => setB2bFormData({ ...b2bFormData, intendedApplication: e.target.value })}
                        className="w-full px-3 py-2 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none"
                      >
                        <option>Solid Wood Furniture & Tables</option>
                        <option>Architectural Fluted Wall Paneling</option>
                        <option>Hardwood Flooring</option>
                        <option>Turned Objects & Craft</option>
                        <option>Exterior Decking / Cladding</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-charcoal mb-1">Intended Timber Species & Scope *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Specify your timber species (e.g. White Oak, American Walnut), square footage, desired sheen level, and timeline."
                      value={b2bFormData.message}
                      onChange={(e) => setB2bFormData({ ...b2bFormData, message: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory-light border border-stone-muted rounded focus:border-copper focus:outline-none resize-none"
                    />
                  </div>

                  {b2bError && (
                    <div className="p-3 bg-red-950/10 border border-red-800/30 rounded text-red-900 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-700" />
                      <span>{b2bError}</span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-charcoal/60">
                      Response timeline: 1 business day
                    </span>
                    <button
                      type="submit"
                      disabled={b2bLoading}
                      className="px-6 py-3 bg-forest hover:bg-forest-light text-ivory text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 rounded-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {b2bLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Registering...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Batch Enquiry</span>
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
      </section>

      {/* ======================================================== */}
      {/* 11. EDUCATIONAL RESOURCES / ARTICLES PREVIEW             */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 bg-ivory" id="resources">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-stone">
            <div>
              <span className="text-xs uppercase tracking-widest text-copper font-semibold block mb-1">
                KNOWLEDGE & CRAFT RESEARCH
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest-dark font-normal">
                Educational Resources & Guides
              </h2>
              <p className="mt-2 text-sm text-charcoal/70 max-w-xl font-sans">
                Evidence-based articles on polymerization kinetics, wood preparation, finish comparisons, and workshop protocols.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <Link
                href="/resources"
                className="text-xs uppercase tracking-widest font-semibold text-forest hover:text-copper flex items-center gap-1.5 transition-colors"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.slice(0, 3).map((art) => (
              <article
                key={art.slug}
                className="bg-ivory-light rounded-xl border border-stone overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-forest-dark/80 backdrop-blur-sm text-ivory text-[10px] uppercase font-mono px-2 py-0.5 rounded">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-charcoal/60 mb-2 flex items-center gap-2">
                      <span>{art.date}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="font-serif text-xl font-medium text-forest-dark group-hover:text-copper transition-colors mb-2 leading-snug">
                      <Link href={`/resources/${art.slug}`}>{art.title}</Link>
                    </h3>

                    <p className="text-xs text-charcoal/70 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone flex items-center justify-between text-xs">
                    <span className="text-[11px] text-walnut font-medium">By {art.author}</span>
                    <Link
                      href={`/resources/${art.slug}`}
                      className="text-forest hover:text-copper font-medium flex items-center gap-1 text-[11px] uppercase tracking-wider"
                    >
                      Read Guide <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 12. FREQUENTLY ASKED QUESTIONS                           */}
      {/* ======================================================== */}
      <FaqAccordion limit={6} />

      {/* ======================================================== */}
      {/* 13. FINAL CONVERSION SECTION                             */}
      {/* ======================================================== */}
      <section className="py-24 md:py-32 bg-forest-dark text-ivory relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-walnut.jpg"
            alt="Walnut wood texture with natural luster"
            fill
            className="object-cover opacity-25 filter brightness-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest-dark/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-copper-light font-semibold block">
            HONOR THE LIVING GRAIN
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory font-light tracking-tight leading-tight">
            Good Wood Deserves a Thoughtful Finish.
          </h2>

          <p className="text-base sm:text-lg text-stone-muted/90 max-w-2xl mx-auto font-sans leading-relaxed">
            Experience the tactile depth and non-film-forming permanence of unadulterated cold-pressed Tung Oil. Request a workshop test sample or browse our catalogue.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-4 bg-copper hover:bg-copper-light text-ivory text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-lg flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 bg-ivory/10 hover:bg-ivory/20 backdrop-blur-sm border border-ivory/30 text-ivory text-xs uppercase tracking-widest font-medium transition-colors rounded-xs"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* B2B Quote Modal */}
      <QuoteRequestModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={selectedProductForQuote}
      />
    </div>
  );
}
