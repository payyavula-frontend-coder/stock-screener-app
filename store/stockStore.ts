import { create } from "zustand";
import type { Stock } from "../types/stock";
import { generateStocks } from "../utils/generateStocks";

type StockStore = {
  stocks: Stock[];
  setStocks: (stocks: Stock[]) => void;
};

export const useStockStore = create<StockStore>((set) => ({
  stocks: generateStocks(5000),
  setStocks: (stocks) => set({ stocks }),
}));