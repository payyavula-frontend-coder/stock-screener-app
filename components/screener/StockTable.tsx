"use client";

import { useRef } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Stock } from "../../types/stock";

type Props = {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
};

const columnHelper = createColumnHelper<Stock>();

const columns = [
  columnHelper.accessor("symbol", {
    header: "Symbol",
    cell: (info) => (
      <span className="font-mono font-semibold text-blue-400">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("companyName", {
    header: "Company",
  }),
  columnHelper.accessor("sector", {
    header: "Sector",
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => `₹${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor("changePercent", {
    header: "Change %",
    cell: (info) => {
      const value = info.getValue();

      return (
        <span className={value >= 0 ? "text-green-400" : "text-red-400"}>
          {value}%
        </span>
      );
    },
  }),
  columnHelper.accessor("marketCap", {
    header: "Market Cap",
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("volume", {
    header: "Volume",
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("rsi", {
    header: "RSI",
  }),
];

export default function StockTable({ stocks, onSelectStock }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data: stocks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 42,
    overscan: 15,
  });

  return (
    // <div className="rounded-lg border border-slate-700 bg-slate-900">
  
  <div className="w-full overflow-x-auto rounded-lg border border-slate-700 bg-slate-900">
      {/* <div className="grid grid-cols-8 border-b border-slate-700 bg-slate-800 text-sm font-semibold text-slate-200"> */}
      <div className="grid min-w-[1100px] grid-cols-8 border-b border-slate-700 bg-slate-800 p-3 font-semibold">
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <div key={header.id} className="p-3">
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>
          ))
        )}
      </div>

      <div
        ref={parentRef}
        className="h-[520px] overflow-auto"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];

            return (
              <div
                key={row.id}
                 onClick={() => onSelectStock(row.original)}
                // className="grid grid-cols-8 border-b border-slate-800 text-sm hover:bg-slate-800"
                className="grid min-w-[1100px] cursor-pointer grid-cols-8 border-b border-slate-800 text-sm hover:bg-slate-800"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  // width: "100%",
                  width: "1100px",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="truncate p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}