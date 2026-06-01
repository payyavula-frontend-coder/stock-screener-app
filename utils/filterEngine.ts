import type { Sector, Stock } from "../types/stock";

export type AdvancedFilters = {
  search: string;
  sector: Sector | "All";
  minPrice: string;
  maxPrice: string;
  minMarketCap: string;
  maxPERatio: string;
  minVolume: string;
  minRSI: string;
  maxRSI: string;
};

const normalize = (value: string) => value.toLowerCase().replace(/\s/g, "");

const toNumberOrNull = (value: string) => {
  if (!value.trim()) return null;
  const numberValue = Number(value);
  return Number.isNaN(numberValue) ? null : numberValue;
};

export function filterStocks(
  stocks: Stock[],
  filters: AdvancedFilters
): Stock[] {
  const normalizedSearch = normalize(filters.search);

  const minPrice = toNumberOrNull(filters.minPrice);
  const maxPrice = toNumberOrNull(filters.maxPrice);
  const minMarketCap = toNumberOrNull(filters.minMarketCap);
  const maxPERatio = toNumberOrNull(filters.maxPERatio);
  const minVolume = toNumberOrNull(filters.minVolume);
  const minRSI = toNumberOrNull(filters.minRSI);
  const maxRSI = toNumberOrNull(filters.maxRSI);

  return stocks.filter((stock) => {
    if (
      normalizedSearch &&
      !normalize(stock.symbol).includes(normalizedSearch) &&
      !normalize(stock.companyName).includes(normalizedSearch)
    ) {
      return false;
    }

    if (filters.sector !== "All" && stock.sector !== filters.sector) {
      return false;
    }

    if (minPrice !== null && stock.price < minPrice) return false;
    if (maxPrice !== null && stock.price > maxPrice) return false;
    if (minMarketCap !== null && stock.marketCap < minMarketCap) return false;
    if (maxPERatio !== null && stock.peRatio > maxPERatio) return false;
    if (minVolume !== null && stock.volume < minVolume) return false;
    if (minRSI !== null && stock.rsi < minRSI) return false;
    if (maxRSI !== null && stock.rsi > maxRSI) return false;

    return true;
  });
}