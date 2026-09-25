"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarPlus, CalendarCheck, Apple, CalendarDays } from "lucide-react";
import { googleCalendarUrl, downloadICS } from "@/lib/calendar";
import { weddingDetails } from "@/data/wedding";

type CalendarLabels = {
  addToCalendar: string;
  googleCalendar: string;
  appleCalendar: string;
  outlookCalendar: string;
  calendarTitle: string;
  calendarDescription: string;
};

export function AddToCalendar({ labels }: { labels: CalendarLabels }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const gcalUrl = googleCalendarUrl(labels.calendarTitle, labels.calendarDescription);

  const handleICS = () => {
    downloadICS(labels.calendarTitle, labels.calendarDescription);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white/50 px-4 py-2 text-xs font-medium text-ink/70 backdrop-blur-sm transition hover:border-rose/60 hover:bg-rose/[0.06] hover:text-rose"
      >
        <CalendarPlus className="size-4" aria-hidden="true" />
        {labels.addToCalendar}
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-30 mt-2 w-48 -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-[#fffdfa] py-1.5 shadow-[0_12px_32px_rgba(53,45,41,0.15)]">
          <a
            href={gcalUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink/75 transition hover:bg-rose/[0.06] hover:text-rose"
          >
            <CalendarCheck className="size-4" aria-hidden="true" />
            {labels.googleCalendar}
          </a>
          <button
            type="button"
            onClick={handleICS}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-ink/75 transition hover:bg-rose/[0.06] hover:text-rose"
          >
            <Apple className="size-4" aria-hidden="true" />
            {labels.appleCalendar}
          </button>
          <button
            type="button"
            onClick={handleICS}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-ink/75 transition hover:bg-rose/[0.06] hover:text-rose"
          >
            <CalendarDays className="size-4" aria-hidden="true" />
            {labels.outlookCalendar}
          </button>
        </div>
      )}
    </div>
  );
}
