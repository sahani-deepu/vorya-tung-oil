export interface BrandConfig {
  name: string;
  legalName: string;
  tagline: string;
  subTagline: string;
  positioning: string;
  contact: {
    email: string;
    tradeEmail: string;
    phonePlaceholder: string;
    studioAddressPlaceholder: string;
    warehouseAddressPlaceholder: string;
    responseTimeline: string;
  };
  socialPlaceholders: {
    instagram: string;
    linkedin: string;
    pinterest: string;
    youtube: string;
  };
  announcement: string;
  disclaimerNote: string;
}

export const BRAND: BrandConfig = {
  name: "NOVA GRAIN",
  legalName: "NOVA GRAIN Finishes Ltd. (Draft Brand Identity)",
  tagline: "Bring Out the Soul of Wood.",
  subTagline: "Deep penetrating natural Tung Oil and advanced botanical wood-care solutions for master furniture makers, architects, and discerning craftsmen.",
  positioning: "Premium cold-pressed Tung Oil and wood-finishing formulations engineered to penetrate cellular wood grain, polymerize naturally with atmospheric oxygen, and deliver rich, durable, water-resistant timber protection without film peeling or synthetic plastic sheen.",
  contact: {
    email: "deepusahani08@gmail.com",
    tradeEmail: "deepusahani08@gmail.com",
    phonePlaceholder: "+91-9616495093",
    studioAddressPlaceholder: "Studio 14, Timberwright Quarter, Industrial Heritage District (Draft Placeholder)",
    warehouseAddressPlaceholder: "Logistics Hub 3B, Maritime Freight Way (Draft Placeholder)",
    responseTimeline: "Trade requests & batch technical inquiries typically answered within 1 business day.",
  },
  socialPlaceholders: {
    instagram: "#",
    linkedin: "#",
    pinterest: "#",
    youtube: "#",
  },
  announcement: "Sample testing batches & industrial procurement now open for workshop trials • All catalogue data currently reflects working draft specifications.",
  disclaimerNote: "NOTICE: NOVA GRAIN is a working conceptual brand created for business evaluation. Product formulations, specifications, and catalogue pricing represent development placeholders and will be formally verified upon commercial release.",
};

