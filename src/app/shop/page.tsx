"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { QuoteRequestModal } from "@/components/QuoteRequestModal";
import { PRODUCTS } from "@/data/brandConfig";
import { Filter, Calculator, AlertCircle } from "lucide-react";

export default function ShopPage() {
  const [filterType, setFilterType] = useState<"all" | "pure" | "pro" | "bulk">("all");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("Pure Tung Oil");

  // Interactive Coverage Estimator
  const [sqFt, setSqFt] = useState<number>(200);
  const [coats, setCoats] = useState<number>(3);

  // Approx coverage: 1 Liter covers ~150 sq ft for 1 coat
  const totalCoverageSqFtNeeded = sqFt * coats;
  const litersNeeded = (totalCoverageSqFtNeeded / 150).toFixed(1);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filterType === "pure") return p.id.includes("pure");
    if (filterType === "pro") return p.id.includes("pro");
    if (filterType === "bulk") return p.id.includes("bulk");
    return true;
  });

  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Catalogue / Shop" }]} />

        {/* Page Header */}
        <div className="py-8 border-b border-stone mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-[11px] font-semibold tracking-widest text-walnut uppercase mb-3">
              <span>OFFICIAL CATALOGUE SPECIMEN</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-forest-dark font-normal">
              Wood-Finishing Oils & Formulations
            </h1>
            <p className="mt-3 text-base text-charcoal/80 max-w-2xl font-sans leading-relaxed">
              Explore pure cold-pressed Tung Oil, workshop-thinned architectural formulas, and bulk industrial containers. Filter by application requirement or calculate required project volume below.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedProduct("General Catalogue Consultation");
                setQuoteModalOpen(true);
              }}
              className="px-5 py-2.5 bg-forest hover:bg-forest-light text-ivory text-sm uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-xs"
            >
              Request Custom Workshop Quote
            </button>
          </div>
        </div>

        {/* Draft Notice Banner */}
        <div className="mb-10 p-5 bg-amber-500/10 border border-amber-600/20 rounded-xl text-base text-charcoal/85 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Catalogue Status:</strong> All products below represent current formulation candidates under trade trial. Prices and container SKUs are draft estimates for business planning and workshop sampling.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-base uppercase font-bold text-charcoal/70 mr-2 flex items-center gap-1.5">
              <Filter className="w-4 h-4" /> Filter by Class:
            </span>
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 text-sm sm:text-base rounded-full uppercase tracking-wider font-semibold transition-colors ${
                filterType === "all"
                  ? "bg-forest text-ivory shadow-xs"
                  : "bg-stone/50 text-charcoal/80 hover:bg-stone"
              }`}
            >
              All Formulations ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setFilterType("pure")}
              className={`px-4 py-2 text-sm sm:text-base rounded-full uppercase tracking-wider font-semibold transition-colors ${
                filterType === "pure"
                  ? "bg-forest text-ivory shadow-xs"
                  : "bg-stone/50 text-charcoal/80 hover:bg-stone"
              }`}
            >
              Pure Tung Oil
            </button>
            <button
              onClick={() => setFilterType("pro")}
              className={`px-4 py-2 text-sm sm:text-base rounded-full uppercase tracking-wider font-semibold transition-colors ${
                filterType === "pro"
                  ? "bg-forest text-ivory shadow-xs"
                  : "bg-stone/50 text-charcoal/80 hover:bg-stone"
              }`}
            >
              Architectural Blend
            </button>
            <button
              onClick={() => setFilterType("bulk")}
              className={`px-4 py-2 text-sm sm:text-base rounded-full uppercase tracking-wider font-semibold transition-colors ${
                filterType === "bulk"
                  ? "bg-forest text-ivory shadow-xs"
                  : "bg-stone/50 text-charcoal/80 hover:bg-stone"
              }`}
            >
              Bulk / Industrial
            </button>
          </div>

          <div className="text-base text-charcoal/70 font-mono font-medium">
            Showing {filteredProducts.length} items
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpenQuoteModal={(name) => {
                setSelectedProduct(name);
                setQuoteModalOpen(true);
              }}
            />
          ))}
        </div>

        {/* Interactive Coverage Calculator Section */}
        <div className="bg-forest-dark text-ivory rounded-2xl p-8 md:p-12 mb-16 border border-forest-surface shadow-xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-ivory/10 rounded-full text-xs sm:text-sm font-semibold tracking-widest text-copper-light uppercase mb-4">
              <Calculator className="w-4 h-4" />
              <span>Workshop Estimator</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-normal mb-3">
              How Much Oil Does Your Project Require?
            </h2>
            <p className="text-base sm:text-lg text-stone-muted leading-relaxed mb-8">
              Tung Oil coverage is governed by wood porosity and density. Softwoods (Pine, Cedar) absorb up to 30% more oil than refractory dense hardwoods (White Oak, Walnut, Maple).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-forest/40 p-6 rounded-xl border border-forest-surface mb-6 text-base">
              <div>
                <label className="block text-stone-muted font-semibold mb-2 text-base">
                  Total Surface Area (Square Feet):
                </label>
                <input
                  type="number"
                  min={10}
                  max={5000}
                  step={10}
                  value={sqFt}
                  onChange={(e) => setSqFt(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2.5 bg-forest-dark border border-forest-surface text-ivory rounded focus:border-copper focus:outline-none font-mono text-lg"
                />
                <span className="text-sm text-stone-muted/80 mt-1.5 block">
                  ~{(sqFt * 0.0929).toFixed(1)} m²
                </span>
              </div>

              <div>
                <label className="block text-stone-muted font-semibold mb-2 text-base">
                  Planned Coat Schedule:
                </label>
                <select
                  value={coats}
                  onChange={(e) => setCoats(parseInt(e.target.value) || 3)}
                  className="w-full px-4 py-2.5 bg-forest-dark border border-forest-surface text-ivory rounded focus:border-copper focus:outline-none font-mono text-base"
                >
                  <option value={2}>2 Coats (Light Architectural Paneling)</option>
                  <option value={3}>3 Coats (Standard Furniture / Tables)</option>
                  <option value={4}>4 Coats (Heavy Dining / Kitchen Islands)</option>
                  <option value={5}>5 Coats (Turned Objects / Exterior Teak)</option>
                </select>
                <span className="text-sm text-stone-muted/80 mt-1.5 block">
                  3 coats recommended for furniture
                </span>
              </div>

              <div className="bg-forest-surface/60 p-5 rounded-lg flex flex-col justify-center border border-copper/30 sm:col-span-2 lg:col-span-1">
                <span className="text-xs uppercase tracking-wider text-copper-light font-bold block mb-1">
                  Estimated Requirement
                </span>
                <span className="font-serif text-4xl font-bold text-ivory">
                  {litersNeeded} <span className="text-base font-sans font-normal text-stone-muted">Litres</span>
                </span>
                <span className="text-sm text-stone-muted/90 mt-1.5 font-medium">
                  Recommended order: {parseFloat(litersNeeded) <= 1 ? "1 × 1 Litre bottle" : `${Math.ceil(parseFloat(litersNeeded))} Litres`}
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-muted/80 italic leading-relaxed">
              *Calculated based on standard coverage of 14–16 m² (150 sq ft) per liter for dense hardwoods. Always order 10–15% reserve for wiping rag absorption and second-coat touch-ups.
            </p>
          </div>
        </div>
      </div>

      <QuoteRequestModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={selectedProduct}
      />
    </div>
  );
}
