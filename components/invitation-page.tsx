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
    { time: weddingDetails.endingTime, title: t.ending },
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
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="font-display text-lg tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-4">K &amp; G</Link>
        <Link href={`/${alternateLocale}`} className="rounded-full border border-line px-3.5 py-2 text-xs font-medium tracking-wide text-ink/75 transition hover:border-rose hover:text-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2">
          {t.languageSwitch}
        </Link>
      </header>

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
            <ol className="mx-auto mt-11 max-w-xl divide-y divide-line border-y border-line">
              {schedule.map((event) => (
                <li key={event.time} className="grid grid-cols-[6.5rem_1fr] gap-5 py-6 sm:grid-cols-[8rem_1fr] sm:gap-8">
                  <time className="font-display text-2xl text-rose sm:text-3xl">{event.time}</time>
                  <p className="self-center text-base font-medium leading-snug">{event.title}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section id="venue" className="scroll-mt-4 bg-[#493b32] px-5 py-12 text-[#fffaf4] sm:px-8 sm:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow={t.venueEyebrow} title={t.venueTitle} inverse />
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#fffaf4]/75">{t.venueCopy}</p>
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

        <div>
          <div className="mx-auto max-w-3xl pt-10">
            <Reveal>
              <SectionHeading eyebrow={t.contactsEyebrow} title={t.contactsTitle} />
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {contacts.map((contact) => (
                    <a key={contact.phone} href={`tel:${contact.phone}`} className="group rounded-2xl border border-line p-5 transition hover:border-rose hover:bg-rose/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2">
                      <Phone className="size-5 text-rose" aria-hidden="true" />
                      <p className="mt-5 font-display text-2xl">{contact.name}</p>
                      <p className="mt-1 text-sm text-ink/65">{localizedPhone(contact.phone)}</p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-rose">{t.call} {contact.name}</p>
                    </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="px-5 py-10 text-center sm:px-8">
        <Heart className="mx-auto size-4 fill-rose text-rose" aria-hidden="true" />
        <p className="mt-3 font-display text-lg">{t.footer}</p>
      </footer>
      <BottomNavigation translation={t} />
    </main>
  );
}
