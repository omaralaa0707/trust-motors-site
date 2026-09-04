"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useTrust } from "@/content/schema-ext";
import { FLEET, PROFILE, SHOPFRONT, type FleetCar, type SpecSource } from "@/content/media";
import { Fingerprint } from "@/components/webgl/fingerprint";

/* ---------------------------------------------------------------- motion -- */

function useOnScreen<T extends HTMLElement>(rootMargin = "-6% 0px -6% 0px") {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

const delayVar = (d: number) => ({ "--scan-delay": `${d}ms` }) as CSSProperties;

/** Tags that may only contain phrasing content, so the clipped wrapper has to
 *  stay a span for them and can be a div everywhere else. */
const PHRASING = new Set(["p", "h1", "h2", "h3", "h4", "span", "li", "figcaption", "dt", "dd"]);

/**
 * This site's arrival: the scan. A hard clip travels up the block with a bright
 * bar riding its edge, the way a reader confirms a surface rather than a fade
 * or a slide.
 *
 * `className` goes on the OUTER element — it carries the layout (grid sizing,
 * aspect ratio, borders) and it is the element the observer watches. Only the
 * inner wrapper is clipped: animating clip-path on the observed element
 * collapses its intersection rectangle to zero and the reveal never fires.
 */
function Scan({
  children,
  className,
  innerClassName,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useOnScreen<HTMLElement>();
  const C = Tag as unknown as (p: Record<string, unknown>) => ReactElement;
  const Inner = PHRASING.has(String(Tag)) ? "span" : "div";
  return (
    <C ref={ref} data-scan="" className={className} style={delayVar(delay)}>
      <span data-scan-bar="" aria-hidden="true" />
      <Inner data-scan-inner="" className={`block h-full ${innerClassName ?? ""}`}>
        {children}
      </Inner>
    </C>
  );
}

/* ------------------------------------------------------------------- mark -- */

/** Their seal, redrawn from the corner of their own Ciaz poster: a red rim, a
 *  black ring, a red inner rim, a white disc and a solid red T. Inline rather
 *  than an <img>, so it can be sized without a second network request. */
function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden focusable="false">
      <circle cx="50" cy="50" r="49" fill="#c21414" />
      <circle cx="50" cy="50" r="46" fill="#1b1a19" />
      <circle cx="50" cy="50" r="33.5" fill="#c21414" />
      <circle cx="50" cy="50" r="31" fill="#f4f3f0" />
      <path d="M21.6 33.8H78.4V58.6H63.5V79.8H36.5V58.6H21.6Z" fill="#c21414" />
    </svg>
  );
}

/* -------------------------------------------------------------------- nav -- */

