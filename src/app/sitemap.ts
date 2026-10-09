import { MetadataRoute } from "next";
import { PRODUCTS, ARTICLES } from "@/data/brandConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://novagrain.example.com";

  const staticRoutes = [
    "",
    "/shop",
    "/applications",
    "/how-to-apply",
    "/about",
    "/specifications",
    "/resources",
    "/contact",
    "/bulk-enquiry",
    "/faq",
    "/cart",
    "/privacy",
    "/terms",
    "/shipping-returns",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = PRODUCTS.map((prod) => ({
    url: `${baseUrl}/shop/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const articleRoutes = ARTICLES.map((art) => ({
    url: `${baseUrl}/resources/${art.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
