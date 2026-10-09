import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ARTICLES } from "@/data/brandConfig";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wood Finishing Resources & Technical Articles — NOVA GRAIN",
  description:
    "Explore peer-reviewed and workshop-tested knowledge on Tung Oil chemistry, finish comparisons, drying vs curing, and proper woodcare protocols.",
};

export default function ResourcesPage() {
  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Resources & Articles" }]} />

        {/* Header */}
        <div className="py-8 border-b border-stone mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-semibold tracking-widest text-walnut uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5 text-copper" />
            <span>KNOWLEDGE HUB & CRAFT ARCHIVE</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-forest-dark font-normal">
            Wood Finishing Resources & Guides
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal/80 max-w-3xl font-sans leading-relaxed">
            In-depth technical guides written for furniture makers, architects, and restorers. Grounded in organic material chemistry and authentic workshop practice.
          </p>
        </div>

        {/* Featured Article Top */}
        {ARTICLES.length > 0 && (
          <div className="mb-16 bg-forest-dark text-ivory rounded-2xl overflow-hidden border border-forest-surface shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px]">
              <Image
                src={ARTICLES[0].image}
                alt={ARTICLES[0].title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute top-4 left-4 bg-copper text-ivory text-[10px] uppercase font-mono px-3 py-1 rounded font-semibold tracking-wider">
                Featured Guide
              </div>
            </div>

            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-stone-muted mb-3 font-mono">
                  <span>{ARTICLES[0].category}</span>
                  <span>•</span>
                  <span>{ARTICLES[0].readTime}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-normal leading-tight mb-3">
                  <Link href={`/resources/${ARTICLES[0].slug}`} className="hover:text-copper-light transition-colors">
                    {ARTICLES[0].title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-stone-muted/90 leading-relaxed font-sans mb-6">
                  {ARTICLES[0].excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-forest-surface flex items-center justify-between">
                <span className="text-xs text-stone-muted">By {ARTICLES[0].author}</span>
                <Link
                  href={`/resources/${ARTICLES[0].slug}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-copper-light hover:text-ivory font-semibold transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {ARTICLES.slice(1).map((art) => (
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
    </div>
  );
}
