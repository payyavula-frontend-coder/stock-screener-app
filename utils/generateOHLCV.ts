import type { OHLCV } from "../types/chart";

const round2 = (value: number) => Number(value.toFixed(2));

export const generateOHLCV = (
  startPrice: number,
  days = 120
): OHLCV[] => {
  const candles: OHLCV[] = [];
  let currentPrice = startPrice;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const open = currentPrice;
    const changePercent = Math.random() * 4 - 2;
    const close = open + open * (changePercent / 100);

    const high = Math.max(open, close) * (1 + Math.random() * 0.02);
    const low = Math.min(open, close) * (1 - Math.random() * 0.02);

    candles.push({
      time: date.toISOString().split("T")[0],
      open: round2(open),
      high: round2(high),
      low: round2(low),
      close: round2(close),
      volume: Math.floor(Math.random() * 10_000_000),
    });

    currentPrice = close;
  }

  return candles;
};