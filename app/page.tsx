"use client";

import { useMemo, useState } from "react";
import { useStockStore } from "../store/stockStore";
import StockTable from "../components/screener/StockTable";
import FilterPanel from "../components/screener/FilterPanel";
import type { Sector } from "../types/stock";
import { useRealtimePrices } from "../hooks/useRealtimePrices";
import StockChart from "../components/screener/StockChart";

export default function Home() {
  const stocks = useStockStore((state) => state.stocks);
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState<Sector | "All">("All");
  useRealtimePrices();
  const selectedStock = useStockStore((state) => state.selectedStock);
const setSelectedStock = useStockStore((state) => state.setSelectedStock);

  const filteredStocks = useMemo(() => {
    const start = performance.now();

    const normalizedSearch = search.toLowerCase().replace(/\s/g, "");

    const result = stocks.filter((stock) => {
      const matchesSearch =
        stock.symbol.toLowerCase().replace(/\s/g, "").includes(normalizedSearch) ||
        stock.companyName.toLowerCase().replace(/\s/g, "").includes(normalizedSearch);

      const matchesSector = sector === "All" || stock.sector === sector;

      return matchesSearch && matchesSector;
    });

    console.log(`Filter response time: ${(performance.now() - start).toFixed(2)}ms`);

    return result;
  }, [stocks, search, sector]);

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <h1 className="mb-4 text-3xl font-bold">Real Time Stock Screener</h1>

      <p className="mb-4 text-slate-300">
        Showing {filteredStocks.length} of {stocks.length} stocks
      </p>

      <FilterPanel
        search={search}
        sector={sector}
        onSearchChange={setSearch}
        onSectorChange={setSector}
      />
       <div className="mb-6">
      <StockChart stock={selectedStock} />
    </div>

      <StockTable stocks={filteredStocks} onSelectStock={setSelectedStock} />
    </main>
  );
}