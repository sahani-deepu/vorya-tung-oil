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
            <p className="text-sm text-stone-muted/80 max-w-sm leading-relaxed mt-3">
              Thoughtfully cold-pressed Tung Oil engineered for furniture makers, architectural millwork studios, and timber artisans who revere natural wood grain.
            </p>
            <div className="pt-2 text-xs text-stone-muted/70 flex items-start gap-2 max-w-sm bg-forest-surface/40 p-3 rounded border border-forest-surface">
              <AlertCircle className="w-4 h-4 text-copper-light flex-shrink-0 mt-0.5" />
              <span>
                <strong>Working Brand Specimen:</strong> NOVA GRAIN is a prototype identity created for evaluation. Trade specifications and ordering channels represent development placeholders.
              </span>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-ivory font-semibold mb-4 font-sans">
              Tung Oil Catalogue
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-muted/80">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    href={`/shop/${prod.slug}`}
                    className="hover:text-copper-light transition-colors flex items-center justify-between"
                  >
                    <span>{prod.name}</span>
                    <span className="text-[10px] text-stone-muted/50 border border-forest-surface px-1 py-0.5 rounded">
                      Draft
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop" className="hover:text-copper-light transition-colors text-copper-light flex items-center gap-1 pt-1">
                  All Formulations & Sizes <ArrowUpRight className="w-3 h-3" />
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
            <h4 className="text-xs uppercase tracking-widest text-ivory font-semibold mb-4 font-sans">
              Craft & Applications
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-muted/80">
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
                <Link href="/how-to-apply" className="hover:text-copper-light transition-colors text-ivory font-medium">
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
            <h4 className="text-xs uppercase tracking-widest text-ivory font-semibold mb-4 font-sans">
              Procurement & Contact
            </h4>
            <ul className="space-y-3 text-xs text-stone-muted/80">
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-copper-light mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-stone-muted/50 uppercase block">Trade Email</span>
                  <a href={`mailto:${BRAND.contact.tradeEmail}`} className="hover:text-ivory transition-colors">
                    {BRAND.contact.tradeEmail}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-copper-light mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-stone-muted/50 uppercase block">Trade Desk (Placeholder)</span>
                  <span>{BRAND.contact.phonePlaceholder}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-copper-light mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-stone-muted/50 uppercase block">Atelier Location</span>
                  <span className="text-[11px]">{BRAND.contact.studioAddressPlaceholder}</span>
                </div>
              </li>
              <li className="pt-2">
                <Link
                  href="/bulk-enquiry"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-copper text-ivory text-[11px] uppercase tracking-wider font-medium hover:bg-copper-light transition-colors rounded-xs"
                >
                  Request Bulk Tier Quote <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Policy Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-muted/60 gap-4">
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

          <div className="flex items-center gap-2 text-[11px] text-stone-muted/50">
            <Shield className="w-3.5 h-3.5 text-copper-light" />
            <span>Fictional Business Specimen for Brand Evaluation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
