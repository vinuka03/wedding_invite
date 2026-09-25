"use client"

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ExternalLink, Heart, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/data/wedding";
import { localizedPhone, weddingDetails } from "@/data/wedding";
import { translations } from "@/data/translations";
import { RsvpForm } from "./rsvp-form";
import { SectionHeading } from "./section-heading";
import { BottomNavigation } from "./bottom-navigation";
import { Countdown } from "./countdown";
import { AddToCalendar } from "./add-to-calendar";
import { Reveal } from "./reveal";
import { GoldenParticles } from "./golden-particles";

export function InvitationPage({ locale }: { locale: Locale }) {
  const t = translations[locale];
  const brideName = t.brideName;
  const groomName = t.groomName;
  const alternateLocale = locale === "en" ? "si" : "en";
  const parentNames = locale === "si"
      ? { bride: translations.si.brideParents, groom: translations.si.groomParents }
      : { bride: weddingDetails.brideParents, groom: weddingDetails.groomParents };
  const schedule = [
    { time: weddingDetails.ceremonyTime, title: t.ceremony },
    { time: weddingDetails.poruweTime, title: t.poruwe },
  ];
  const parentDetails = [
    { label: t.brideParentsLabel, name: parentNames.bride },
    { label: t.groomParentsLabel, name: parentNames.groom },
  ];
  const contacts = [
    { name: groomName, phone: weddingDetails.gaminduPhone },
    { name: brideName, phone: weddingDetails.kavindiPhone },
  ];

  return (
      <main lang={locale} className="min-h-dvh overflow-hidden bg-[#fbf4e6] pb-20 text-ink">
        <GoldenParticles />

        <section id="invitation" className="relative mx-auto max-w-5xl scroll-mt-4 px-5 pb-12 pt-8 text-center sm:px-8 sm:pb-16 sm:pt-12">
          <div className="pointer-events-none absolute left-1/2 top-5 h-64 w-64 -translate-x-1/2 rounded-full bg-[#eedfd0]/55 blur-3xl" aria-hidden="true" />
          <div className="relative animate-intro">
            <Heart className="mx-auto size-4 fill-rose text-rose" aria-hidden="true" />
            <p className="eyebrow mt-6">{t.invitation}</p>
            <h1 className="mt-6 font-display text-[clamp(3.25rem,15vw,6.5rem)] leading-[0.82] tracking-[-0.055em] text-ink">
              <span className="block">{brideName}</span>
              <span className="my-3 block text-2xl font-normal tracking-normal text-rose sm:text-3xl">{t.namesJoiner}</span>
              <span className="block">{groomName}</span>
            </h1>
            <p className="mt-7 text-sm tracking-[0.16em] text-ink/65">{t.gettingMarried}</p>
            <div className="mx-auto mt-8 flex w-fit items-center gap-4 border-y border-line px-5 py-4">
              <CalendarDays className="size-4 text-rose" aria-hidden="true" />
              <div className="leading-none">
                <span className="font-display text-4xl">{weddingDetails.dateDay}</span>
                <span className="ml-2 text-sm font-medium uppercase tracking-[0.18em]">{t.dateMonth}</span>
                <span className="ml-2 font-display text-4xl">{weddingDetails.dateYear}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <div className="relative flex items-center justify-center rounded-[1.75rem] border border-line bg-[#ead7b8] p-3 shadow-[0_16px_50px_rgba(61,43,30,0.08)] sm:aspect-video sm:overflow-hidden sm:rounded-[2rem] sm:p-4">
              <Image src={weddingDetails.coupleImage} alt={t.photoAlt} width={1054} height={1492} priority className="h-auto max-h-[72svh] w-auto max-w-full rounded-[1.2rem] object-contain sm:h-full sm:max-h-none sm:w-full sm:rounded-[1.2rem] sm:object-cover sm:object-[center_28%]" />
              <span className="sr-only">{t.photoPlaceholder}</span>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-2xl px-6 py-12 text-center sm:py-16">
          <Reveal>
            <p className="font-display text-2xl leading-relaxed text-ink/85 sm:text-3xl">“{t.invitationMessage}”</p>
          </Reveal>
          <Reveal className="mt-10">
            <Countdown labels={{
              eyebrow: t.countdownEyebrow,
              title: t.countdownTitle,
              days: t.countdownDays,
              hours: t.countdownHours,
              minutes: t.countdownMinutes,
              seconds: t.countdownSeconds,
            }} />
          </Reveal>
        </section>

        <section className="border-y border-line bg-champagne/75 px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionHeading eyebrow={t.parentsEyebrow} title={t.parentsTitle} />
              <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {parentDetails.map((parent) => (
                    <div key={parent.label} className="bg-[#fffdfa] px-6 py-7 text-center">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-rose">{parent.label}</p>
                      <p className="mt-3 font-display text-2xl">{parent.name}</p>
                    </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="schedule" className="scroll-mt-4 px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionHeading eyebrow={t.scheduleEyebrow} title={t.scheduleTitle} />

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 pt-4">
                {schedule.map((event) => (
                    <div
                        key={event.time}
                        className="rounded-2xl border border-gray-700 bg-gradient-to-br from-rose/5 to-transparent p-8 hover:border-rose/50 transition-all duration-300"
                    >
                      {/* Time */}
                      <time className="font-display text-4xl sm:text-5xl text-rose block mb-4">
                        {event.time}
                      </time>

                      {/* Divider */}
                      <div className="w-12 h-1 bg-gradient-to-r from-rose to-rose/30 rounded-full mb-6" />

                      {/* Event Title */}
                      <p className="text-lg sm:text-xl font-medium text-black leading-snug">
                        {event.title}
                      </p>
                    </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="venue" className="scroll-mt-4 bg-[#493b32] px-5 py-12 text-[#fffaf4] sm:px-8 sm:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionHeading eyebrow={t.venueEyebrow} title={t.venueTitle} inverse />
            <p className="mx-auto mt-5 max-w-md text-2xl leading-7 text-amber-200">{t.venueCopy}</p>
            <div className="venue-preview group mt-8 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-2">
              <Image src={weddingDetails.venueImage} alt={t.venueImageAlt} width={1667} height={943} className="aspect-[7/5] w-full rounded-xl object-cover transition duration-[900ms] ease-out md:group-hover:scale-[1.045] md:group-hover:saturate-125" />
            </div>
            <a href={weddingDetails.venueUrl} target="_blank" rel="noreferrer" className="button-light mx-auto mt-8 w-fit">
              <MapPin className="size-5" aria-hidden="true" />
              {t.viewLocation}
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
        </section>



        <section id="rsvp" className="scroll-mt-4 border-y border-line bg-champagne/75 px-5 py-12 sm:px-8 sm:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionHeading eyebrow={t.rsvpEyebrow} title={t.rsvpTitle}>
              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-ink/65">{t.rsvpCopy}</p>
            </SectionHeading>
            <RsvpForm locale={locale} />
          </Reveal>
        </section>

        <footer className="relative px-5 py-20 sm:px-8 bg-black">
          <div className="mx-auto max-w-4xl">

            {/* SECTION 1: Couple Names & Heart */}
            <div className="text-center mb-20 pb-12 border-b border-rose/30">
              <Heart className="mx-auto size-6 fill-rose text-rose mb-8" aria-hidden="true" />

              <p className="font-display text-6xl md:text-7xl font-light tracking-tight leading-tight">
                <span className="text-rose block mb-2">Kavindi</span>
                <span className="text-gray-300">&</span>
                <span className="text-rose block mt-2">Gamindu</span>
              </p>
            </div>

            {/* SECTION 2: Save The Date - Prominent */}
            <div className="text-center mb-24 py-16 bg-gradient-to-b from-rose/5 to-transparent rounded-2xl px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose mb-6">
                Save The Date
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                <div className="font-display text-5xl md:text-6xl font-light text-gray-200">
                  {weddingDetails.dateDay}
                </div>

                <div className="hidden sm:block w-px h-12 bg-rose/30"></div>

                <div className="text-center sm:text-left">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-400 mb-2">
                    {t.dateMonth}
                  </p>
                  <p className="font-display text-4xl md:text-5xl font-light text-gray-200">
                    {weddingDetails.dateYear}
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 3: Contacts Header */}
            <div className="text-center mb-16 pb-12 border-b border-rose/20">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose mb-4">
                {t.contactsEyebrow}
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-gray-100 mb-4">
                {t.contactsTitle}
              </h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Please reach out with any questions or RSVP inquiries
              </p>
            </div>

            {/* SECTION 4: Contacts - Individual Cards for Better Identification */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              {contacts.map((contact) => (
                  <a
                      key={contact.phone}
                      href={`tel:${contact.phone}`}
                      className="group"
                  >
                    <div className="text-center p-8 rounded-xl border border-rose/20 bg-gradient-to-br from-rose/5 to-transparent hover:border-rose/50 hover:from-rose/10 transition-all duration-300">

                      {/* Contact Icon */}
                      <div className="inline-flex items-center justify-center size-12 rounded-full bg-rose/20 group-hover:bg-rose/30 transition duration-300 mb-6">
                        <Phone className="size-5 text-rose" aria-hidden="true" />
                      </div>

                      {/* Contact Name */}
                      <p className="font-display text-3xl md:text-4xl text-gray-100 mb-6">
                        {contact.name}
                      </p>

                      {/* Phone Number - Prominent */}
                      <div className="mb-6">
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-2">
                          Phone
                        </p>
                        <a
                            href={`tel:${contact.phone}`}
                            className="font-display text-2xl text-rose hover:text-rose/80 transition block"
                        >
                          {localizedPhone(contact.phone)}
                        </a>
                      </div>

                      {/* CTA */}
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose/60 group-hover:text-rose transition">
                        Tap to call
                      </p>
                    </div>
                  </a>
              ))}
            </div>

            {/* SECTION 5: Wedding Message */}
            <div className="text-center py-12 border-t border-rose/20">
              <p className="font-display text-xl md:text-2xl text-gray-300 italic mb-4">
                We look forward to celebrating this special moment with you
              </p>
              <p className="text-xs text-gray-600 uppercase tracking-widest">
                Blessings & Love
              </p>
            </div>

          </div>
        </footer>

        <BottomNavigation translation={t} />
      </main>
  );
}
