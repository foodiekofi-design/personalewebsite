"use client";

import { useEffect, useRef, useState } from "react";

// Ambient music toggle. A single "Set the mood" play/pause control bottom-right
// drives a hidden YouTube player via the IFrame Player API, so the visitor
// hears the afrohouse mix without ever seeing a video. The player iframe lives
// off-screen (not display:none, which would stop playback).
//
// To change the music: swap VIDEO_ID for the id in any YouTube URL. LIST_ID is
// optional; a radio/playlist id (the `list=` param) makes it a continuous mix.
const VIDEO_ID = "M3w0llMIrO8";
const LIST_ID = "RDM3w0llMIrO8";

declare global {
  interface Window {
    YT?: { Player: new (el: string, opts: unknown) => YTPlayer; loaded?: number };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type YTPlayer = { playVideo: () => void; pauseVideo: () => void };

export default function MusicPlayer() {
  const playerRef = useRef<YTPlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;

    function createPlayer() {
      if (cancelled || !window.YT) return;
      playerRef.current = new window.YT.Player("yt-audio-host", {
        videoId: VIDEO_ID,
        playerVars: {
          list: LIST_ID,
          listType: "playlist",
          autoplay: 0,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            if (!cancelled) setReady(true);
          },
          onStateChange: (e: { data: number }) => {
            // 1 = playing, 2 = paused, 0 = ended
            if (e.data === 1) setPlaying(true);
            else if (e.data === 2 || e.data === 0) setPlaying(false);
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        createPlayer();
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  function toggle() {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pauseVideo();
    else p.playVideo();
  }

  return (
    <>
      {/* Hidden audio host. Off-screen (not display:none, which stops playback). */}
      <div
        aria-hidden
        className="fixed top-0 -left-[9999px] w-[320px] h-[180px] pointer-events-none"
      >
        <div id="yt-audio-host" />
      </div>

      <button
        onClick={toggle}
        disabled={!ready}
        aria-pressed={playing}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 h-12 pl-4 pr-5 rounded-full bg-[#0a0a0a] text-white shadow-[0_4px_12px_rgba(0,0,0,0.12),0_10px_30px_rgba(0,0,0,0.18)] hover:bg-[#1a1a1a] active:scale-[0.96] transition-[background-color,scale,opacity] duration-200 disabled:opacity-50 disabled:cursor-default"
      >
        {/* Fixed-width icon slot so the label never shifts */}
        <span className="inline-flex items-center justify-center w-4 h-4">
          {playing ? (
            <span className="flex items-end justify-center gap-[2px] h-3.5 w-4">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-[2px] h-full bg-white rounded-full"
                  style={{
                    transformOrigin: "bottom",
                    animation: `eq 0.9s ease-in-out ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </span>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 translate-x-px">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>
        <span className="text-sm font-medium leading-none">Set the mood</span>
      </button>
    </>
  );
}
