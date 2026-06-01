"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickSeries,
  LineSeries,
} from "lightweight-charts";

export default function StockChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
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

    const sampleData = [
      {
        time: "2025-01-01",
        open: 100,
        high: 110,
        low: 95,
        close: 108,
      },
      {
        time: "2025-01-02",
        open: 108,
        high: 115,
        low: 104,
        close: 112,
      },
      {
        time: "2025-01-03",
        open: 112,
        high: 118,
        low: 109,
        close: 116,
      },
      {
        time: "2025-01-04",
        open: 116,
        high: 122,
        low: 111,
        close: 120,
      },
      {
        time: "2025-01-05",
        open: 120,
        high: 128,
        low: 118,
        close: 126,
      },
    ];

    candleSeries.setData(sampleData);

    const smaSeries = chart.addSeries(LineSeries, {
      color: "#3b82f6",
      lineWidth: 2,
    });

    smaSeries.setData([
      { time: "2025-01-01", value: 100 },
      { time: "2025-01-02", value: 104 },
      { time: "2025-01-03", value: 109 },
      { time: "2025-01-04", value: 114 },
      { time: "2025-01-05", value: 120 },
    ]);

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className="w-full rounded-lg border border-slate-700"
    />
  );
}