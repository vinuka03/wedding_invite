"use client";

import { useState, type FormEvent } from "react";
import { Check, X, User, PenLine, Send, Heart } from "lucide-react";
import type { Locale } from "@/data/wedding";
import { weddingDetails } from "@/data/wedding";
import { translations } from "@/data/translations";

export function RsvpForm({ locale }: { locale: Locale }) {
    const t = translations[locale];
    const [error, setError] = useState("");
    const [attending, setAttending] = useState<"yes" | "no" | null>(null);
    const [nameFocused, setNameFocused] = useState(false);
    const [msgFocused, setMsgFocused] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        const name = String(form.get("name") ?? "").trim();
        const message = String(form.get("message") ?? "").trim();

        if (!name) {
            setError(t.requiredName);
            return;
        }

        const attendanceStatus =
            attending === "yes"
                ? "Will Attend"
                : "Unable to Attend";

        const fullMessage = `*WEDDING RSVP*

        *Name:* ${name}
        *Attendance:* ${attendanceStatus}
        
        *Message:*
        ${message || "No additional message."}
        
        Thank you!`;

        window.open(
            `https://wa.me/${weddingDetails.whatsappPhone}?text=${encodeURIComponent(fullMessage)}`,
            "_blank",
            "noopener,noreferrer"
        );
    }

    return (
        <form noValidate onSubmit={handleSubmit} className="mx-auto mt-8 grid max-w-xl gap-6 text-left">

            <div className="relative">
                <label htmlFor="guest-name" className="form-label">{t.guestName}</label>
                <div className="relative">
                    <User
                        className={`pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 transition-colors ${nameFocused ? "text-rose" : "text-ink/35"}`}
                        aria-hidden="true"
                    />
                    <input
                        id="guest-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder={t.guestNamePlaceholder}
                        className="form-control pl-12"
                        onChange={() => setError("")}
                        onFocus={() => setNameFocused(true)}
                        onBlur={() => setNameFocused(false)}
                    />
                </div>
            </div>

            <div>
                <label className="form-label mb-3 block">{t.attendingQuestion}</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => { setAttending("yes"); setError(""); }}
                        className={`group relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 px-3 py-5 font-medium transition-all duration-300 ${
                            attending === "yes"
                                ? "border-rose bg-rose/10 text-rose shadow-[0_8px_24px_rgba(155,98,88,0.18)]"
                                : "border-line bg-white/60 text-ink/60 hover:border-rose/40 hover:text-rose"
                        }`}
                        aria-pressed={attending === "yes"}
                    >
            <span className={`flex size-10 items-center justify-center rounded-full transition-all duration-300 ${
                attending === "yes" ? "bg-rose text-white scale-110" : "bg-rose/10 text-rose group-hover:scale-105"
            }`}>
              <Check className="size-5" aria-hidden="true" />
            </span>
                        <span className="text-sm">{t.attendingYes}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => { setAttending("no"); setError(""); }}
                        className={`group relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 px-3 py-5 font-medium transition-all duration-300 ${
                            attending === "no"
                                ? "border-ink/40 bg-ink/5 text-ink shadow-[0_8px_24px_rgba(53,45,41,0.12)]"
                                : "border-line bg-white/60 text-ink/60 hover:border-ink/30 hover:text-ink"
                        }`}
                        aria-pressed={attending === "no"}
                    >
            <span className={`flex size-10 items-center justify-center rounded-full transition-all duration-300 ${
                attending === "no" ? "bg-ink/80 text-white scale-110" : "bg-ink/10 text-ink/60 group-hover:scale-105"
            }`}>
              <X className="size-5" aria-hidden="true" />
            </span>
                        <span className="text-sm">{t.attendingNo}</span>
                    </button>
                </div>
            </div>

            <div className="relative">
                <label htmlFor="guest-message" className="form-label">{t.optionalMessage}</label>
                <div className="relative">
                    <PenLine
                        className={`pointer-events-none absolute left-4 top-4 size-5 transition-colors ${msgFocused ? "text-rose" : "text-ink/35"}`}
                        aria-hidden="true"
                    />
                    <textarea
                        id="guest-message"
                        name="message"
                        rows={4}
                        placeholder={t.messagePlaceholder}
                        className="form-control resize-y pl-12"
                        onFocus={() => setMsgFocused(true)}
                        onBlur={() => setMsgFocused(false)}
                    />
                </div>
            </div>

            {error && (
                <p role="alert" className="-mt-2 flex items-center gap-2 text-sm text-[#a53645]">
                    <X className="size-4 shrink-0" aria-hidden="true" />
                    {error}
                </p>
            )}

            <button
                type="submit"
                className="button-primary group mt-2 justify-center hover:shadow-[0_10px_30px_rgba(155,98,88,0.25)]"
            >
                <Send className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                {t.rsvpButton}
                <Heart className="size-4 fill-white transition-transform group-hover:scale-110" aria-hidden="true" />
            </button>
        </form>
    );
}
