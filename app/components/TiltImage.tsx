"use client";

import Image from "next/image";
import { useRef } from "react";

// Card art that tilts a few degrees toward the cursor (3D parallax) on hover.
// Replaces the static hover-scale on project cards. Honours reduced-motion.
export default function TiltImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 9}deg) rotateX(${-py * 9}deg) scale(1.03)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-8"
      style={{ perspective: "1000px" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div
        ref={ref}
        className="relative w-full h-full"
        style={{
          transition: "transform 0.4s cubic-bezier(0.2,0,0,1)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain drop-shadow-2xl"
          sizes="(max-width: 768px) 100vw, 900px"
        />
      </div>
    </div>
  );
}
