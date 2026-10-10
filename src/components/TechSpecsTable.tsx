"use client";

import React, { useState } from "react";
import { TECHNICAL_SPECIFICATIONS } from "@/data/brandConfig";
import { Download, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { QuoteRequestModal } from "./QuoteRequestModal";

export const TechSpecsTable: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "confirmed" | "tbc">("all");
  const [modalOpen, setModalOpen] = useState(false);

  const filteredSpecs = TECHNICAL_SPECIFICATIONS.filter((row) => {
    if (filter === "confirmed") return row.status === "Confirmed";
    if (filter === "tbc") return row.status === "To be confirmed";
    return true;
  });

  return (
    <div className="bg-ivory py-16 md:py-24 border-y border-stone" id="technical-specifications">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone">
          <div>
            <span className="text-xs uppercase tracking-widest text-copper font-semibold block mb-1">
              MATERIAL STANDARDS & AUDIT TRAIL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-dark font-normal">
              Technical Specifications & Chemical Matrix
            </h2>
            <p className="mt-2 text-base text-charcoal/80 max-w-2xl font-sans leading-relaxed">
              Transparent baseline data for professional specifiers. Measured physical values, drying thermodynamics, and safety documentation. Unverified values are transparently designated <em>To be confirmed</em> prior to independent laboratory batch verification.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest hover:bg-forest-light text-ivory text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Request Full Batch TDS / SDS</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="inline-flex items-center gap-1.5 p-1 bg-stone/60 rounded-md border border-stone-muted text-sm">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded transition-colors ${
                filter === "all" ? "bg-forest text-ivory font-medium" : "text-charcoal/80 hover:text-forest"
              }`}
            >
              All Parameters ({TECHNICAL_SPECIFICATIONS.length})
            </button>
            <button
              onClick={() => setFilter("confirmed")}
              className={`px-3 py-1.5 rounded transition-colors ${
                filter === "confirmed" ? "bg-forest text-ivory font-medium" : "text-charcoal/80 hover:text-forest"
              }`}
            >
              Confirmed Baselines
            </button>
            <button
              onClick={() => setFilter("tbc")}
              className={`px-3 py-1.5 rounded transition-colors ${
                filter === "tbc" ? "bg-forest text-ivory font-medium" : "text-charcoal/80 hover:text-forest"
              }`}
            >
              Pending Lab Batch (TBC)
            </button>
          </div>

          <div className="text-sm text-charcoal/70 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-forest" /> Confirmed
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-copper ml-2" /> Pending Lab Verification (TBC)
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-lg border border-stone shadow-sm bg-ivory-light">
          <table className="w-full text-left text-sm divide-y divide-stone">
            <thead className="bg-stone text-forest-dark uppercase tracking-wider font-semibold text-xs">
              <tr>
                <th scope="col" className="py-3.5 px-4 sm:px-5">Parameter / Test Method</th>
                <th scope="col" className="py-3.5 px-4 sm:px-5">Pure Tung Oil (100% Uncut)</th>
                <th scope="col" className="py-3.5 px-4 sm:px-5">Professional Finishing Oil</th>
                <th scope="col" className="py-3.5 px-4 sm:px-5">Bulk Industrial Grade</th>
                <th scope="col" className="py-3.5 px-4 sm:px-5 text-right">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone/60">
              {filteredSpecs.map((row, idx) => (
                <tr key={idx} className="hover:bg-ivory/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-5 font-semibold text-forest-dark whitespace-nowrap">
                    {row.parameter}
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-charcoal/85 leading-relaxed">
                    {row.pureTungOil}
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-charcoal/85 leading-relaxed">
                    {row.proFinishingOil}
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-charcoal/85 leading-relaxed">
                    {row.industrialBulk}
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap">
                    {row.status === "Confirmed" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-forest/10 text-forest border border-forest/20">
                        <CheckCircle className="w-3.5 h-3.5" /> Confirmed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-copper/10 text-copper border border-copper/30">
                        <Clock className="w-3.5 h-3.5" /> To be confirmed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Safety Note on Table Footer */}
        <div className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-600/20 text-xs sm:text-sm text-charcoal/90 flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-4 h-4 text-copper flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Chemical Handling Note:</strong> All Tung Oil products undergo exothermic oxidation during polymerization. Application cloths, rags, or steel wool containing drying oil must be soaked in water before disposal to avoid spontaneous combustion. Always review the Safety Data Sheet (SDS) prior to workshop deployment.
          </p>
        </div>
      </div>

      <QuoteRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultProduct="Technical Specification Sheet" />
    </div>
  );
};
