"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  createChart,
  CandlestickSeries,
  LineSeries,
  type Time,
} from "lightweight-charts";
import type { Stock } from "../../types/stock";
import { generateOHLCV } from "../../utils/generateOHLCV";

type Props = {
  stock: Stock | null;
};

export default function StockChart({ stock }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const candles = useMemo(() => {
    if (!stock) return [];
    return generateOHLCV(stock.price, 120);
  }, [stock]);

  useEffect(() => {
    if (!chartContainerRef.current || !stock) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 420,
      layout: {
        background: { color: "#0f172a" },
        textColor: "#ffffff",
      },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries);

    candleSeries.setData(
      candles.map((candle) => ({
        time: candle.time as Time,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
      }))
    );

    const smaSeries = chart.addSeries(LineSeries, {
      color: "#38bdf8",
      lineWidth: 2,
    });

    const smaData = candles.map((candle, index) => {
      const slice = candles.slice(Math.max(0, index - 9), index + 1);
      const avg =
        slice.reduce((sum, item) => sum + item.close, 0) / slice.length;

      return {
        time: candle.time as Time,
        value: Number(avg.toFixed(2)),
      };
    });

    smaSeries.setData(smaData);

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [stock, candles]);

  if (!stock) return null;

  return (
    <section className="mb-6 rounded-lg border border-slate-700 bg-slate-900 p-4">
      <div className="mb-3">
        <h2 className="text-xl font-bold">
          {stock.symbol} - {stock.companyName}
        </h2>
        <p className="text-sm text-slate-400">
          Candlestick Chart with SMA Overlay
        </p>
      </div>

      <div ref={chartContainerRef} className="w-full" />
    </section>
  );
}