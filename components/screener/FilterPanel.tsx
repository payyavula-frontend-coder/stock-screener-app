"use client";

import type { Sector } from "../../types/stock";

type Props = {
  search: string;
  sector: Sector | "All";
  onSearchChange: (value: string) => void;
  onSectorChange: (value: Sector | "All") => void;
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

export default function FilterPanel({
  search,
  sector,
  onSearchChange,
  onSectorChange,
}: Props) {
  return (
    <div className="mb-4 grid gap-4 rounded-lg border border-slate-700 bg-slate-900 p-4 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Search Stock
        </label>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by symbol or company"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Sector
        </label>
        <select
          value={sector}
          onChange={(e) => onSectorChange(e.target.value as Sector | "All")}
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none"
        >
          {sectors.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}