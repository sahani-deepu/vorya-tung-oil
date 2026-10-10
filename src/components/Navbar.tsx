"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, ArrowUpRight, ChevronRight } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { useCart } from "@/context/CartContext";
import { BRAND } from "@/data/brandConfig";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { openCart, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Shop Tung Oil", href: "/shop" },
    { label: "Applications", href: "/applications" },
    { label: "How It Works", href: "/how-to-apply" },
    { label: "Specifications", href: "/specifications" },
    { label: "About Us", href: "/about" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Announcement Bar */}
      <div className="bg-forest-dark text-ivory text-xs sm:text-sm py-2 px-4 border-b border-forest-surface text-center tracking-wider uppercase font-medium flex items-center justify-center gap-2 sm:gap-3">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-copper animate-pulse flex-shrink-0" />
        <span className="truncate max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-none">
          {BRAND.announcement}
        </span>
        <Link
          href="/bulk-enquiry"
          className="hidden sm:inline-flex items-center gap-1 text-copper-light hover:text-ivory underline underline-offset-2 ml-1.5 transition-colors flex-shrink-0 whitespace-nowrap"
        >
          B2B Portal <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-colors duration-300 ${
          scrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-sm border-b border-stone py-3.5"
            : "bg-ivory/90 backdrop-blur-sm border-b border-stone/60 py-4"
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 xl:gap-8">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <BrandLogo variant="dark" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-2.5 lg:gap-3.5 xl:gap-5 2xl:gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1.5 text-sm xl:text-base uppercase font-semibold tracking-wider whitespace-nowrap transition-colors duration-150 hover:text-forest focus:outline-none focus-visible:ring-1 focus-visible:ring-copper flex items-center ${
                    isActive
                      ? "text-forest font-bold"
                      : "text-charcoal/80 hover:text-forest"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-copper rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            {/* Bag / Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2 text-charcoal/90 hover:text-forest transition-colors rounded-full hover:bg-stone/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper flex-shrink-0"
              aria-label={`Open shopping cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-ivory bg-copper rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Request a Quote CTA */}
            <Link
              href="/bulk-enquiry"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 xl:px-4 xl:py-2.5 bg-forest text-ivory text-sm xl:text-base font-semibold uppercase tracking-wider hover:bg-forest-light transition-all rounded-sm shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-copper whitespace-nowrap flex-shrink-0"
            >
              <span>Request Quote</span>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-forest-dark hover:text-copper transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-copper flex-shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[88px] bottom-0 bg-ivory border-b border-stone z-50 overflow-y-auto px-6 py-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <p className="text-xs tracking-widest text-charcoal/60 uppercase font-semibold border-b border-stone pb-2">
              Menu Navigation
            </p>
            <div className="flex flex-col space-y-3.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between text-lg font-serif py-2 border-b border-stone/30 ${
                      isActive ? "text-forest font-semibold text-xl" : "text-charcoal/90"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-stone-muted" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone space-y-3">
            <Link
              href="/bulk-enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 bg-forest text-ivory text-base font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              Request Bulk & Trade Pricing <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="text-sm text-charcoal/70 text-center leading-relaxed">
              Technical trade desk: {BRAND.contact.email}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
