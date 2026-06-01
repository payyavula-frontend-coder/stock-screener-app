# Real Time Stock Screener

A production-grade stock screener application built using Next.js, React, TypeScript, Zustand, TanStack Table, and Lightweight Charts.

---

## Features

### Stock Screening

- 5000+ stock records
- Advanced filtering
- Search by symbol
- Search by company
- Sector filtering
- Price filtering
- Market Cap filtering
- Volume filtering
- RSI filtering
- P/E Ratio filtering

---

### Real-Time Updates

- Simulated WebSocket updates
- Live price changes
- Dynamic table updates

---

### Technical Indicators

Implemented indicators:

- SMA (Simple Moving Average)
- EMA (Exponential Moving Average)
- Bollinger Bands
- RSI (Relative Strength Index)

---

### Charting

- Interactive candlestick charts
- Historical OHLCV generation
- Technical overlays
- Stock selection support

---

### Performance

- TanStack Virtual Scrolling
- Zustand State Management
- useMemo Optimization
- Sub-200ms filtering performance

Observed benchmark:

- 0.69 ms
- 2.31 ms

---

## Technology Stack

Frontend:

- React 18
- Next.js 16
- TypeScript

State Management:

- Zustand

Data Grid:

- TanStack Table
- TanStack Virtual

Charting:

- Lightweight Charts

Styling:

- Tailwind CSS

---

## Project Structure

```text
app/
components/
hooks/
store/
types/
utils/
docs/
```

---

## Installation

```bash
npm install
npm run dev
```

---

## Performance Results

Dataset:

- 5000 Stocks

Filter Performance:

- Average < 5 ms

Requirement:

- < 200 ms

Result:

PASS

---

## Documentation

Additional documentation available in:

```text
docs/architecture.md
docs/benchmark-results.md
```

---

## Status

Project Completed Successfully.