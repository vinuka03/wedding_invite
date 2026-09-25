"use client";

import { CalendarDays, Heart, MapPin, MessageCircle, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import type { Translation } from "@/data/translations";
import { isMusicMuted, toggleMute, getMusicAudio } from "@/lib/music";

export function BottomNavigation({ translation: t }: { translation: Translation }) {
  const [isMuted, setIsMuted] = useState(true);

  const links = [
    { href: "#invitation", label: t.navInvitation, icon: Heart },
    { href: "#schedule", label: t.navSchedule, icon: CalendarDays },
    { href: "#venue", label: t.navVenue, icon: MapPin },
    { href: "#rsvp", label: t.navRsvp, icon: MessageCircle },
  ];

  useEffect(() => {
    const audio = getMusicAudio();
    if (!audio) return;

    if (!audio.paused && !audio.muted) {
      setIsMuted(false);
      return;
    }

    const sync = () => setIsMuted(audio.muted);
    sync();

    audio.addEventListener("volumechange", sync);
    audio.addEventListener("play", sync);

    const unmuteOnInteraction = () => {
      if (!audio.muted) return;
      audio.muted = false;
      audio.volume = 0.55;
      if (audio.paused) {
        audio.play().catch(() => {});
      }
      setIsMuted(false);

      window.removeEventListener("click", unmuteOnInteraction);
      window.removeEventListener("touchstart", unmuteOnInteraction);
      window.removeEventListener("keydown", unmuteOnInteraction);
      window.removeEventListener("scroll", unmuteOnInteraction);
    };

    if (audio.muted) {
      window.addEventListener("click", unmuteOnInteraction);
      window.addEventListener("touchstart", unmuteOnInteraction);
      window.addEventListener("keydown", unmuteOnInteraction);
      window.addEventListener("scroll", unmuteOnInteraction, { passive: true });
    }

    return () => {
      audio.removeEventListener("volumechange", sync);
      audio.removeEventListener("play", sync);
      window.removeEventListener("click", unmuteOnInteraction);
      window.removeEventListener("touchstart", unmuteOnInteraction);
      window.removeEventListener("keydown", unmuteOnInteraction);
      window.removeEventListener("scroll", unmuteOnInteraction);
    };
  }, []);

  const handleToggle = () => {
    const muted = toggleMute();
    setIsMuted(muted);
  };

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-md items-center justify-around rounded-2xl border border-line/90 bg-[#fff8eb]/95 px-1 py-1.5 shadow-[0_10px_30px_rgba(53,45,41,0.18)] backdrop-blur sm:bottom-5" aria-label="Invitation sections">
      {links.map(({ href, label, icon: Icon }) => (
        <a key={href} href={href} className="flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[0.6rem] font-semibold leading-tight text-ink/70 transition hover:bg-rose/[0.08] hover:text-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose">
          <Icon className="size-4" aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}

      <button
        type="button"
        onClick={handleToggle}
        className="flex min-h-12 min-w-[68px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[0.6rem] font-semibold leading-tight text-ink/70 transition hover:bg-rose/[0.08] hover:text-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
        title={isMuted ? "Tap to play music" : "Tap to mute music"}
      >
        {isMuted ? <VolumeX className="size-4" aria-hidden="true" /> : <Volume2 className="size-4" aria-hidden="true" />}
        <span>{isMuted ? "Play" : "Mute"}</span>
      </button>
    </nav>
  );
}