export interface ProductVariant {
  size: string;
  sku: string;
  coverageSqFt: string;
  coverageSqM: string;
  suggestedUse: string;
  priceEstimatePlaceholder?: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  eyebrow: string;
  description: string;
  longDescription: string;
  features: string[];
  specs: {
    purity: string;
    origin: string;
    extraction: string;
    sheen: string;
    recommendedCoats: string;
    recoatTime: string;
    fullCureTime: string;
    coveragePerLiter: string;
    vocContent: string;
    cleanup: string;
    storageLife: string;
  };
  image: string;
  gallery: string[];
  variants: ProductVariant[];
  badge?: string;
  isDraft: boolean;
  idealFor: string[];
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "nova-pure-tung-oil",
    slug: "pure-tung-oil",
    name: "Pure Tung Oil",
    subtitle: "100% Unadulterated Cold-Pressed Grade A Wood Oil",
    eyebrow: "NATURAL BOTANICAL FINISH",
    description: "Raw, zero-additive pressed seed oil from Vernicia fordii. Deep cellular penetration that polymerizes to a durable, water-resistant matte satin luster that never chips or flakes.",
    longDescription: "NOVA GRAIN Pure Tung Oil is the benchmark standard for traditional, non-film-forming timber finishes. Harvested from the pressed seeds of the Tung tree (Vernicia fordii), it contains pure unsaturated fatty acids—primarily alpha-eleostearic acid—that undergo atmospheric oxidative polymerization. Unlike petroleum-derived varnishes or polyurethane, Pure Tung Oil does not create a plastic surface layer. Instead, it cures deep within the wood fibers, accentuating natural chatoyancy, preserving tactile timber grain warmth, and expanding and contracting naturally with the wood.",
    features: [
      "100% pure cold-pressed seed oil with zero synthetic driers, petroleum distillates, or heavy metals",
      "Forms a water-resistant, flexible polymer inside the wood pores",
      "Natural amber warmth that intensifies wood grain contrast without artificial stain pigmentation",
      "Breathable, flexible barrier that will never crack, peel, blister, or yellow with age",
      "Traditional choice for cutting boards, heirloom dining tables, and fine woodturnings once fully cured",
    ],
    specs: {
      purity: "100% Pure Virgin Tung Oil (Uncut)",
      origin: "Selected cold-pressed seed harvest (To be confirmed)",
      extraction: "Mechanical expeller cold-press",
      sheen: "Matte to Low Satin (Builds sheen with subsequent burnished coats)",
      recommendedCoats: "3 to 5 coats depending on timber porosity",
      recoatTime: "24 – 48 hours under well-ventilated ambient conditions (20°C / 68°F)",
      fullCureTime: "21 to 30 days for complete cross-linking polymerization",
      coveragePerLiter: "12 – 16 m² (130 – 175 sq ft) per coat (higher on dense hardwoods)",
      vocContent: "0 g/L (Zero VOC in natural state)",
      cleanup: "Citrus solvent, mineral spirits, or pure plant terpene",
      storageLife: "Up to 36 months in an airtight container with minimal oxygen exposure",
    },
    image: "/images/product-pure-tung.jpg",
    gallery: [
      "/images/product-pure-tung.jpg",
      "/images/hero-walnut.jpg",
      "/images/tung-seeds.jpg",
    ],
    badge: "Most Popular",
    isDraft: true,
    idealFor: [
      "Heirloom dining tables and solid timber desks",
      "Artisan wooden cutting boards & butcher blocks (after full 30-day cure)",
      "Fine architectural cabinetry & millwork",
      "Handmade acoustic instruments & turned woodcraft",
    ],
    variants: [
      { size: "250 ml", sku: "NG-PTO-250", coverageSqFt: "35 – 45 sq ft", coverageSqM: "3.2 – 4.2 m²", suggestedUse: "Sample testing, small turnings, carved spoons", priceEstimatePlaceholder: "Draft: $18.00" },
      { size: "500 ml", sku: "NG-PTO-500", coverageSqFt: "70 – 90 sq ft", coverageSqM: "6.5 – 8.3 m²", suggestedUse: "Coffee tables, end tables, kitchen island blocks", priceEstimatePlaceholder: "Draft: $28.00" },
      { size: "1 Litre", sku: "NG-PTO-1000", coverageSqFt: "140 – 180 sq ft", coverageSqM: "13 – 17 m²", suggestedUse: "Full dining tables (up to 8 seats), multiple furniture pieces", priceEstimatePlaceholder: "Draft: $46.00" },
      { size: "5 Litres", sku: "NG-PTO-5000", coverageSqFt: "700 – 900 sq ft", coverageSqM: "65 – 83 m²", suggestedUse: "Full architectural interior wood cladding or joinery shop", priceEstimatePlaceholder: "Draft: $190.00" },
    ],
  },
  {
    id: "nova-pro-finishing-oil",
    slug: "professional-wood-finishing-oil",
    name: "Professional Finishing Oil",
    subtitle: "High-Penetration Architectural Blend with Natural Citrus Solvents",
    eyebrow: "ARCHITECTURAL WORKSHOP FORMULA",
    description: "Formulated specifically for professional workshops requiring accelerated penetration, easier wipe-off, and reduced surface tackiness on dense hardwoods like Teak, Walnut, and White Oak.",
    longDescription: "NOVA GRAIN Professional Wood Finishing Oil combines pure cold-pressed Tung Oil with natural citrus bio-solvents (d-limonene) in a pre-calibrated ratio. This reduces viscosity by over 60%, allowing the formula to deeply penetrate dense, tight-grained hardwoods without laborious hand-dilution. The natural citrus carrier evaporates cleanly, leaving the pure tung oil matrix deep inside the vascular channels to polymerize into a protective satin shield.",
    features: [
      "Pre-thinned with natural food-grade citrus solvent for rapid timber pore absorption",
      "Eliminates guesswork in workshop dilution and ensures uniform batch consistency",
      "Superior penetration on refractory timbers including Walnut, Teak, Iroko, and Hard Maple",
      "Pleasant natural orange peel aroma during application; zero harsh petroleum odor",
      "Shorter tack-free window reduces airborne dust adhesion during drying phase",
    ],
    specs: {
      purity: "Pure Tung Oil matrix blended with 100% natural Citrus Solvent",
      origin: "Engineered workshop batch blend (To be confirmed)",
      extraction: "Cold-press oil combined with cold-distilled citrus terpene",
      sheen: "Silky tactile matte finish",
      recommendedCoats: "2 to 4 coats depending on wood density",
      recoatTime: "12 – 24 hours under active ventilation",
      fullCureTime: "14 to 21 days for full hardness",
      coveragePerLiter: "14 – 18 m² (150 – 195 sq ft) per coat",
      vocContent: "Naturally derived citrus volatile fraction (Low Petroleum VOC)",
      cleanup: "Citrus solvent or warm soapy water immediately after application",
      storageLife: "24 months in a tightly capped metal container",
    },
    image: "/images/product-pro-oil.jpg",
    gallery: [
      "/images/product-pro-oil.jpg",
      "/images/app-cabinets.jpg",
      "/images/craftsman-applying.jpg",
    ],
    badge: "Craftsman Choice",
    isDraft: true,
    idealFor: [
      "Custom cabinetry and fluted architectural timber walls",
      "Commercial hospitality table surfaces and bar tops",
      "Interior timber stairs, handrails, and balustrades",
      "High-throughput joinery and restoration studios",
    ],
    variants: [
      { size: "500 ml", sku: "NG-PFO-500", coverageSqFt: "75 – 95 sq ft", coverageSqM: "7.0 – 8.8 m²", suggestedUse: "Accent tables, mantels, chair sets", priceEstimatePlaceholder: "Draft: $32.00" },
      { size: "1 Litre", sku: "NG-PFO-1000", coverageSqFt: "150 – 195 sq ft", coverageSqM: "14 – 18 m²", suggestedUse: "Architectural casework, executive desks", priceEstimatePlaceholder: "Draft: $54.00" },
      { size: "5 Litres", sku: "NG-PFO-5000", coverageSqFt: "750 – 975 sq ft", coverageSqM: "70 – 90 m²", suggestedUse: "Commercial interior fit-outs, joinery fabrication", priceEstimatePlaceholder: "Draft: $225.00" },
    ],
  },
  {
    id: "nova-bulk-industrial-tung-oil",
    slug: "bulk-tung-oil-industrial",
    name: "Bulk Industrial Tung Oil",
    subtitle: "High-Volume Virgin & Pre-Polymerized Oil for Manufacturing",
    eyebrow: "COMMERCIAL SUPPLY & CONTRACT",
    description: "Standardized batch volumes for furniture factories, flooring manufacturers, architectural millwork suppliers, and specialty coating compounders with verified lot testing.",
    longDescription: "NOVA GRAIN Bulk Tung Oil is supplied in calibrated containers ranging from 5-liter workshop tins to 200-liter drums and 1,000-liter IBC containers. Each production lot is monitored for acid value, specific gravity, and refractive index to guarantee consistent cure velocity across large manufacturing runs. Available in raw cold-pressed formulation and thermal-bodied pre-polymerized options for high-efficiency production lines.",
    features: [
      "Batch-to-batch consistency with Certificate of Analysis (CoA) per delivery",
      "Available in Virgin Cold-Pressed and Thermal-Bodied (pre-polymerized) grades",
      "Custom pallet, drum (200L), and IBC tote (1,000L) logistics support",
      "Dedicated technical support for automated wiping, spray-rag, or dip finishing setups",
      "Tiered contract pricing and scheduled quarterly dispatch agreements",
    ],
    specs: {
      purity: "Industrial Grade A Raw / Bodied Tung Oil",
      origin: "Controlled agricultural source batches (To be confirmed)",
      extraction: "Industrial continuous expeller press with sediment filtration",
      sheen: "Matte to High Satin depending on burnish procedure",
      recommendedCoats: "2 to 4 automated/hand passes",
      recoatTime: "24 hours ambient / Accelerated IR heat drying compatible",
      fullCureTime: "14 – 28 days depending on curing chamber airflow",
      coveragePerLiter: "12 – 16 m² per liter per application",
      vocContent: "0 g/L (Raw unblended)",
      cleanup: "Industrial solvent or bio-based solvent rinse",
      storageLife: "18 months stored at 10°C – 25°C in sealed steel drums",
    },
    image: "/images/product-bulk-oil.jpg",
    gallery: [
      "/images/product-bulk-oil.jpg",
      "/images/app-decking.jpg",
      "/images/app-restoration.jpg",
    ],
    badge: "B2B Only",
    isDraft: true,
    idealFor: [
      "Industrial solid wood flooring and engineered plank lines",
      "Volume furniture manufacturing plants",
      "Architectural exterior siding & cladding contractors",
      "Natural paint and timber sealant formulators",
    ],
    variants: [
      { size: "5 Litres (Tin)", sku: "NG-BLK-5L", coverageSqFt: "700 – 900 sq ft", coverageSqM: "65 – 83 m²", suggestedUse: "Boutique production runs, architectural mockups", priceEstimatePlaceholder: "Quote Required" },
      { size: "20 Litres (Pail)", sku: "NG-BLK-20L", coverageSqFt: "2,800 – 3,600 sq ft", coverageSqM: "260 – 330 m²", suggestedUse: "Contract woodworking projects, flooring batches", priceEstimatePlaceholder: "Quote Required" },
      { size: "200 Litres (Drum)", sku: "NG-BLK-200L", coverageSqFt: "28,000 – 36,000 sq ft", coverageSqM: "2,600 – 3,300 m²", suggestedUse: "Full-scale industrial factory integration", priceEstimatePlaceholder: "Quote Required" },
    ],
  },
];

