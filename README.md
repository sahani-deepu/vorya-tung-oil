# NOVA GRAIN — Premium Pure Tung Oil & Architectural Wood Finishes

> **Tagline:** *"Bring Out the Soul of Wood."*  
> **Brand Positioning:** Premium cold-pressed Tung Oil and advanced botanical wood-care solutions for master furniture makers, architects, joinery studios, restoration specialists, and individual craftspeople.

---

## 1. Project Overview & Brand Identity

**NOVA GRAIN** is an editorial, luxury wood-care and finishing brand platform built with production-grade Next.js 16, TypeScript, Tailwind CSS, and custom botanical photography.

- **Centralized Brand Architecture:** All brand names, contact channels, product formulations, pricing placeholders, and technical specifications are isolated in [`src/data/brandConfig.ts`](file:///c:/src/vorya-tung-oil/src/data/brandConfig.ts). When official business details are finalized, editing this single file updates the entire website.
- **Visual Identity:**
  - **Emblem:** Concentric annual tree growth-rings enclosing a heartwood seed kernel.
  - **Color Palette:**
    - *Midnight Forest:* `#173A32` (Deep evergreen)
    - *Warm Ivory:* `#F7F4EC` (Architectural cream background)
    - *Natural Walnut:* `#76513C` (Timber warm brown)
    - *Muted Copper:* `#B77B51` (Metallic craft accent)
    - *Deep Charcoal:* `#252A27` (Editorial contrast)
    - *Soft Stone:* `#E8E3D9` (Neutral border & card fill)
  - **Typography:**
    - Headlines: **Cormorant Garamond** (Refined serif)
    - Interface & Body: **DM Sans** (Clean, legible sans-serif)

---

## 2. Implemented Routes & Navigation

| Route | Page Title | Key Features |
|---|---|---|
| [`/`](file:///c:/src/vorya-tung-oil/src/app/page.tsx) | Homepage | Hero, Product Intro, Collection, Before/After Slider, Applications, Benefits, 4-Step Guide, Tech Specs Table, Brand Story, B2B Portal, Resources, FAQs |
| [`/shop`](file:///c:/src/vorya-tung-oil/src/app/shop/page.tsx) | Catalogue / Shop | Category filters, draft unit pricing, container sizes, interactive Project Coverage Calculator |
| [`/shop/[slug]`](file:///c:/src/vorya-tung-oil/src/app/shop/[slug]/page.tsx) | Product Details | Dynamic route (`pure-tung-oil`, `professional-wood-finishing-oil`, `bulk-tung-oil-industrial`), image gallery, SKU selector, Add to Bag, TDS summary |
| [`/applications`](file:///c:/src/vorya-tung-oil/src/app/applications/page.tsx) | Applications Guide | Detailed breakdown of solid furniture, architectural paneling, woodturning, restoration, and exterior decking with explicit suitability caveats |
| [`/how-to-apply`](file:///c:/src/vorya-tung-oil/src/app/how-to-apply/page.tsx) | Application Masterclass | Bench protocol: sanding progression (120–220 grit), citrus dilution ratios, 45-minute wipe-off rule, 30-day cure chemistry, and spontaneous combustion safety |
| [`/about`](file:///c:/src/vorya-tung-oil/src/app/about/page.tsx) | Brand Philosophy | The Living Material Doctrine: non-film polymerization, respecting wood moisture movement, zero synthetic driers |
| [`/specifications`](file:///c:/src/vorya-tung-oil/src/app/specifications/page.tsx) | Technical Specifications | Interactive table comparing ASTM D1963, D1747, and D1639 parameters, confirmed vs TBC indicators, TDS/SDS download requests |
| [`/resources`](file:///c:/src/vorya-tung-oil/src/app/resources/page.tsx) | Knowledge Hub | Archive of 5 in-depth guides with reading times, category tags, and author credits |
| [`/resources/[slug]`](file:///c:/src/vorya-tung-oil/src/app/resources/[slug]/page.tsx) | Article Pages | Editorial layout with pull-quotes, chemical formulas, rag safety warnings, and schema.org Article structured data |
| [`/bulk-enquiry`](file:///c:/src/vorya-tung-oil/src/app/bulk-enquiry/page.tsx) | B2B Procurement Portal | Dedicated portal for volume tiers (5L, 20L, 200L Drum, 1,000L IBC Tote) with form validation, honeypot spam protection, and staged submission feedback |
| [`/contact`](file:///c:/src/vorya-tung-oil/src/app/contact/page.tsx) | Contact Us | Inquiry form with timber species fields, atelier communication details, and response commitments |
| [`/faq`](file:///c:/src/vorya-tung-oil/src/app/faq/page.tsx) | FAQ Archive | Categorized accordions with schema.org FAQPage structured data |
| [`/cart`](file:///c:/src/vorya-tung-oil/src/app/cart/page.tsx) | Order Bag & Staged Checkout | Cart item management, quantity counters, subtotal calculations, and draft checkout staging |
| [`/privacy`](file:///c:/src/vorya-tung-oil/src/app/privacy/page.tsx) | Privacy Policy (Draft) | Transparent draft disclosure placeholder |
| [`/terms`](file:///c:/src/vorya-tung-oil/src/app/terms/page.tsx) | Terms & Conditions (Draft) | Commercial framework and mandatory user safety disclaimers |
| [`/shipping-returns`](file:///c:/src/vorya-tung-oil/src/app/shipping-returns/page.tsx) | Shipping & Returns (Draft) | Freight classification, drum logistics, and RMA criteria |
| [`/sitemap.xml`](file:///c:/src/vorya-tung-oil/src/app/sitemap.ts) | XML Sitemap | Auto-generated canonical URL index for all 28 static and dynamic routes |
| [`/robots.txt`](file:///c:/src/vorya-tung-oil/src/app/robots.ts) | Search Engine Directives | Crawler accessibility configuration |

---

## 3. Interactive Technical Features

1. **Interactive Wood Transformation Drag Slider:**
   - Real-time comparison between raw, dry 220-grit American Black Walnut and 3-coat cured Pure Tung Oil on the identical board.
   - Touch-enabled, mouse-drag, and accessible keyboard arrow navigation (`←` / `→`).
2. **Persistent Cart State & Slide-Over Bag Drawer:**
   - Powered by React Context (`CartContext`) with automatic `localStorage` persistence.
   - Dynamic variant pricing and unit subtotal calculations.
   - Seamless transition into batch quotation staging.
3. **Interactive Project Coverage Estimator:**
   - Live square footage and coat schedule input calculating exact liter requirements based on hardwood cellular density.
4. **Interactive Technical Specifications Table:**
   - Filter tabs for *All Parameters*, *Confirmed Baselines*, and *Pending Lab Verification (TBC)*.
   - Unverified laboratory measurements are honestly marked *"To be confirmed"* rather than fabricated.
5. **Printable Workshop Protocol Sheet:**
   - Bench-ready printable card for woodworking shops with dilution ratios, wipe-off timers, and fire prevention reminders.
6. **Accessible FAQ Accordion & SEO Structured Data:**
   - Keyboard accessible drawer toggles with injected `FAQPage`, `Product`, `Organization`, and `Article` schema.

---

## 4. Setup, Development & Production Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Compile optimized production bundle (validates TypeScript & all routes)
npm run build

# Launch production server locally on port 3000
npm run start -- -p 3000
```

---

## 5. Remaining Business Information Needed Before Commercial Launch

To transition this complete platform from a draft specimen to an active commercial enterprise, provide the following operational inputs:

1. **Official Legal Entity & Trademark:**
   - Final business registration name and registered corporate address in [`src/data/brandConfig.ts`](file:///c:/src/vorya-tung-oil/src/data/brandConfig.ts).
2. **Merchant & Payment Gateway Integration:**
   - Connect Stripe API keys or Shopify Headless storefront in `src/app/cart/page.tsx`.
3. **Transactional Email / CRM Webhook:**
   - Connect Resend, SendGrid, or HubSpot API endpoint to the quote form handlers in `src/components/QuoteRequestModal.tsx` and `src/app/bulk-enquiry/page.tsx`.
4. **Third-Party Laboratory Certificates:**
   - Replace *"To be confirmed"* rows in `src/data/brandConfig.ts` with confirmed ASTM D1639, D1959, and D1963 test values and batch lot numbers.
5. **Commercial Carrier & Hazmat Account:**
   - Integrate LTL freight rates (e.g., Freightos / FedEx Freight) for 200L drum shipments and specify carrier return terms.
