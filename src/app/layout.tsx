import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { BRAND } from "@/data/brandConfig";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#173A32",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "NOVA GRAIN | Premium Pure Tung Oil & Architectural Wood Finishes",
    template: "%s | NOVA GRAIN",
  },
  description:
    "Pure cold-pressed Tung Oil and advanced botanical wood finishes. Cellular grain penetration, non-film forming durable protection, and radiant chatoyancy for master woodworkers, furniture makers, and architects.",
  keywords: [
    "Pure Tung Oil",
    "Cold Pressed Tung Oil",
    "Natural Wood Finishes",
    "Architectural Timber Care",
    "Food Safe Wood Finish",
    "Walnut Finishing Oil",
    "Furniture Finishing",
    "Woodworking Oil",
    "NOVA GRAIN",
  ],
  authors: [{ name: "NOVA GRAIN Finishes Ltd." }],
  creator: "NOVA GRAIN",
  metadataBase: new URL("https://novagrain.example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://novagrain.example.com",
    siteName: "NOVA GRAIN",
    title: "NOVA GRAIN | Bring Out the Soul of Wood",
    description:
      "Crafted for woodworkers, architects, and makers who honor the living grain. Pure unadulterated cold-pressed Tung Oil.",
    images: [
      {
        url: "/images/hero-walnut.jpg",
        width: 1920,
        height: 1080,
        alt: "NOVA GRAIN Pure Tung Oil on American Black Walnut Tabletop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA GRAIN | Pure Tung Oil & Architectural Wood Finishes",
    description: "Deep cellular wood grain penetration without film peeling.",
    images: ["/images/hero-walnut.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BRAND.name,
    "legalName": BRAND.legalName,
    "url": "https://novagrain.example.com",
    "logo": "https://novagrain.example.com/favicon.svg",
    "slogan": BRAND.tagline,
    "description": BRAND.positioning,
    "email": BRAND.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BRAND.contact.studioAddressPlaceholder,
      "addressCountry": "US",
    },
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-ivory text-charcoal selection:bg-copper/20 selection:text-forest-dark antialiased">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1 w-full" id="main-content">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
