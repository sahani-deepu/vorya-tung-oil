import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin, AlertCircle, Shield } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { BRAND, PRODUCTS } from "@/data/brandConfig";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-dark text-stone-muted pt-16 pb-12 border-t border-forest-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-forest-surface/70">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" size="lg" />
            <p className="text-base sm:text-lg text-stone-muted/85 max-w-sm leading-relaxed mt-3">
              Thoughtfully cold-pressed Tung Oil engineered for furniture makers, architectural millwork studios, and timber artisans who revere natural wood grain.
            </p>
            <div className="pt-2 text-sm sm:text-base text-stone-muted/85 flex items-start gap-2 max-w-sm bg-forest-surface/40 p-3.5 rounded border border-forest-surface">
              <AlertCircle className="w-5 h-5 text-copper-light flex-shrink-0 mt-0.5" />
              <span>
                <strong>Working Brand Specimen:</strong> NOVA GRAIN is a prototype identity created for evaluation. Trade specifications and ordering channels represent development placeholders.
              </span>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="text-base uppercase tracking-wider text-ivory font-bold mb-4 font-sans">
              Tung Oil Catalogue
            </h4>
            <ul className="space-y-3 text-base text-stone-muted/85">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    href={`/shop/${prod.slug}`}
                    className="hover:text-copper-light transition-colors flex items-center justify-between"
                  >
                    <span>{prod.name}</span>
                    <span className="text-xs text-stone-muted/60 border border-forest-surface px-2 py-0.5 rounded font-mono">
                      Draft
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop" className="hover:text-copper-light transition-colors text-copper-light flex items-center gap-1.5 pt-1 font-semibold">
                  All Formulations & Sizes <ArrowUpRight className="w-4 h-4" />
                </Link>
              </li>
              <li>
                <Link href="/specifications" className="hover:text-copper-light transition-colors">
                  Technical Data Comparison
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Applications & Craft */}
          <div>
            <h4 className="text-base uppercase tracking-wider text-ivory font-bold mb-4 font-sans">
              Craft & Applications
            </h4>
            <ul className="space-y-3 text-base text-stone-muted/85">
              <li>
                <Link href="/applications" className="hover:text-copper-light transition-colors">
                  Solid Furniture & Tables
                </Link>
              </li>
              <li>
                <Link href="/applications" className="hover:text-copper-light transition-colors">
                  Architectural Cabinetry
                </Link>
              </li>
              <li>
                <Link href="/applications" className="hover:text-copper-light transition-colors">
                  Artisan Woodcraft & Turning
                </Link>
              </li>
              <li>
                <Link href="/applications" className="hover:text-copper-light transition-colors">
                  Exterior Decking & Cladding
                </Link>
              </li>
              <li>
                <Link href="/how-to-apply" className="hover:text-copper-light transition-colors text-ivory font-semibold">
                  Application Masterclass
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-copper-light transition-colors">
                  Knowledge Hub & Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trade & Contact */}
          <div>
            <h4 className="text-base uppercase tracking-wider text-ivory font-bold mb-4 font-sans">
              Procurement & Contact
            </h4>
            <ul className="space-y-3.5 text-base text-stone-muted/85">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-copper-light mt-1 flex-shrink-0" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-muted/60 font-semibold block">Trade Email</span>
                  <a href={`mailto:${BRAND.contact.tradeEmail}`} className="hover:text-ivory transition-colors text-stone-muted/95">
                    {BRAND.contact.tradeEmail}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-copper-light mt-1 flex-shrink-0" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-muted/60 font-semibold block">Direct Contact Desk</span>
                  <a href={`tel:${BRAND.contact.phonePlaceholder.replace(/[^0-9+]/g, "")}`} className="hover:text-ivory transition-colors text-stone-muted/95">
                    {BRAND.contact.phonePlaceholder}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-copper-light mt-1 flex-shrink-0" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-muted/60 font-semibold block">Atelier Location</span>
                  <span className="text-sm sm:text-base text-stone-muted/90">{BRAND.contact.studioAddressPlaceholder}</span>
                </div>
              </li>
              <li className="pt-2">
                <Link
                  href="/bulk-enquiry"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-copper text-ivory text-sm uppercase tracking-wider font-semibold hover:bg-copper-light transition-colors rounded-xs shadow-xs"
                >
                  Request Bulk Tier Quote <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Policy Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-base text-stone-muted/75 gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <span>© 2026 {BRAND.name}. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-ivory transition-colors underline underline-offset-2">
              Privacy Policy (Draft)
            </Link>
            <Link href="/terms" className="hover:text-ivory transition-colors underline underline-offset-2">
              Terms & Conditions (Draft)
            </Link>
            <Link href="/shipping-returns" className="hover:text-ivory transition-colors underline underline-offset-2">
              Shipping & Returns (Draft)
            </Link>
          </div>

          <div className="flex items-center gap-2 text-sm text-stone-muted/70">
            <Shield className="w-4 h-4 text-copper-light" />
            <span>Fictional Business Specimen for Brand Evaluation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
