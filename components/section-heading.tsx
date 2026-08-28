import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, children, inverse = false }: { eyebrow: string; title: string; children?: ReactNode; inverse?: boolean }) {
  return (
    <div className="text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-2 font-display text-3xl leading-tight sm:text-4xl ${inverse ? "text-[#fffaf4]" : "text-ink"}`}>{title}</h2>
      {children}
    </div>
  );
}
