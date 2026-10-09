import React from "react";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/brandConfig";
import { ProductDetailClient } from "./ProductDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return PRODUCTS.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} — ${product.subtitle}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | NOVA GRAIN`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
