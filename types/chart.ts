export type Timeframe = "1D" | "1W" | "1M" | "3M" | "1Y";

export type OHLCV = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type IndicatorPoint = {
  time: string;
  value: number;
};