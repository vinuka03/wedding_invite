import { weddingDetails } from "@/data/wedding";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function toICSDate(d: Date): string {
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

const YEAR = 2026;
const MONTH = 10;
const DAY = 19;

const eventStart = new Date(YEAR, MONTH, DAY, 9, 0, 0);
const eventEnd = new Date(YEAR, MONTH, DAY, 14, 0, 0);

export function googleCalendarUrl(title: string, description: string): string {
  const start = toICSDate(eventStart);
  const end = toICSDate(eventEnd);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description,
    location: weddingDetails.venueUrl,
    dates: `${start}/${end}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadICS(title: string, description: string): void {
  const start = toICSDate(eventStart);
  const end = toICSDate(eventEnd);
  const now = toICSDate(new Date());

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kavindi Gamindu Wedding//Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@kavindi-gamindu-wedding`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${weddingDetails.venueUrl}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${title}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "kavindi-gamindu-wedding.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
