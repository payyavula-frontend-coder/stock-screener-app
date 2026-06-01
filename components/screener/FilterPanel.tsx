"use client";

import type { Sector } from "../../types/stock";
import type { AdvancedFilters } from "../../utils/filterEngine";

type Props = {
  filters: AdvancedFilters;
  onFilterChange: (key: keyof AdvancedFilters, value: string) => void;
};

const sectors: (Sector | "All")[] = [
  "All",
  "Technology",
  "Banking",
  "Finance",
  "Healthcare",
  "Energy",
  "FMCG",
  "Automobile",
  "Telecom",
  "Infrastructure",
  "Real Estate",
];

export default function FilterPanel({ filters, onFilterChange }: Props) {
  return (
    <div className="mb-4 grid gap-4 rounded-lg border border-slate-700 bg-slate-900 p-4 md:grid-cols-4">
      <input
        value={filters.search}
        onChange={(e) => onFilterChange("search", e.target.value)}
        placeholder="Search stock"
        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
      />

      <select
        value={filters.sector}
        onChange={(e) => onFilterChange("sector", e.target.value)}
        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
      >
        {sectors.map((sector) => (
          <option key={sector}>{sector}</option>
        ))}
      </select>

      <input
        value={filters.minPrice}
        onChange={(e) => onFilterChange("minPrice", e.target.value)}
        placeholder="Min Price"
        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
      />

      <input
        value={filters.maxPrice}
        onChange={(e) => onFilterChange("maxPrice", e.target.value)}
        placeholder="Max Price"
        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
      />

      <input
        value={filters.minMarketCap}
        onChange={(e) => onFilterChange("minMarketCap", e.target.value)}
        placeholder="Min Market Cap"
        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
      />

      <input
        value={filters.maxPERatio}
        onChange={(e) => onFilterChange("maxPERatio", e.target.value)}
        placeholder="Max P/E"
        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
      />

      <input
        value={filters.minVolume}
        onChange={(e) => onFilterChange("minVolume", e.target.value)}
        placeholder="Min Volume"
        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
      />

      <input
        value={filters.minRSI}
        onChange={(e) => onFilterChange("minRSI", e.target.value)}
        placeholder="Min RSI"
        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
      />

      <input
        value={filters.maxRSI}
        onChange={(e) => onFilterChange("maxRSI", e.target.value)}
        placeholder="Max RSI"
        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
      />
    </div>
  );
}