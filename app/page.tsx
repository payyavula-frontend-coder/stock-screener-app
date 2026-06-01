"use client";

import { useEffect, useMemo, useState } from "react";
import { useStockStore } from "../store/stockStore";
import StockTable from "../components/screener/StockTable";
import FilterPanel from "../components/screener/FilterPanel";
import StockChart from "../components/screener/StockChart";
import { useRealtimePrices } from "../hooks/useRealtimePrices";
import { filterStocks, type AdvancedFilters } from "../utils/filterEngine";
import RSIPanel from "../components/screener/RSIPanel";

export default function Home() {
  const stocks = useStockStore((state) => state.stocks);
  const selectedStock = useStockStore((state) => state.selectedStock);
  const setSelectedStock = useStockStore((state) => state.setSelectedStock);

  
  const [filters, setFilters] = useState<AdvancedFilters>({
    search: "",
    sector: "All",
    minPrice: "",
    maxPrice: "",
    minMarketCap: "",
    maxPERatio: "",
    minVolume: "",
    minRSI: "",
    maxRSI: "",
  });

  useRealtimePrices();

  const handleFilterChange = (key: keyof AdvancedFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredStocks = useMemo(() => {
    const start = performance.now();
    const result = filterStocks(stocks, filters);
    console.log(`Filter response time: ${(performance.now() - start).toFixed(2)}ms`);
    return result;
  }, [stocks, filters]);

  const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

if (!isMounted) {
  return (
    <main className="min-h-screen bg-slate-950 p-3 text-white md:p-6">
      Loading stock screener...
    </main>
  );
}

  return (
    // <main className="min-h-screen bg-slate-950 p-6 text-white">
    <main className="min-h-screen bg-slate-950 p-3 text-white md:p-6">
      <h1 className="mb-4 text-3xl font-bold">Real Time Stock Screener</h1>

      <p className="mb-4 text-slate-300">
        Showing {filteredStocks.length} of {stocks.length} stocks
      </p>

      <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

      <StockChart stock={selectedStock} />
      <RSIPanel rsi={selectedStock?.rsi ?? 50} />

      <StockTable stocks={filteredStocks} onSelectStock={setSelectedStock} />
    </main>
  );
}