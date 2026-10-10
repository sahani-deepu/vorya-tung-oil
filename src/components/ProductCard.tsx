"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductItem } from "@/data/brandConfig";
import { ShoppingBag, ArrowRight, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: ProductItem;
  onOpenQuoteModal?: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenQuoteModal }) => {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const { addItem } = useCart();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentVariant = product.variants[selectedVariantIdx] || product.variants[0];

  const handleAddToCart = () => {
    // Parse numeric price estimate or 0 if bulk
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
      quantity: 1,
      image: product.image,
    });

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="bg-ivory rounded-xl border border-stone overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-stone overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-forest-dark/90 backdrop-blur-md text-ivory text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm border border-forest-surface">
              {product.badge}
            </span>
          )}
          <span className="bg-amber-100/95 backdrop-blur-sm text-amber-900 text-[11px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-sm border border-amber-300/60">
            Draft Specimen
          </span>
        </div>

        {/* Eyebrow Floating */}
        <div className="absolute bottom-3 left-3 bg-ivory/90 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono uppercase tracking-widest text-charcoal/80">
          {product.eyebrow}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-2xl font-normal text-forest-dark group-hover:text-copper transition-colors">
            <Link href={`/shop/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="text-sm text-walnut font-medium mt-1 line-clamp-1">
            {product.subtitle}
          </p>
          <p className="text-sm text-charcoal/80 mt-2.5 line-clamp-3 leading-relaxed">
            {product.description}
          </p>

          {/* Size / Variant Selector */}
          <div className="mt-4 pt-4 border-t border-stone/60">
            <label className="text-xs uppercase tracking-wider text-charcoal/70 font-semibold block mb-2">
              Select Volume Container:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v, i) => (
                <button
                  key={v.sku}
                  type="button"
                  onClick={() => setSelectedVariantIdx(i)}
                  className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                    selectedVariantIdx === i
                      ? "bg-forest text-ivory border-forest font-medium"
                      : "bg-ivory-light text-charcoal/80 border-stone hover:border-forest/50"
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>

            {/* Coverage Hint */}
            <p className="text-xs text-charcoal/70 mt-2 font-mono">
              Covers approx. {currentVariant.coverageSqFt} ({currentVariant.coverageSqM})
            </p>
          </div>
        </div>

        {/* Pricing & Call to Action */}
        <div className="mt-6 pt-4 border-t border-stone flex items-center justify-between">
          <div>
            <span className="text-xs text-charcoal/60 uppercase tracking-wider block">
              Estimated Value
            </span>
            <span className="text-lg font-serif font-semibold text-forest-dark">
              {currentVariant.priceEstimatePlaceholder || "Quote on Request"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {product.id === "nova-bulk-industrial-tung-oil" ? (
              <button
                type="button"
                onClick={() => onOpenQuoteModal ? onOpenQuoteModal(product.name) : null}
                className="px-3.5 py-2 bg-copper hover:bg-copper-light text-ivory text-xs font-semibold uppercase tracking-wider transition-colors rounded-xs flex items-center gap-1.5"
              >
                <span>Bulk Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-xs flex items-center gap-1.5 ${
                  addedAnimation
                    ? "bg-forest-light text-ivory"
                    : "bg-forest hover:bg-forest-light text-ivory"
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                  </>
                )}
              </button>
            )}

            <Link
              href={`/shop/${product.slug}`}
              className="p-2 border border-stone-muted hover:border-forest text-charcoal/70 hover:text-forest transition-colors rounded-xs"
              aria-label={`View full details of ${product.name}`}
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
