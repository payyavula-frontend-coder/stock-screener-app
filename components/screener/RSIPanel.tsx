"use client";

type Props = {
  rsi: number;
};

export default function RSIPanel({ rsi }: Props) {
  const status =
    rsi > 70
      ? "Overbought"
      : rsi < 30
      ? "Oversold"
      : "Neutral";

  const color =
    rsi > 70
      ? "text-red-400"
      : rsi < 30
      ? "text-green-400"
      : "text-yellow-400";

  return (
    <div className="mb-4 rounded-lg border border-slate-700 bg-slate-900 p-4">
      <h3 className="mb-2 text-lg font-semibold">RSI Indicator</h3>

      <div className="flex items-center justify-between">
        <span>Current RSI</span>
        <span className="font-bold">{rsi.toFixed(2)}</span>
      </div>

      <div className={`mt-2 font-semibold ${color}`}>
        {status}
      </div>
    </div>
  );
}