import type { OHLCV, IndicatorPoint } from "../types/chart";

export function calculateSMA(
  candles: OHLCV[],
  period = 10
): IndicatorPoint[] {
  return candles.map((candle, index) => {
    const slice = candles.slice(
      Math.max(0, index - period + 1),
      index + 1
    );

    const avg =
      slice.reduce((sum, item) => sum + item.close, 0) /
      slice.length;

    return {
      time: candle.time,
      value: Number(avg.toFixed(2)),
    };
  });
}

export function calculateEMA(
  candles: OHLCV[],
  period = 20
): IndicatorPoint[] {
  const multiplier = 2 / (period + 1);

  let ema = candles[0]?.close ?? 0;

  return candles.map((candle) => {
    ema = (candle.close - ema) * multiplier + ema;

    return {
      time: candle.time,
      value: Number(ema.toFixed(2)),
    };
  });
}

export function calculateRSI(
  candles: OHLCV[],
  period = 14
): IndicatorPoint[] {
  const result: IndicatorPoint[] = [];

  for (let i = 0; i < candles.length; i++) {
    if (i < period) {
      result.push({
        time: candles[i].time,
        value: 50,
      });
      continue;
    }

    let gains = 0;
    let losses = 0;

    for (let j = i - period + 1; j <= i; j++) {
      const diff =
        candles[j].close - candles[j - 1].close;

      if (diff > 0) gains += diff;
      else losses += Math.abs(diff);
    }

    const rs = gains / (losses || 1);

    const rsi = 100 - 100 / (1 + rs);

    result.push({
      time: candles[i].time,
      value: Number(rsi.toFixed(2)),
    });
  }

  return result;
}

export function calculateBollingerBands(candles: OHLCV[], period = 20) {
  return candles.map((candle, index) => {
    const slice = candles.slice(Math.max(0, index - period + 1), index + 1);

    const sma =
      slice.reduce((sum, item) => sum + item.close, 0) / slice.length;

    const variance =
      slice.reduce((sum, item) => sum + Math.pow(item.close - sma, 2), 0) /
      slice.length;

    const standardDeviation = Math.sqrt(variance);

    return {
      time: candle.time,
      upper: Number((sma + 2 * standardDeviation).toFixed(2)),
      middle: Number(sma.toFixed(2)),
      lower: Number((sma - 2 * standardDeviation).toFixed(2)),
    };
  });
}