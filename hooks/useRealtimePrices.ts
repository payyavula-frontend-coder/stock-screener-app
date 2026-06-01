"use client";

import { useEffect } from "react";
import { useStockStore } from "../store/stockStore";

const getRandomChange = () => {
  return Number((Math.random() * 4 - 2).toFixed(2));
};

export function useRealtimePrices() {
  const stocks = useStockStore((state) => state.stocks);
  const setStocks = useStockStore((state) => state.setStocks);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const updatedStocks = stocks.map((stock) => {
        const shouldUpdate = Math.random() < 0.08;

        if (!shouldUpdate) return stock;

        const changePercent = getRandomChange();
        const newPrice = Number(
          (stock.price + stock.price * (changePercent / 100)).toFixed(2)
        );

        return {
          ...stock,
          price: newPrice,
          changePercent,
          change: Number((newPrice - stock.price).toFixed(2)),
        };
      });

      setStocks(updatedStocks);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [stocks, setStocks]);
}