export function Nav() {
  const c = useTrust();
  const { locale, toggleLocale } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ground-3 bg-ground/92 backdrop-blur-md">
      <div className="mx-auto flex h-[4.2rem] max-w-6xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <Seal className="h-7 w-7" />
          <span className="font-display text-[1.1rem] font-semibold text-ink">{c.brand.name}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {c.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="fine text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PROFILE.landlineHref}
            className="bidi tnum hidden text-[0.86rem] text-ink-2 transition-colors hover:text-ink sm:block"
          >
            {PROFILE.landline}
          </a>
          <button
            onClick={toggleLocale}
            className="label rounded-none border border-ink-2 px-2.5 py-1.5 transition-colors hover:border-ink hover:text-ink"
            aria-label={c.a11y.toggleLanguage}
          >
            {locale === "en" ? "ع" : "EN"}
          </button>
          <button
            className="border border-ink-2 p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? c.a11y.closeMenu : c.a11y.openMenu}
            aria-expanded={open}
          >
            <span className="block h-[1.5px] w-4 bg-ink" />
            <span className="mt-1 block h-[1.5px] w-4 bg-ink" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-ground-3 bg-ground px-5 py-3 md:hidden">
          {c.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-[0.92rem] text-ink-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------- hero -- */

function Hero() {
  const c = useTrust();
  return (
    <section id="top" className="relative pt-[4.2rem]">
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-16 lg:px-8 lg:pt-16 lg:pb-24">
        <Scan as="p" className="label">
          {c.hero.eyebrow}
        </Scan>
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.06fr_0.84fr] lg:gap-14">
          <div>
            <Scan
              as="h1"
              className="text-hero font-display max-w-[19ch] font-semibold text-ink"
              delay={60}
            >
              {c.hero.headline}
            </Scan>
            <Scan className="text-lead mt-7 max-w-[52ch] leading-[1.85] text-ink-2" delay={140}>
              {c.hero.sub}
            </Scan>
            <Scan
              className="mt-9"
              innerClassName="flex flex-wrap items-center gap-3"
              delay={220}
            >
              <a
                href={PROFILE.landlineHref}
                className="bg-ink px-6 py-3 text-[0.9rem] font-medium text-ground transition-opacity hover:opacity-85"
              >
                {c.hero.primaryCta}
              </a>
              <a
                href="#fleet"
                className="border border-ink-2 px-6 py-3 text-[0.9rem] text-ink transition-colors hover:border-ink"
              >
                {c.hero.secondaryCta}
              </a>
            </Scan>
          </div>
          <div>
            <Scan delay={100} className="relative aspect-square w-full">
              <Fingerprint className="h-full w-full" alt={c.hero.fingerprintAlt} />
            </Scan>
            <p className="fine mt-3 max-w-[46ch] text-ink-2">{c.hero.fingerprintCaption}</p>
          </div>
        </div>

        <Scan
          className="mt-14 border-t border-ground-3 pt-8"
          innerClassName="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
          delay={300}
        >
          {c.hero.counts.map((s) => (
            <div key={s.label}>
              <div className="font-display tnum text-[2.1rem] leading-none font-semibold text-ink">
                {s.value}
              </div>
              <div className="fine mt-2 text-ink-2">{s.label}</div>
            </div>
          ))}
        </Scan>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ fleet -- */

/** Red on this page never means "act" — it means "this is about how the thing
 *  was presented". So the tag marking a figure that only the poster artwork
 *  carries is red, and one the dealer actually typed is not. */
function SourceTag({ from, label }: { from: SpecSource; label: string }) {
  return (
    <span
      className={`shrink-0 border px-1.5 py-px text-[0.6rem] tracking-[0.1em] uppercase ${
        from === "poster" ? "border-red text-red" : "border-ground-3 text-ink-2"
      }`}
    >
      {label}
    </span>
  );
}

function Figures({ car }: { car: FleetCar }) {
  const c = useTrust();
  const copy = c.fleet.cars[car.id];
  return (
    <div className="mt-6 divide-y divide-ground-3 border-y border-ground-3">
      {copy.figures.map((row) => (
        <div
          key={row.label}
          className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 py-2.5"
        >
          <span className="fine text-ink-2">{c.fleet.specLabels[row.label]}</span>
          <span className="flex items-baseline gap-2.5">
            <span dir="auto" className="tnum text-[0.94rem] text-ink">
              {row.value}
            </span>
            <SourceTag from={row.from} label={c.fleet.sourceLabels[row.from]} />
          </span>
        </div>
      ))}
    </div>
  );
}

/** The caption exactly as posted. Its own right-aligned RTL island in both
 *  locales, with each line taking its direction from its own first strong
 *  character so a Latin model name and an Arabic hashtag line both hold. */
function Caption({ car }: { car: FleetCar }) {
  const c = useTrust();
  return (
    <div className="mt-8">
      <div className="label">{c.fleet.captionLabel}</div>
      <blockquote
        dir="rtl"
        className="arabic mt-2.5 border-s-2 border-ground-3 ps-4 text-[0.9rem] leading-[1.95] text-ink-2"
      >
        {car.caption.split("\n").map((line, i) => (
          <span key={i} className="quote-line">
            {line}
          </span>
        ))}
      </blockquote>
      <p className="fine mt-2.5 text-ink-2">
        {c.fleet.captionNote} <span dir="auto">@{car.handle}</span>
      </p>
    </div>
  );
}

function Copy({
  car,
  index,
  withCaption,
}: {
  car: FleetCar;
  index: number;
  withCaption: boolean;
}) {
  const c = useTrust();
  const copy = c.fleet.cars[car.id];
  return (
    <div>
      <div className="label">{String(index + 1).padStart(2, "0")}</div>
      <h3 className="latin font-display mt-2 text-[1.6rem] font-semibold text-ink">
        {`${car.marque} ${car.model} · ${car.year}`}
      </h3>
      <p className="fine mt-2 font-medium text-red">{copy.presentedAs}</p>
      <p className="mt-5 text-[0.94rem] leading-[1.8] text-ink-2">{copy.presentationNote}</p>

      <div className="label mt-8">{c.fleet.figuresLabel}</div>
      <Figures car={car} />

      {copy.priceNote && (
        <div className="mt-6 border border-ground-3 p-4">
          <div className="label">{c.fleet.priceLabel}</div>
          <p className="mt-2 text-[0.9rem] leading-[1.8] text-ink-2">{copy.priceNote}</p>
        </div>
      )}

      {copy.note && (
        <p className="fine mt-6 border-s-2 border-red ps-4 text-ink-2">{copy.note}</p>
      )}

      {withCaption && <Caption car={car} />}

      <a
        href={car.postUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="fine mt-6 inline-block text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
      >
        {c.fleet.viewPost}
      </a>
    </div>
  );
}

function Frame({
  src,
  alt,
  caption,
  eager,
}: {
  src: string;
  alt: string;
  caption: string;
  eager?: boolean;
}) {
  return (
    <figure>
      <div className="aspect-square overflow-hidden border border-ground-3 bg-ground-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading={eager ? "eager" : "lazy"}
        />
      </div>
      <figcaption className="fine mt-2.5 text-ink-2">{caption}</figcaption>
    </figure>
  );
}

/**
 * The two listings are laid out differently on purpose, because the difference
 * is the whole subject: the designed one gets a single dominant plate with its
 * raw source frame subordinate underneath, and the phone one gets two equal
 * frames side by side, the way a carousel of snapshots actually reads.
 */
function FleetEntry({ car, index }: { car: FleetCar; index: number }) {
  const c = useTrust();
  const copy = c.fleet.cars[car.id];
  const designed = car.frames.some((f) => f.kind === "poster");
  const alt = `${car.marque} ${car.model} ${car.year}`;

  return (
    <Scan
      as="article"
      className="border-t border-ground-3 pt-12 first:border-t-0 first:pt-0"
      delay={index * 60}
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {designed ? (
          <div>
            <Frame
              src={car.frames[0].src}
              alt={alt}
              caption={copy.frameCaptions[0]}
              eager={index === 0}
            />
            <div className="mt-7 sm:max-w-[56%]">
              <Frame src={car.frames[1].src} alt={alt} caption={copy.frameCaptions[1]} />
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
              {car.frames.map((f, i) => (
                <Frame key={f.src} src={f.src} alt={alt} caption={copy.frameCaptions[i]} />
              ))}
            </div>
            <Caption car={car} />
          </div>
        )}
        {/* The phone listing's words were typed onto the pictures themselves,
            so its caption sits with them. The designed listing's caption is a
            separate artefact from its artwork, so it sits with the reading of
            it — which also keeps the two columns from running to wildly
            different lengths. */}
        <Copy car={car} index={index} withCaption={designed} />
      </div>
    </Scan>
  );
}

function Fleet() {
  const c = useTrust();
  return (
    <section id="fleet" className="border-t border-ground-3 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Scan as="p" className="label">
          {c.fleet.eyebrow}
        </Scan>
        <Scan
          as="h2"
          className="text-display font-display mt-4 max-w-[24ch] font-semibold text-ink"
          delay={60}
        >
          {c.fleet.heading}
        </Scan>
        <Scan className="text-lead mt-5 max-w-[64ch] leading-[1.85] text-ink-2" delay={120}>
          {c.fleet.intro}
        </Scan>

        <div className="mt-14 space-y-14">
          {FLEET.map((car, i) => (
            <FleetEntry key={car.id} car={car} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- city -- */

function City() {
  const c = useTrust();
  return (
    <section id="city" className="border-t border-ground-3 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Scan as="p" className="label">
          {c.city.eyebrow}
        </Scan>
        <Scan
          as="h2"
          className="text-display font-display mt-4 max-w-[24ch] font-semibold text-ink"
          delay={60}
        >
          {c.city.heading}
        </Scan>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Scan as="figure" delay={120}>
            <div className="aspect-[2/1] overflow-hidden border border-ground-3 bg-ground-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SHOPFRONT}
                alt={c.city.signAlt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="fine mt-2.5 text-ink-2">{c.city.signCaption}</figcaption>
          </Scan>

          <Scan className="max-w-[54ch]" innerClassName="space-y-5" delay={180}>
            {c.city.body.map((p, i) => (
              <p key={i} className="text-[0.96rem] leading-[1.85] text-ink-2">
                {p}
              </p>
            ))}
          </Scan>
        </div>

        <Scan className="mt-12 border-t border-ground-3 pt-8" delay={240}>
          <div className="label">{c.city.signLabel}</div>
          <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.city.signLines.map((line) => (
              <div key={line.label}>
                <dt className="fine text-ink-2">{line.label}</dt>
                <dd className="bidi tnum mt-1 text-[0.95rem] text-ink">
                  {line.value}
                </dd>
              </div>
            ))}
          </dl>
        </Scan>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- contact -- */

function Contact() {
  const c = useTrust();
  return (
    <section id="contact" className="border-t border-ground-3 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Scan
          as="h2"
          className="text-display font-display max-w-[16ch] font-semibold text-ink"
        >
          {c.contact.heading}
        </Scan>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Scan delay={60}>
            <div className="label">{c.contact.addressLabel}</div>
            <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-2">{c.contact.address}</p>
            <a
              href={c.contact.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="fine mt-3 inline-block text-ink underline decoration-ink/40 underline-offset-4"
            >
              {c.contact.mapsLabel}
            </a>
          </Scan>

          <Scan delay={130}>
            <div className="label">{c.contact.landlineLabel}</div>
            <a
              href={PROFILE.landlineHref}
              className="bidi tnum mt-3 block text-[1.05rem] text-ink transition-opacity hover:opacity-75"
            >
              {PROFILE.landline}
            </a>
            <p className="fine mt-2 text-ink-2">{c.contact.landlineSource}</p>
          </Scan>

          <Scan delay={200}>
            <div className="label">{c.contact.partnersLabel}</div>
            <div className="mt-3 flex flex-col gap-3">
              {c.contact.partners.map((p) => (
                <a
                  key={p.phone}
                  href={`tel:+2${p.phone}`}
                  className="block transition-opacity hover:opacity-75"
                >
                  <span className="block text-[0.94rem] text-ink">{p.name}</span>
                  <span className="bidi tnum block text-[0.9rem] text-ink-2">
                    {p.phone}
                  </span>
                </a>
              ))}
            </div>
            <p className="fine mt-3 text-ink-2">{c.contact.partnersSource}</p>
          </Scan>

          <Scan delay={270}>
            <a
              href={PROFILE.landlineHref}
              className="inline-block bg-ink px-6 py-3 text-[0.9rem] font-medium text-ground transition-opacity hover:opacity-85"
            >
              {c.contact.cta}
            </a>
            <a
              href={c.contact.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="fine mt-4 block text-ink underline decoration-ink/40 underline-offset-4"
            >
              <span dir="auto">@{PROFILE.handle}</span>
            </a>
          </Scan>
        </div>

        <Scan className="mt-10 border-t border-ground-3 pt-6" delay={320}>
          <p className="fine max-w-[70ch] text-ink-2">{c.contact.note}</p>
        </Scan>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- footer -- */

export function Footer() {
  const c = useTrust();
  return (
    <footer className="border-t border-ground-3 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-start sm:justify-between lg:px-8">
        <div className="flex shrink-0 items-center gap-2.5">
          <Seal className="h-6 w-6" />
          <span className="font-display text-[0.95rem] font-semibold text-ink">
            {c.brand.name}
          </span>
        </div>
        <p className="fine max-w-[56ch] text-ink-2">{c.footer.disclaimer}</p>
        <p className="fine shrink-0 text-ink-2">{c.footer.rights}</p>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------------- sections -- */

export function Sections() {
  return (
    <main>
      <Hero />
      <Fleet />
      <City />
      <Contact />
    </main>
  );
}
