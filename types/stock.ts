export type Sector =
  | "Technology"
  | "Banking"
  | "Finance"
  | "Healthcare"
  | "Energy"
  | "FMCG"
  | "Automobile"
  | "Telecom"
  | "Infrastructure"
  | "Real Estate";

export type Stock = {
  id: string;
  symbol: string;
  companyName: string;
  sector: Sector;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  peRatio: number;
  volume: number;
  high52Week: number;
  low52Week: number;
  rsi: number;
  sma50: number;
  ema20: number;
};