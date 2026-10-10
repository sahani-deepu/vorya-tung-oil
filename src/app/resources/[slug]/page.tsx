import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ARTICLES } from "@/data/brandConfig";
import { ArrowRight, Calendar, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} — NOVA GRAIN Knowledge Hub`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | NOVA GRAIN`,
      description: article.excerpt,
      images: [{ url: article.image }],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": article.authorRole,
    },
    "publisher": {
      "@type": "Organization",
      "name": "NOVA GRAIN",
      "logo": {
        "@type": "ImageObject",
        "url": "https://novagrain.example.com/favicon.svg",
      },
    },
    "datePublished": "2026-10-01",
  };

  return (
    <article className="bg-ivory min-h-screen py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Resources", href: "/resources" },
            { label: article.title },
          ]}
        />

        {/* Article Header */}
        <header className="py-8 border-b border-stone mb-10">
          <div className="flex items-center gap-3 text-xs text-copper font-mono uppercase tracking-widest mb-3">
            <span>{article.category}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest-dark font-normal leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-walnut font-serif italic mb-6">
            {article.subtitle}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-stone/50 text-sm text-charcoal/70">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone flex items-center justify-center font-serif font-bold text-forest-dark text-base">
                {article.author.charAt(0)}
              </div>
              <div>
                <span className="font-semibold text-forest-dark block text-base">{article.author}</span>
                <span className="text-xs sm:text-sm text-charcoal/60">{article.authorRole}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-charcoal/70 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-12 shadow-xl border border-stone">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        {/* Editorial Body Content */}
        <div className="prose prose-stone max-w-none text-charcoal/85 text-base sm:text-lg lg:text-xl leading-relaxed font-sans space-y-6">
          <p className="text-xl sm:text-2xl font-serif italic text-forest-dark leading-relaxed border-l-4 border-copper pl-5 py-1">
            {article.excerpt}
          </p>

          <h2 className="font-serif text-2xl sm:text-3xl text-forest-dark font-normal pt-4">
            The Fundamental Molecular Kinetics
          </h2>
          <p>
            Unlike mineral oils that sit inertly inside timber pores or evaporation-based lacquer solvents that vanish into the atmosphere leaving brittle acrylic resins, pure Tung Oil (derived from the seed nuts of <em>Vernicia fordii</em>) is chemically classified as a polyunsaturated drying oil.
          </p>
          <p>
            Its dominant constituent—accounting for roughly 80% to 85% of total fatty acid content—is <strong>alpha-eleostearic acid</strong> (9-cis, 11-trans, 13-trans-octadecatrienoic acid). The presence of three conjugated carbon-carbon double bonds imparts an extraordinary reactivity toward ambient oxygen. When raw oil is absorbed into open wood cells and exposed to air, free-radical addition reactions cause these unsaturated chains to cross-link into a dense three-dimensional polymeric network.
          </p>

          {/* Pull Quote Box */}
          <div className="my-8 p-7 bg-ivory-light border border-stone rounded-xl shadow-xs">
            <h3 className="font-serif text-2xl text-forest-dark font-medium mb-2.5">
              Why Non-Film Polymerization Matters
            </h3>
            <p className="text-lg sm:text-xl text-charcoal/85 leading-relaxed italic">
              “When wood is coated in polyurethane, the finish belongs to the room, not the wood. When wood is saturated with pure Tung Oil, the finish belongs to the cellular architecture of the tree itself.”
            </p>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-forest-dark font-normal pt-4">
            Drying vs. Curing: The Critical Distinction
          </h2>
          <p>
            Many finish failures occur because woodworkers conflate <em>tack-free evaporation</em> with <em>chemical curing</em>.
          </p>
          <ul className="list-disc pl-6 space-y-3 text-base sm:text-lg">
            <li>
              <strong>Surface Dry (24–48 Hours):</strong> The oil at the immediate wood-air interface has absorbed enough oxygen to form initial gel chains. The surface feels dry to the hand and can be lightly de-nibbed with fine abrasives without gumming.
            </li>
            <li>
              <strong>Full Polymerization Cure (21–30 Days):</strong> Oxygen molecules slowly diffuse deeper into cellular pores, cross-linking the interior oil matrix. Only after 30 days is the finish fully water-repellent, acid-resistant, and completely food-safe for tableware.
            </li>
          </ul>

          {/* Safety Callout */}
          <div className="my-8 p-6 bg-red-950/10 border border-red-900/30 rounded-xl flex items-start gap-3.5 text-base sm:text-lg text-charcoal/90 leading-relaxed">
            <AlertTriangle className="w-6 h-6 text-red-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-900 block mb-1 text-lg">Critical Workshop Reminder:</strong>
              Because this cross-linking polymerization is exothermic, application cloths soaked in drying oil must be soaked in water or laid completely flat outdoors to cure safely before disposal.
            </div>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-forest-dark font-normal pt-4">
            Workshop Takeaways & Next Steps
          </h2>
          <p>
            Whether finishing an heirloom walnut dining table or custom architectural wall paneling, success with Tung Oil requires respecting the natural timing of plant chemistry. Prepare the timber thoroughly, wipe away excess aggressively within 45 minutes, and allow the living oxygen in your shop to complete the transformation.
          </p>
        </div>

        {/* Bottom Related Section */}
        <div className="mt-16 pt-12 border-t border-stone">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl text-forest-dark font-normal">
              Related Technical Guides
            </h3>
            <Link href="/resources" className="text-sm uppercase tracking-widest text-forest hover:text-copper font-bold">
              All Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <div key={rel.slug} className="p-6 bg-ivory-light border border-stone rounded-xl">
                <span className="text-xs text-copper uppercase font-mono font-bold tracking-wider">{rel.category}</span>
                <h4 className="font-serif text-xl font-medium text-forest-dark mt-1.5 mb-2">
                  <Link href={`/resources/${rel.slug}`}>{rel.title}</Link>
                </h4>
                <p className="text-base text-charcoal/80 line-clamp-2 mb-3 leading-relaxed">{rel.excerpt}</p>
                <Link href={`/resources/${rel.slug}`} className="text-base font-semibold text-forest hover:text-copper inline-flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
