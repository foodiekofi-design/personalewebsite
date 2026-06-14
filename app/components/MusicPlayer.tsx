"use client";

import { useState } from "react";

// Floating music toggle. A small ♪ button bottom-right expands a card with a
// YouTube embed (an afrohouse mix) and a link out. The visitor presses play
// inside the embed (browsers block autoplay-with-sound), so this is fully
// within YouTube's terms. The iframe is lazy-mounted on first open and then
// kept in the DOM, so playback continues when the card is minimised.
//
// To change the music: swap VIDEO_ID for the id in any YouTube URL
// (the part after `watch?v=` or `youtu.be/`). LIST_ID is optional; setting it
// to a radio/playlist id (the `list=` param) makes it play as a continuous mix.
const VIDEO_ID = "M3w0llMIrO8";
const LIST_ID = "RDM3w0llMIrO8";
const TRACK_TITLE = "Afrohouse, on rotation";
const TRACK_SUBTITLE = "What I design and build to";

const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1${LIST_ID ? `&list=${LIST_ID}` : ""}`;
const WATCH_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}${LIST_ID ? `&list=${LIST_ID}` : ""}`;

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  function toggle() {
    if (!loaded) setLoaded(true);
    setOpen(o => !o);
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Card. Stays mounted once loaded so audio keeps playing when minimised. */}
      <div
        className="w-[280px] rounded-2xl bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.06),0_18px_50px_rgba(0,0,0,0.16)] origin-bottom-right transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "none" : "translateY(8px) scale(0.96)",
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
      >
        <div className="flex items-start justify-between gap-2 px-1 pt-1 pb-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#0a0a0a] leading-tight truncate">{TRACK_TITLE}</p>
            <p className="text-xs text-[#999] leading-tight mt-0.5 truncate">{TRACK_SUBTITLE}</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Minimise player"
            className="shrink-0 -mt-0.5 -mr-0.5 h-7 w-7 inline-flex items-center justify-center rounded-full text-[#999] hover:text-[#0a0a0a] hover:bg-[#f2f2f2] active:scale-[0.96] transition-[color,background-color,scale] duration-200"
          >
            <span className="text-base leading-none">✕</span>
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#f2f2f2] outline outline-1 -outline-offset-1 outline-black/10">
          {loaded && (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={EMBED_SRC}
              title={TRACK_TITLE}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        <a
          href={WATCH_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 px-1 text-xs font-medium text-[#666] hover:text-[#e63329] transition-colors"
        >
          Open on YouTube ↗
        </a>
      </div>

      {/* Toggle button */}
      <button
        onClick={toggle}
        aria-label={open ? "Minimise music player" : "Open music player"}
        aria-expanded={open}
        className="group h-12 w-12 inline-flex items-center justify-center rounded-full bg-[#0a0a0a] text-white shadow-[0_4px_12px_rgba(0,0,0,0.12),0_10px_30px_rgba(0,0,0,0.18)] hover:bg-[#1a1a1a] active:scale-[0.96] transition-[background-color,scale] duration-200"
      >
        <span className="text-lg leading-none transition-transform duration-300 group-hover:scale-110">♪</span>
      </button>
    </div>
  );
}
