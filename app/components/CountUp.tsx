"use client";

import { useEffect, useRef, useState } from "react";

// Animates the first number inside a metric string up from zero when it
// scrolls into view, preserving any prefix/suffix (%, ×, +, commas, " mo").
// Non-numeric values (e.g. "iOS + Android", "Live") render static.
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/\d[\d,]*\.?\d*/);
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const raw = match[0];
    const start = match.index ?? 0;
    const prefix = value.slice(0, start);
    const suffix = value.slice(start + raw.length);
    const target = parseFloat(raw.replace(/,/g, ""));
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const hasComma = raw.includes(",");

    const fmt = (n: number) => {
      const s = hasComma
        ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals);
      return prefix + s + suffix;
    };

    setDisplay(fmt(0));

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();
        const duration = 1200;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(fmt(target * eased));
          if (p < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
