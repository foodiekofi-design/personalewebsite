"use client";

import { type ElementType, useEffect, useRef, useState } from "react";

// Masked, word-by-word heading reveal. Each word wipes up from a clipped
// box, staggered, when the heading scrolls into view. Use "\n" for line
// breaks. Honours prefers-reduced-motion (shows instantly).
export default function RevealText({
  text,
  className = "",
  as = "span",
  wordDelay = 55,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  wordDelay?: number;
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
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag: ElementType = as;
  const lines = text.split("\n");
  let i = 0;

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} style={{ display: "block" }}>
            {words.map((word, wi) => {
              const delay = i++ * wordDelay;
              return (
                <span
                  key={wi}
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    verticalAlign: "top",
                    marginRight: wi < words.length - 1 ? "0.25em" : 0,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      transform: shown ? "translateY(0)" : "translateY(110%)",
                      opacity: shown ? 1 : 0,
                      transition: `transform 0.7s cubic-bezier(0.2,0,0,1) ${delay}ms, opacity 0.7s ${delay}ms`,
                      willChange: "transform",
                    }}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
