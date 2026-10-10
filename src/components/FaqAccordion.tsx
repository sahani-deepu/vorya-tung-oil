"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/brandConfig";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import Link from "next/link";

interface FaqAccordionProps {
  initialCategory?: "All" | "General" | "Application" | "Curing & Safety" | "B2B & Bulk";
  limit?: number;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  initialCategory = "All",
  limit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1]); // first two open by default

  const categories = ["All", "General", "Application", "Curing & Safety", "B2B & Bulk"];

  const filteredFaqs = FAQS.filter(
    (faq) => selectedCategory === "All" || faq.category === selectedCategory
  ).slice(0, limit || FAQS.length);

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Structured Data Schema for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filteredFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section className="py-20 md:py-28 bg-ivory" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-medium tracking-widest text-walnut uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-copper" />
            <span>Clear & Honest Guidance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest-dark font-normal">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-charcoal/80 max-w-xl mx-auto font-sans leading-relaxed">
            Straightforward technical answers regarding cold-pressed seed oils, polymerization chemistry, and proper workshop precautions.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 text-sm sm:text-base rounded-full transition-all uppercase tracking-wider font-semibold ${
                  selectedCategory === cat
                    ? "bg-forest text-ivory shadow-xs"
                    : "bg-stone/50 text-charcoal/80 hover:bg-stone hover:text-forest"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndexes.includes(idx);
            return (
              <div
                key={idx}
                className="border border-stone rounded-xl overflow-hidden bg-ivory-light transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full px-6 md:px-7 py-5 md:py-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:bg-stone/40"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-xl sm:text-2xl font-medium text-forest-dark">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-stone/70 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-copper/20 text-copper" : "text-charcoal/60"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 md:px-7 pb-6 pt-1 text-base sm:text-lg text-charcoal/90 leading-relaxed font-sans border-t border-stone/40">
                    <p>{faq.answer}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-walnut/90 font-medium">
                      <span className="px-3 py-1 bg-stone rounded-full text-xs sm:text-sm uppercase font-semibold">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-14 p-7 md:p-8 bg-forest-dark text-ivory rounded-2xl text-center flex flex-col sm:flex-row items-center justify-between gap-5 border border-forest-surface shadow-xl">
          <div className="text-left">
            <h4 className="font-serif text-2xl font-medium text-ivory">Have a complex timber specification question?</h4>
            <p className="text-base text-stone-muted mt-1 leading-relaxed">Our wood conservation and finishing team assists architects and craftspeople directly.</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 bg-copper hover:bg-copper-light text-ivory text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-2 rounded-xs flex-shrink-0 shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consult Our Atelier</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
