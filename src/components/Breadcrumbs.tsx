import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4 text-sm text-charcoal/70">
      <ol className="flex items-center space-x-2 flex-wrap">
        <li>
          <Link href="/" className="hover:text-forest flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 text-stone-muted flex-shrink-0" />
            {item.href ? (
              <Link href={item.href} className="hover:text-forest transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-forest-dark font-medium truncate max-w-xs" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
