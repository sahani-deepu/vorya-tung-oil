"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Sparkles, SlidersHorizontal, Info } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage = "/images/wood-before.jpg",
  afterImage = "/images/wood-after.jpg",
  beforeLabel = "Raw Unfinished Walnut (220 Grit)",
  afterLabel = "Finished with 3 Coats Pure Tung Oil",
  title = "The Cellular Transformation",
  subtitle = "Drag the slider to observe how pure cold-pressed Tung Oil penetrates dry timber fibers to awaken deep chatoyancy, rich chocolate-caramel tones, and durable silky luster without plastic film build-up.",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section className="py-20 md:py-28 bg-ivory relative overflow-hidden" id="wood-transformation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone rounded-full text-xs font-medium tracking-widest text-walnut uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-copper" />
            <span>Interactive Material Study</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest-dark font-normal tracking-tight">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
            {subtitle}
          </p>
        </div>

        {/* Interactive Comparison Canvas */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] sm:aspect-[16/9] md:aspect-[21/10] rounded-xl overflow-hidden shadow-2xl border-2 border-stone select-none cursor-ew-resize group"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            role="slider"
            aria-label="Wood finishing before and after slider"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setSliderPosition((prev) => Math.max(0, prev - 5));
              if (e.key === "ArrowRight") setSliderPosition((prev) => Math.min(100, prev + 5));
            }}
          >
            {/* Background Image: After (Oiled) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={afterImage}
                alt="American Black Walnut finished with pure cold-pressed Tung oil"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute top-4 right-4 bg-forest-dark/85 backdrop-blur-md text-ivory text-xs px-3.5 py-1.5 rounded-full font-medium tracking-wider uppercase border border-copper/40 shadow-md">
                {afterLabel}
              </div>
            </div>

            {/* Foreground Image: Before (Raw), clipped by sliderPosition */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src={beforeImage}
                alt="Raw untreated sanded American Black Walnut timber board"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md text-ivory text-xs px-3.5 py-1.5 rounded-full font-medium tracking-wider uppercase border border-stone-muted/40 shadow-md">
                {beforeLabel}
              </div>
            </div>

            {/* Draggable Divider Handle Line */}
            <div
              className="absolute inset-y-0 w-1 bg-ivory shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center -translate-x-1/2"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-ivory border-2 border-copper text-forest-dark flex items-center justify-center shadow-xl transform active:scale-110 transition-transform cursor-grab active:cursor-grabbing">
                <SlidersHorizontal className="w-4 h-4 text-forest" />
              </div>
            </div>

            {/* Drag Hint on Bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-charcoal/70 backdrop-blur-sm text-ivory/90 text-[11px] uppercase tracking-widest px-3 py-1 rounded-full">
              Drag or use Left/Right keys
            </div>
          </div>

          {/* Responsible Craftsmanship Disclaimer */}
          <div className="mt-4 flex items-start gap-2.5 p-3.5 bg-stone/70 rounded-lg text-xs text-charcoal/80 border border-stone-muted/80 max-w-4xl mx-auto">
            <Info className="w-4 h-4 text-walnut flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Species Note:</strong> Shown above on American Black Walnut (<em>Juglans nigra</em>). Natural wood pore density, absorption velocity, and color intensification vary naturally across timber species (e.g. White Oak, Teak, Ash, Cherry, Pine). We recommend testing a discreet end grain or off-cut before full surface finishing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
