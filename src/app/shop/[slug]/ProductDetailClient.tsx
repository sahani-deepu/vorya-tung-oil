"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductItem } from "@/data/brandConfig";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuoteRequestModal } from "@/components/QuoteRequestModal";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Check,
  ShieldAlert,
  ArrowRight,
  Download,
  CheckCircle2,
} from "lucide-react";

interface ProductDetailClientProps {
  product: ProductItem;
  relatedProducts: ProductItem[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  relatedProducts,
}) => {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const { addItem } = useCart();
  const currentVariant = product.variants[selectedVariantIdx] || product.variants[0];

  const handleAddToCart = () => {
    const numeric = currentVariant.priceEstimatePlaceholder?.includes("$")
      ? parseFloat(currentVariant.priceEstimatePlaceholder.replace(/[^0-9.]/g, ""))
      : 0;

    addItem({
      productId: product.id,
      name: product.name,
      size: currentVariant.size,
      sku: currentVariant.sku,
      unitPriceEstimate: currentVariant.priceEstimatePlaceholder || "Quote Required",
      numericPrice: numeric,
      quantity,
      image: product.image,
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const numericPriceString = currentVariant.priceEstimatePlaceholder?.includes("$")
    ? currentVariant.priceEstimatePlaceholder.replace(/[^0-9.]/g, "")
    : undefined;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "sku": currentVariant.sku,
    "brand": {
      "@type": "Brand",
      "name": "NOVA GRAIN",
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      ...(numericPriceString ? { price: numericPriceString } : {}),
      "availability": "https://schema.org/PreOrder",
    },
  };

  return (
    <div className="bg-ivory min-h-screen py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Catalogue", href: "/shop" },
            { label: product.name },
          ]}
        />

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-6 mb-20">
          {/* Gallery Left (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone border-2 border-stone shadow-xl">
              <Image
                src={product.gallery[selectedImgIdx] || product.image}
                alt={`${product.name} packaging shot`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              <div className="absolute top-4 left-4 bg-amber-100/95 backdrop-blur-sm text-amber-900 text-[10px] uppercase font-mono px-2.5 py-1 rounded shadow-xs border border-amber-300">
                Draft Product Specimen
              </div>
            </div>

            {/* Thumbnails */}
            {product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImgIdx(i)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImgIdx === i
                        ? "border-copper shadow-md scale-95"
                        : "border-stone opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Safety Spontaneous Combustion Callout */}
            <div className="p-4 bg-red-950/5 border border-red-900/20 rounded-lg text-xs text-charcoal/80 flex items-start gap-3 mt-6">
              <ShieldAlert className="w-4 h-4 text-red-800 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Workshop Hazard Notice:</strong> Rags, brushes, and wiping towels damp with drying oil must be immediately soaked in water or laid flat to dry before disposal to prevent heat build-up and spontaneous combustion.
              </p>
            </div>
          </div>

          {/* Details & Purchasing Right (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-stone rounded text-[10px] uppercase tracking-widest text-charcoal/70 font-mono mb-2">
                {product.eyebrow}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-forest-dark font-normal leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-walnut font-medium mt-1">
                {product.subtitle}
              </p>

              {/* Price placeholder */}
              <div className="mt-4 pt-4 border-t border-stone flex items-baseline gap-3">
                <span className="font-serif text-3xl font-semibold text-forest-dark">
                  {currentVariant.priceEstimatePlaceholder || "Quote Required"}
                </span>
                <span className="text-[11px] text-charcoal/60 uppercase">
                  (Estimated Draft Unit Value)
                </span>
              </div>

              <p className="text-xs text-charcoal/80 leading-relaxed mt-4">
                {product.longDescription}
              </p>

              {/* Variant Selector */}
              <div className="mt-6 pt-6 border-t border-stone">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-semibold text-charcoal uppercase tracking-wider">
                    Container Size:
                  </span>
                  <span className="text-walnut font-medium">SKU: {currentVariant.sku}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.sku}
                      type="button"
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`p-3 text-left rounded border transition-all ${
                        selectedVariantIdx === idx
                          ? "border-forest bg-forest text-ivory shadow-xs"
                          : "border-stone bg-ivory-light text-charcoal/80 hover:border-forest/50"
                      }`}
                    >
                      <div className="font-medium text-xs">{v.size}</div>
                      <div className={`text-[10px] mt-0.5 ${selectedVariantIdx === idx ? "text-stone-muted" : "text-charcoal/60"}`}>
                        {v.priceEstimatePlaceholder || "Quote"}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-3 p-3 bg-stone/40 rounded text-xs text-charcoal/80 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">Estimated Coverage:</span>
                    <span className="font-medium">{currentVariant.coverageSqFt} ({currentVariant.coverageSqM})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">Suggested Scale:</span>
                    <span className="font-medium">{currentVariant.suggestedUse}</span>
                  </div>
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="mt-6 pt-6 border-t border-stone space-y-3">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center border border-stone-muted rounded bg-ivory-light">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-charcoal hover:bg-stone text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-charcoal hover:bg-stone text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 ${
                      addedSuccess
                        ? "bg-forest-light text-ivory"
                        : "bg-forest hover:bg-forest-light text-ivory"
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Atelier Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Order Bag
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="w-full py-3 bg-ivory border border-stone-muted hover:border-forest text-forest-dark text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs flex items-center justify-center gap-2"
                >
                  Request Commercial Batch Pricing & CoA
                </button>
              </div>
            </div>

            {/* Quick Specs Snapshot */}
            <div className="pt-6 border-t border-stone text-xs text-charcoal/80 space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal/60">Sheen Profile:</span>
                <span className="font-medium text-forest-dark">{product.specs.sheen}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Recoat Interval:</span>
                <span className="font-medium text-forest-dark">{product.specs.recoatTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Full Oxygen Cure:</span>
                <span className="font-medium text-forest-dark">{product.specs.fullCureTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">VOC Classification:</span>
                <span className="font-medium text-forest-dark">{product.specs.vocContent}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Data Sheet & Chemical Metrics Section */}
        <div className="bg-ivory-light rounded-2xl p-8 md:p-12 border border-stone mb-20 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-stone gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-copper font-semibold block mb-1">
                LABORATORY & WORKSHOP PROFILE
              </span>
              <h2 className="font-serif text-3xl text-forest-dark font-normal">
                Technical Data Sheet (TDS) Summary
              </h2>
            </div>
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-forest text-ivory text-xs uppercase tracking-wider font-medium hover:bg-forest-light self-start rounded-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Draft TDS Document</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-medium text-forest-dark border-b border-stone/60 pb-2">
                Physical & Chemical Properties
              </h3>
              <div className="flex justify-between py-1 border-b border-stone/30">
                <span className="text-charcoal/60">Raw Botanical Source</span>
                <span className="font-medium text-forest-dark">{product.specs.origin}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone/30">
                <span className="text-charcoal/60">Extraction Method</span>
                <span className="font-medium text-forest-dark">{product.specs.extraction}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone/30">
                <span className="text-charcoal/60">Solvent Dilution</span>
                <span className="font-medium text-forest-dark">{product.specs.purity}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone/30">
                <span className="text-charcoal/60">VOC Emissions</span>
                <span className="font-medium text-forest-dark">{product.specs.vocContent}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-lg font-medium text-forest-dark border-b border-stone/60 pb-2">
                Application & Curing Parameters
              </h3>
              <div className="flex justify-between py-1 border-b border-stone/30">
                <span className="text-charcoal/60">Recommended Coats</span>
                <span className="font-medium text-forest-dark">{product.specs.recommendedCoats}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone/30">
                <span className="text-charcoal/60">Tack-Free Wipe Window</span>
                <span className="font-medium text-forest-dark">30 – 45 minutes</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone/30">
                <span className="text-charcoal/60">Recoat Window</span>
                <span className="font-medium text-forest-dark">{product.specs.recoatTime}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone/30">
                <span className="text-charcoal/60">Full Cross-linking Cure</span>
                <span className="font-medium text-forest-dark">{product.specs.fullCureTime}</span>
              </div>
            </div>
          </div>

          {/* Key Advantages Checklist */}
          <div className="mt-8 pt-8 border-t border-stone">
            <h3 className="font-serif text-lg font-medium text-forest-dark mb-4">
              Key Formulation Characteristics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-charcoal/80">
                  <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-20">
            <h2 className="font-serif text-3xl text-forest-dark font-normal mb-8 pb-4 border-b border-stone">
              Complementary Finishing Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-ivory-light p-6 rounded-xl border border-stone flex gap-6 items-center"
                >
                  <div className="relative w-24 h-24 rounded-lg bg-stone overflow-hidden flex-shrink-0">
                    <Image src={rel.image} alt={rel.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-medium text-forest-dark mb-1">
                      <Link href={`/shop/${rel.slug}`}>{rel.name}</Link>
                    </h3>
                    <p className="text-xs text-charcoal/70 line-clamp-2 mb-3">
                      {rel.description}
                    </p>
                    <Link
                      href={`/shop/${rel.slug}`}
                      className="text-xs uppercase tracking-widest font-semibold text-forest hover:text-copper inline-flex items-center gap-1"
                    >
                      View Formulation <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <QuoteRequestModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={product.name}
      />
    </div>
  );
};
