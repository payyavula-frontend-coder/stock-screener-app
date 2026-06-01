import { create } from "zustand";
import type { Stock } from "../types/stock";
import { generateStocks } from "../utils/generateStocks";

type StockStore = {
  stocks: Stock[];
  selectedStock: Stock | null;
  setStocks: (stocks: Stock[]) => void;
  setSelectedStock: (stock: Stock) => void;
};

export const useStockStore = create<StockStore>((set) => {
  const initialStocks = generateStocks(5000);

  return {
    stocks: initialStocks,
    selectedStock: initialStocks[0],
    setStocks: (stocks) => set({ stocks }),
    setSelectedStock: (stock) => set({ selectedStock: stock }),
  };
});