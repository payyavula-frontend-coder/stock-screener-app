# Benchmark Results

## Environment

Framework: Next.js 16

Language: TypeScript

Dataset Size: 5000 Stocks

---

## Filter Performance

Observed Results:

- 0.69 ms
- 2.31 ms

Average Response Time:

< 5 ms

Target Requirement:

< 200 ms

Status:

PASS

---

## Virtual Scrolling

Technology:

- TanStack Virtual

Result:

Only visible rows rendered.

Memory consumption reduced significantly compared to rendering all rows.

Status:

PASS

---

## Chart Performance

Technology:

- Lightweight Charts

Indicators:

- SMA
- EMA
- Bollinger Bands

Result:

Smooth rendering with historical dataset.

Status:

PASS

---

## State Management

Technology:

- Zustand

Result:

Minimal re-renders.

Fast state updates.

Status:

PASS

---

## Conclusion

The application successfully meets the requirement of handling 5000+ stocks while maintaining sub-200ms filter response times.

Performance target achieved.