"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

// Fades content up as it enters the viewport. Used for subtle entrance and
// on-scroll reveals. Honours prefers-reduced-motion by showing instantly.
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  distance = 16,
  scaleFrom = 1,
  duration = 0.6,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  distance?: number;
  scaleFrom?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag: ElementType = as;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${distance}px)${scaleFrom !== 1 ? ` scale(${scaleFrom})` : ""}`,
        transition: `opacity ${duration}s cubic-bezier(0.2,0,0,1) ${delay}ms, transform ${duration}s cubic-bezier(0.2,0,0,1) ${delay}ms`,
        willChange: shown ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
