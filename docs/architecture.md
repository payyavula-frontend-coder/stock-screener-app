# Real Time Stock Screener Architecture

## Overview

The application is a production-grade stock screener built using React 18, Next.js 16, TypeScript, Zustand, TanStack Table, and Lightweight Charts.

The system supports:

- 5000+ stock records
- Real-time price updates
- Virtual scrolling
- Advanced filtering
- Technical indicators
- Interactive charting

---

## Architecture Layers

### Presentation Layer

Components:

- FilterPanel
- StockTable
- StockChart
- RSIPanel

Responsibilities:

- User interaction
- Data visualization
- Filter controls
- Chart rendering

---

### State Management Layer

Technology:

- Zustand

Responsibilities:

- Global stock state
- Selected stock management
- Real-time updates
- UI synchronization

---

### Business Logic Layer

Utilities:

- filterEngine.ts
- indicators.ts
- generateOHLCV.ts
- generateStocks.ts

Responsibilities:

- Filtering
- Indicator calculation
- Market data generation

---

### Data Layer

Mock Data Source:

- 5000 generated stock records

Simulated Features:

- Real-time market updates
- Historical OHLCV generation

---

## Performance Optimizations

- TanStack Virtualization
- React Memoization
- Zustand selective subscriptions
- useMemo based filtering
- Lightweight Charts rendering

---

## Technical Indicators

Implemented:

- SMA
- EMA
- Bollinger Bands
- RSI

---

## Scalability

Current Capacity:

- 5000+ stocks

Future Extensions:

- WebSocket integration
- Live brokerage APIs
- Watchlists
- Portfolio analytics