"use client";

import { useEffect, useRef } from "react";

// A small accent label that follows the cursor and fades in while hovering a
// project card. Pointer devices only; skipped for reduced-motion / touch.
export default function CardCursorLabel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let active = false;

    const render = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const over = (e.target as HTMLElement)?.closest?.(".project-card");
      if (over && !active) {
        active = true;
        el.style.opacity = "1";
        el.style.scale = "1";
      } else if (!over && active) {
        active = false;
        el.style.opacity = "0";
        el.style.scale = "0.5";
      }
    };

    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block rounded-full bg-[#e63329] text-white text-xs font-semibold px-4 py-2 whitespace-nowrap shadow-lg"
      style={{ opacity: 0, scale: "0.5", transition: "opacity 0.25s ease, scale 0.25s ease", willChange: "transform" }}
    >
      View case study →
    </div>
  );
}
