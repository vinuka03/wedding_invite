"use client";

import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { startMusic } from "@/lib/music";

export function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  const [showTapToOpen, setShowTapToOpen] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (showTapToOpen) return;

    setFadeIn(true);

    const timer = setTimeout(() => {
      startMusic();
      onDone();
    }, 12000);

    return () => clearTimeout(timer);
  }, [showTapToOpen, onDone]);

  const handleOpen = () => {
    setShowTapToOpen(false);
    startMusic();
  };

  const handleVideoError = () => {
    setVideoFailed(true);
  };

  const handleVideoEnd = () => {
    startMusic();
    onDone();
  };

  const handleSkip = () => {
    startMusic();
    onDone();
  };

  return (
      <div>
        {showTapToOpen && (
            <div className="tap-overlay" onClick={handleOpen}>
              <div className="tap-icon flex flex-col items-center gap-6">
                <div className="flex size-20 items-center justify-center rounded-full border-2 border-rose/30 bg-white/40 shadow-[0_8px_30px_rgba(155,98,88,0.15)] backdrop-blur-sm">
                  <Heart className="size-8 text-rose" fill="currentColor" />
                </div>
                <div className="text-center">
                  <p className="font-serif text-2xl text-ink/80">Kavindi &amp; Gamindu</p>
                  <p className="mt-3 text-sm font-medium tracking-widest uppercase text-rose/70">Tap to open</p>
                </div>
              </div>
            </div>
        )}

        {!showTapToOpen && (
            <div className={`intro-container ${fadeIn ? "video-fade" : ""}`}>
              <div className="video-wrapper">
                {!videoFailed ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        onError={handleVideoError}
                        onEnded={handleVideoEnd}
                    >
                      <source src="/videos/video5.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                ) : (
                    <img
                        src="/images/fallback.jpeg"
                        alt="Wedding Invitation"
                        className="fallback-image"
                    />
                )}
              </div>

              <button
                  type="button"
                  onClick={handleSkip}
                  className="absolute bottom-6 right-6 z-10 rounded-full bg-black/40 px-5 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition hover:bg-black/60 hover:text-white"
              >
                Skip
              </button>
            </div>
        )}

      </div>
  );
}