export interface ApplicationItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  recommendedProduct: string;
  recommendedCoats: string;
  suitabilityNote: string;
  linkText: string;
  slug: string;
}

export const APPLICATIONS: ApplicationItem[] = [
  {
    id: "solid-furniture",
    title: "Solid Wood Furniture & Tables",
    subtitle: "Living dining surfaces, executive desks, and heirloom cabinetry",
    description: "Tung oil cures inside wood cells to create a warm, tactile finish that deepens natural walnut, oak, and cherry grain while protecting against beverage spills and daily wear without plastic film reflection.",
    image: "/images/hero-walnut.jpg",
    recommendedProduct: "Pure Tung Oil or Professional Finishing Oil",
    recommendedCoats: "3 to 4 coats, light wet-sanding on coat 2",
    suitabilityNote: "Ideal for all solid hardwoods. Allow full 21-day polymerization before exposing to heavy liquid standing or hot dinnerware.",
    linkText: "View Furniture Guidance",
    slug: "furniture-and-tables",
  },
  {
    id: "cabinetry-panels",
    title: "Architectural Millwork & Cabinetry",
    subtitle: "Fluted timber walls, custom built-ins, and bespoke doors",
    description: "Produces a subtle editorial matte finish that complements contemporary architecture, stone surfaces, and natural daylight without harsh glare or artificial high-gloss shine.",
    image: "/images/app-cabinets.jpg",
    recommendedProduct: "Professional Wood Finishing Oil",
    recommendedCoats: "2 to 3 thin coats",
    suitabilityNote: "Ensures consistent grain absorption across large wall surface areas without lap marks or streak variations.",
    linkText: "View Architectural Guidance",
    slug: "architectural-millwork",
  },
  {
    id: "woodcraft-turning",
    title: "Artisan Woodturning & Objects",
    subtitle: "Hand-turned bowls, sculpted vessels, and decorative craft",
    description: "Highlights figure, curl, and burl characteristics with radiant natural chatoyancy. Buffs to a velvety silky luster that invites touch and ages gracefully.",
    image: "/images/app-woodcraft.jpg",
    recommendedProduct: "Pure Tung Oil",
    recommendedCoats: "4 to 6 thin burnished coats",
    suitabilityNote: "Safe for dry decorative objects. For direct salad or food bowl use, verify complete 30-day cure before food contact.",
    linkText: "View Craft Guidance",
    slug: "woodcraft-and-turning",
  },
  {
    id: "exterior-timber",
    title: "Selected Exterior Timber & Decking",
    subtitle: "Teak patio furniture, architectural facades, and pavilion woodwork",
    description: "Natural water-shedding properties allow outdoor timber to breathe without peeling, trapping moisture, or blistering as synthetic exterior varnishes frequently do under intense sun.",
    image: "/images/app-decking.jpg",
    recommendedProduct: "Pure Tung Oil or Exterior Formulations",
    recommendedCoats: "4 coats minimum with annual refresher coat",
    suitabilityNote: "Outdoor durability depends on timber species (e.g. Teak, Ipe, Cedar), UV exposure, climate humidity, and seasonal maintenance coats.",
    linkText: "View Exterior Guidance",
    slug: "exterior-wood-applications",
  },
  {
    id: "restoration",
    title: "Antique Conservation & Restoration",
    subtitle: "Preserving historical patina on vintage and period woodwork",
    description: "Rehydrates dried timber fibers and restores depth without removing or damaging the historical patina of centuries-old woodworking.",
    image: "/images/app-restoration.jpg",
    recommendedProduct: "Pure Tung Oil (Cut 50/50 for initial pass)",
    recommendedCoats: "2 to 3 very thin applications",
    suitabilityNote: "Always test on an inconspicuous reverse corner. Unadulterated tung oil will not dissolve underlying hide glue or historical shellac.",
    linkText: "View Restoration Guidance",
    slug: "restoration-and-antiques",
  },
];

