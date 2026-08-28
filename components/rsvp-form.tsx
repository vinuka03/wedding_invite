"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import type { Locale } from "@/data/wedding";
import { weddingDetails } from "@/data/wedding";
import { translations } from "@/data/translations";

export function RsvpForm({ locale }: { locale: Locale }) {
  const t = translations[locale];
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const guests = String(form.get("guests") ?? "1");
    const message = String(form.get("message") ?? "").trim();

    if (!name) {
      setError(t.requiredName);
      return;
    }

    const text = t.rsvpMessage(name, guests, message);
    window.open(`https://wa.me/${weddingDetails.whatsappPhone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mx-auto mt-8 grid max-w-xl gap-5 text-left">
      <div>
        <label htmlFor="guest-name" className="form-label">{t.guestName}</label>
        <input id="guest-name" name="name" type="text" autoComplete="name" placeholder={t.guestNamePlaceholder} className="form-control" onChange={() => setError("")} />
      </div>
      <div>
        <label htmlFor="guest-count" className="form-label">{t.numberOfGuests}</label>
        <select id="guest-count" name="guests" defaultValue="1" className="form-control">
          {[1, 2, 3, 4, 5].map((number) => <option key={number} value={number}>{number}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="guest-message" className="form-label">{t.optionalMessage}</label>
        <textarea id="guest-message" name="message" rows={4} placeholder={t.messagePlaceholder} className="form-control resize-y" />
      </div>
      {error && <p role="alert" className="-mt-2 text-sm text-[#a53645]">{error}</p>}
      <button type="submit" className="button-primary mt-1 justify-center">
        <MessageCircle className="size-5" aria-hidden="true" />
        {t.rsvpButton}
      </button>
    </form>
  );
}
