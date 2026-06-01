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
import {
  calculateSMA,
  calculateEMA,
  calculateBollingerBands,
} from "../../utils/indicators";

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

    smaSeries.setData(
      calculateSMA(candles, 10).map((point) => ({
        time: point.time as Time,
        value: point.value,
      }))
    );

    const emaSeries = chart.addSeries(LineSeries, {
      color: "#f59e0b",
      lineWidth: 2,
    });

    emaSeries.setData(
      calculateEMA(candles, 20).map((point) => ({
        time: point.time as Time,
        value: point.value,
      }))
    );

    const bollinger = calculateBollingerBands(candles, 20);

    const upperBandSeries = chart.addSeries(LineSeries, {
      color: "#22c55e",
      lineWidth: 1,
    });

    upperBandSeries.setData(
      bollinger.map((point) => ({
        time: point.time as Time,
        value: point.upper,
      }))
    );

    const lowerBandSeries = chart.addSeries(LineSeries, {
      color: "#ef4444",
      lineWidth: 1,
    });

    lowerBandSeries.setData(
      bollinger.map((point) => ({
        time: point.time as Time,
        value: point.lower,
      }))
    );

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
          Candlestick Chart with SMA, EMA and Bollinger Bands
        </p>
      </div>

      <div ref={chartContainerRef} className="w-full" />
    </section>
  );
}