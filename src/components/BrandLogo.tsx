import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  variant?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "dark",
  showTagline = true,
  className = "",
  size = "md",
}) => {
  const isLight = variant === "light";

  const scaleClasses = {
    sm: "scale-90",
    md: "scale-100",
    lg: "scale-110 md:scale-125",
  }[size];

  return (
    <Link
      href="/"
      aria-label="NOVA GRAIN - Pure Tung Oil & Wood Finishes Home"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-copper ${scaleClasses} ${className}`}
    >
      {/* Wood grain concentric growth-rings brand emblem */}
      <div className="relative w-9 h-9 flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:rotate-12">
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Outer ring with wood grain organic curve */}
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke={isLight ? "#E8E3D9" : "#173A32"}
            strokeWidth="1.5"
            strokeDasharray="4 2"
            className="opacity-60"
          />
          {/* Middle growth ring */}
          <path
            d="M8 22C8 14.268 14.268 8 22 8C29.732 8 36 14.268 36 22C36 29.732 29.732 36 22 36C17.5 36 12 33 10 28"
            stroke={isLight ? "#B77B51" : "#B77B51"}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Inner heartwood pith ring */}
          <circle
            cx="22"
            cy="22"
            r="7"
            stroke={isLight ? "#F7F4EC" : "#76513C"}
            strokeWidth="1.5"
          />
          {/* Central seed pip dot */}
          <circle
            cx="22"
            cy="22"
            r="2.5"
            fill={isLight ? "#B77B51" : "#173A32"}
          />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-serif tracking-[0.16em] uppercase font-semibold text-lg md:text-xl transition-colors ${
              isLight ? "text-ivory group-hover:text-amber-200" : "text-forest-dark group-hover:text-forest"
            }`}
          >
            NOVA
          </span>
          <span
            className={`font-serif tracking-[0.24em] uppercase font-light text-lg md:text-xl transition-colors ${
              isLight ? "text-copper-light" : "text-walnut"
            }`}
          >
            GRAIN
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[9px] tracking-[0.26em] uppercase font-sans font-medium mt-0.5 transition-colors ${
              isLight ? "text-stone-muted" : "text-charcoal/70"
            }`}
          >
            PURE TUNG OIL ATELIER
          </span>
        )}
      </div>
    </Link>
  );
};
