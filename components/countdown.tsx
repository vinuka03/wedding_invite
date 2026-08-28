"use client";

import { useEffect, useState } from "react";

type CountdownValues = { days: number; hours: number; minutes: number; seconds: number };

function getTargetDate() {
  const now = new Date();
  const target = new Date(now.getFullYear(), 10, 19, 0, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setFullYear(target.getFullYear() + 1);
  }

  return target;
}

function getCountdown(): CountdownValues {
  const difference = Math.max(0, getTargetDate().getTime() - Date.now());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

type CountdownLabels = {
  eyebrow: string;
  title: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export function Countdown({ labels }: { labels: CountdownLabels }) {
  const [remaining, setRemaining] = useState<CountdownValues | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getCountdown());
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { value: remaining?.days, label: labels.days },
    { value: remaining?.hours, label: labels.hours },
    { value: remaining?.minutes, label: labels.minutes },
    { value: remaining?.seconds, label: labels.seconds },
  ];

  return (
    <section className="countdown-card" aria-live="polite">
      <p className="eyebrow">{labels.eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">{labels.title}</h2>
      <div className="mt-7 grid grid-cols-4 divide-x divide-line border-y border-line">
        {units.map((unit) => (
          <div key={unit.label} className="px-1 py-4 text-center sm:px-3">
            <span className="block font-display text-2xl tabular-nums text-rose sm:text-4xl">{String(unit.value ?? 0).padStart(2, "0")}</span>
            <span className="mt-1 block text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-ink/60 sm:text-[0.65rem]">{unit.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
