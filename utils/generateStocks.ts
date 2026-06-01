import type { Stock, Sector } from "../types/stock";

const sectors: Sector[] = [
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

const round2 = (value: number) => Number(value.toFixed(2));

export const generateStocks = (count = 5000): Stock[] => {
  return Array.from({ length: count }, (_, index) => {
    const price = round2(Math.random() * 5000 + 50);

    return {
      id: `stock-${index + 1}`,
      symbol: `STK${index + 1}`,
      companyName: `Company ${index + 1}`,
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      price,
      change: round2(Math.random() * 20 - 10),
      changePercent: round2(Math.random() * 10 - 5),
      marketCap: Math.floor(Math.random() * 1_000_000_000_000),
      peRatio: round2(Math.random() * 50),
      volume: Math.floor(Math.random() * 10_000_000),
      high52Week: round2(price * 1.3),
      low52Week: round2(price * 0.7),
      rsi: round2(Math.random() * 100),
      sma50: round2(price * 0.98),
      ema20: round2(price * 1.02),
    };
  });
};