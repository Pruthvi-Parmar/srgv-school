"use client";

import { useEffect, useRef, useState } from "react";

export function CampusVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video loops and plays continuously
    video.loop = true;
    video.muted = true; // Start muted for autoplay
    video.playsInline = true;

    // Try to play, handle autoplay restrictions
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was prevented, user interaction will be needed
      });
    }
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className="border-b border-slate-200 bg-slate-900">
      <div className="container-page py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Experience Our Campus
          </h2>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Take a virtual tour of our facilities, classrooms, and vibrant learning environment
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border-2 border-slate-700 shadow-2xl">
          <div className="relative aspect-video w-full bg-slate-950">
            <video
              ref={videoRef}
              src="/gallery/campus-video.mp4"
              className="h-full w-full object-cover"
              playsInline
              loop
              muted={isMuted}
              autoPlay
              preload="auto"
            />
            {/* Optional: Add a subtle overlay for better text readability if needed */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
            
            {/* Audio control button */}
            <button
              type="button"
              onClick={toggleMute}
              className="absolute bottom-4 right-4 flex items-center justify-center rounded-full bg-black/60 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-black/80"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M17 10l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

