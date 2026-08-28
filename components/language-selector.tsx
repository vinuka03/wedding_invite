import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

const choices = [
  { locale: "en", title: "English", description: "Continue in English" },
  { locale: "si", title: "සිංහල", description: "සිංහලෙන් ඉදිරියට යන්න" },
] as const;

export function LanguageSelector() {
  return (
    <main className="min-h-dvh overflow-hidden bg-champagne px-5 py-8 text-ink sm:flex sm:items-center sm:justify-center sm:py-12">
      <div className="relative mx-auto flex w-full max-w-md flex-col items-center rounded-[2rem] border border-line/80 bg-[#fff8eb] px-6 py-14 text-center shadow-[0_20px_70px_rgba(77,58,43,0.09)] sm:px-12">
        <span className="absolute left-4 top-4 size-8 rounded-tl-2xl border-l border-t border-rose/50" aria-hidden="true" />
        <span className="absolute bottom-4 right-4 size-8 rounded-br-2xl border-b border-r border-rose/50" aria-hidden="true" />
        <Heart className="mb-6 size-5 fill-rose text-rose" aria-hidden="true" />
        <p className="eyebrow">Kavindi &amp; Gamindu</p>
        <h1 className="mt-3 font-display text-4xl leading-tight">Choose your language</h1>
        <p className="mt-3 max-w-xs text-sm leading-6 text-ink/65">Welcome to Kavindi &amp; Gamindu&apos;s wedding invitation.</p>
        <nav className="mt-10 grid w-full gap-3" aria-label="Select invitation language">
          {choices.map((choice) => (
            <Link key={choice.locale} href={`/${choice.locale}`} className="group flex items-center justify-between rounded-xl border border-line bg-white px-5 py-4 text-left transition hover:border-rose hover:bg-rose/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2">
              <span>
                <span className="block font-display text-2xl">{choice.title}</span>
                <span className="mt-1 block text-xs text-ink/60">{choice.description}</span>
              </span>
              <ArrowRight className="size-5 text-rose transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