export interface TechSpecRow {
  parameter: string;
  pureTungOil: string;
  proFinishingOil: string;
  industrialBulk: string;
  status: "Confirmed" | "To be confirmed";
}

export const TECHNICAL_SPECIFICATIONS: TechSpecRow[] = [
  {
    parameter: "Botanical Source",
    pureTungOil: "100% Vernicia fordii (Tung seed)",
    proFinishingOil: "Vernicia fordii + Citrus terpene",
    industrialBulk: "Vernicia fordii (Selected lot)",
    status: "Confirmed",
  },
  {
    parameter: "Solvent / Thinner Content",
    pureTungOil: "0% (Zero solvent, uncut)",
    proFinishingOil: "~50% Natural Citrus Solvent",
    industrialBulk: "0% (Pure) or Custom blended",
    status: "Confirmed",
  },
  {
    parameter: "Appearance / Color",
    pureTungOil: "Clear, warm golden amber liquid",
    proFinishingOil: "Translucent amber with citrus clarity",
    industrialBulk: "Golden amber, filtered",
    status: "Confirmed",
  },
  {
    parameter: "Specific Gravity @ 25°C",
    pureTungOil: "0.936 – 0.940 (Typical)",
    proFinishingOil: "0.875 – 0.895 (Typical)",
    industrialBulk: "0.935 – 0.942 (Batch tested)",
    status: "To be confirmed",
  },
  {
    parameter: "Refractive Index @ 25°C",
    pureTungOil: "1.516 – 1.520 (High purity index)",
    proFinishingOil: "1.490 – 1.505",
    industrialBulk: "1.515 – 1.521 (CoA per lot)",
    status: "To be confirmed",
  },
  {
    parameter: "Acid Value (mg KOH/g)",
    pureTungOil: "≤ 3.5 (Cold pressed)",
    proFinishingOil: "≤ 3.0",
    industrialBulk: "≤ 4.0 (ASTM D1639)",
    status: "To be confirmed",
  },
  {
    parameter: "Iodine Value (Wijs)",
    pureTungOil: "160 – 175 g I₂/100g",
    proFinishingOil: "Variable based on bio-solvent",
    industrialBulk: "162 – 175 (ASTM D1959)",
    status: "To be confirmed",
  },
  {
    parameter: "Volatile Organic Compounds (VOC)",
    pureTungOil: "0 g/L (Zero VOC)",
    proFinishingOil: "Naturally derived volatile fraction",
    industrialBulk: "0 g/L (Raw unblended)",
    status: "Confirmed",
  },
  {
    parameter: "Touch Dry / Tack-Free Time",
    pureTungOil: "24 – 48 Hours @ 20°C (68°F)",
    proFinishingOil: "12 – 24 Hours @ 20°C (68°F)",
    industrialBulk: "24 – 48 Hours ambient / IR speedable",
    status: "Confirmed",
  },
  {
    parameter: "Full Polymerization Cure",
    pureTungOil: "21 – 30 Days (Ambient oxygen)",
    proFinishingOil: "14 – 21 Days",
    industrialBulk: "14 – 28 Days (Ventilated)",
    status: "Confirmed",
  },
  {
    parameter: "Oily Rag Spontaneous Combustion Risk",
    pureTungOil: "HIGH — Exothermic oxidation. Submerge in water.",
    proFinishingOil: "HIGH — Exothermic oxidation. Submerge in water.",
    industrialBulk: "HIGH — Requires dedicated sealed disposal tins.",
    status: "Confirmed",
  },
  {
    parameter: "Available Packaging Sizes",
    pureTungOil: "250ml, 500ml, 1L, 5L",
    proFinishingOil: "500ml, 1L, 5L",
    industrialBulk: "5L, 20L Pail, 200L Drum, 1,000L IBC",
    status: "Confirmed",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
  category: "General" | "Application" | "Curing & Safety" | "B2B & Bulk";
}

export const FAQS: FaqItem[] = [
  {
    category: "General",
    question: "What exactly is Pure Tung Oil, and where does it come from?",
    answer: "Pure Tung Oil is a natural drying oil pressed from the seed kernels of the Tung tree (Vernicia fordii / Aleurites fordii), native to southern and central Asia. Used for centuries in traditional boatbuilding and fine woodworking, it is valued because its high concentration of alpha-eleostearic acid causes it to polymerize (cross-link into a solid matrix) when exposed to oxygen, rather than simply evaporating or remaining wet.",
  },
  {
    category: "General",
    question: "Is Pure Tung Oil the same as products labelled 'Tung Oil Finish'?",
    answer: "No, and this is one of the most common confusions in woodcare. Commercial 'Tung Oil Finishes' frequently contain only a minute fraction of tung oil (or none at all), consisting predominantly of mineral spirits, chemical driers, and synthetic alkyd resins or polyurethane. NOVA GRAIN Pure Tung Oil is 100% unadulterated cold-pressed seed oil with zero synthetic driers or petroleum thinners.",
  },
  {
    category: "General",
    question: "How does Tung Oil enhance the wood grain without looking plastic?",
    answer: "Unlike polyurethane which forms a plastic sheet across the top of the wood, Tung Oil absorbs into the cellular vascular channels of the timber. As it cures within the grain rather than on top, it accentuates the natural figure, fiddleback, and medullary rays (chatoyancy) while preserving the natural tactile feel of the wood grain under hand.",
  },
  {
    category: "Application",
    question: "Which wood species are most suitable for Tung Oil?",
    answer: "Tung Oil performs exceptionally well on both hardwoods and softwoods, including American Black Walnut, White Oak, Teak, Cherry, Ash, Maple, Cedar, and Douglas Fir. Dense, oily timbers like Teak and Rosewood benefit from thinning the first coat with a natural citrus solvent for deeper pore penetration.",
  },
  {
    category: "Application",
    question: "How many coats are typically needed for furniture?",
    answer: "We recommend a minimum of 3 coats for interior furniture, with 4 to 5 coats for dining tables, kitchen countertops, or items subject to frequent liquid contact. The first coat should penetrate deeply, and each subsequent coat should be applied very thinly and thoroughly wiped off after 30 to 45 minutes.",
  },
  {
    category: "Application",
    question: "Why is wiping away the excess oil so critical?",
    answer: "Pure Tung Oil must cure *inside* the wood pores, not as a thick pool on the surface. If excess oil is left pooling on the wood, it will skin over prematurely and dry into a sticky, wrinkled, or frosted white film. Always buff the surface completely dry with clean cotton rags 30–45 minutes after application.",
  },
  {
    category: "Curing & Safety",
    question: "What is the difference between drying and full curing?",
    answer: "Tung oil dries to the touch in 24 to 48 hours, meaning it is safe to handle and apply subsequent coats. However, full curing is a chemical polymerization process where the fatty acid chains cross-link with atmospheric oxygen. Complete polymerization requires 21 to 30 days under moderate humidity and airflow. During this time, the finish should not be subjected to heavy standing liquids or hot cookware.",
  },
  {
    category: "Curing & Safety",
    question: "CRITICAL SAFETY: Why do oily rags pose a spontaneous combustion hazard?",
    answer: "As Tung Oil cures, it undergoes an exothermic oxidation reaction, releasing heat. If rags soaked in tung oil are crumpled in a heap or disposed in a closed dry container, heat cannot dissipate, temperatures can rise, and the rags can spontaneously combust. ALWAYS submerge used application rags in a water-filled metal bucket or lay them completely flat outdoors to dry out fully before disposal.",
  },
  {
    category: "B2B & Bulk",
    question: "Are bulk quantities and contract supply agreements available for manufacturers?",
    answer: "Yes. NOVA GRAIN provides 5L tins, 20L pails, 200L drums, and 1,000L IBC totes for furniture factories, flooring producers, and millwork contractors. Each commercial batch includes verified lot testing and consistency certifications. Custom pre-blended viscosities are available on scheduled agreements.",
  },
  {
    category: "B2B & Bulk",
    question: "Can I request sample testing kits and Technical Data Sheets (TDS)?",
    answer: "Yes. Commercial workshops and architectural studios can request technical sample kits and draft data sheets via our B2B procurement portal or by contacting deepusahani08@gmail.com. Sample batches are provided for pore penetration and cure velocity benchmarking.",
  },
];

export interface ResourceArticle {
  slug: string;
  title: string;
  subtitle: string;
  readTime: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  authorRole: string;
}

export const ARTICLES: ResourceArticle[] = [
  {
    slug: "what-is-tung-oil-botanical-guide",
    title: "What Is Pure Tung Oil? The Botanical Science of Living Wood Finishes",
    subtitle: "Understanding atmospheric oxidative polymerization and why genuine seed oil outlasts synthetic varnishes.",
    readTime: "7 min read",
    category: "Material Science",
    date: "October 2026",
    excerpt: "Explore the molecular mechanics of alpha-eleostearic acid in Vernicia fordii seeds and how natural curing differs from plastic film-forming finishes.",
    image: "/images/tung-seeds.jpg",
    author: "Elena Rostova",
    authorRole: "Wood Finishing Specialist & Conservator",
  },
  {
    slug: "tung-oil-vs-danish-linseed-polyurethane",
    title: "Tung Oil vs. Danish Oil, Linseed, and Polyurethane: An Objective Comparison",
    subtitle: "A side-by-side guide to water resistance, maintenance, yellowing tendencies, and tactile hand feel.",
    readTime: "9 min read",
    category: "Finish Selection",
    date: "October 2026",
    excerpt: "Break down the functional differences between raw plant oils, boiled oils with metallic driers, and synthetic polyurethane coatings.",
    image: "/images/hero-walnut.jpg",
    author: "Marcus Lindqvist",
    authorRole: "Architectural Millwork Consultant",
  },
  {
    slug: "masterclass-how-to-apply-tung-oil",
    title: "The Masterclass: Step-by-Step Tung Oil Application on Fine Hardwoods",
    subtitle: "From prep sanding grits to the critical 45-minute wipe-off rule and burnishing between coats.",
    readTime: "11 min read",
    category: "Workshop Guide",
    date: "October 2026",
    excerpt: "Follow our master craftsperson protocol for flawless penetration, zero surface stickiness, and a deep, chatoyant satin sheen.",
    image: "/images/craftsman-applying.jpg",
    author: "Julian Chen",
    authorRole: "Master Furniture Maker",
  },
  {
    slug: "drying-vs-curing-wood-oil-science",
    title: "Understanding Drying vs. Curing: The 30-Day Polymerization Clock",
    subtitle: "Why surface tackiness disappears in 24 hours but true water resistance requires patience.",
    readTime: "6 min read",
    category: "Craft Science",
    date: "September 2026",
    excerpt: "Demystify cross-linking chemistry, ambient airflow factors, and how to care for newly oiled furniture during the critical first month.",
    image: "/images/wood-split.jpg",
    author: "Elena Rostova",
    authorRole: "Wood Finishing Specialist & Conservator",
  },
  {
    slug: "spontaneous-combustion-rag-safety",
    title: "Crucial Workshop Safety: Managing Oily Rags and Preventing Spontaneous Combustion",
    subtitle: "The thermodynamics of exothermic drying oil oxidation and non-negotiable disposal protocols.",
    readTime: "5 min read",
    category: "Safety & Care",
    date: "September 2026",
    excerpt: "A life-saving technical explanation of why drying oils generate internal heat and the simple water-immersion procedure every woodworker must follow.",
    image: "/images/app-restoration.jpg",
    author: "Safety & Standards Team",
    authorRole: "NOVA GRAIN Technical Desk",
  },
];
