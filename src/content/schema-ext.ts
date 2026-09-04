import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";
import type { FleetId, SpecSource } from "./media";

export type SpecLabel =
  | "trim"
  | "mileage"
  | "paint"
  | "maintenance"
  | "license"
  | "engine"
  | "transmission"
  | "keyless";

export type SpecRow = {
  /** A lookup key, never display text — routed through `specLabels`. */
  label: SpecLabel;
  value: string;
  /** Which of the post's two artefacts actually published this figure. */
  from: SpecSource;
};

export type FleetCopy = {
  /** One line naming the register the listing was published in. */
  presentedAs: string;
  /** How that register works, in the dealer's own material. */
  presentationNote: string;
  /** Index-matched to the car's frames in `media.ts`. */
  frameCaptions: string[];
  figures: SpecRow[];
  /** What the artwork says about price, where it says anything at all. */
  priceNote?: string;
  /** Provenance caveat: who actually posted it. */
  note?: string;
};

/**
 * Trust Motors is the smallest source in this series by usable posts — two of
 * forty-seven — and the two that survive were published in completely
 * different registers. One is a designed dealer poster carrying figures the
 * typed caption never mentions; the other is a phone photo with a caption
 * bubble, posted from someone else's account. The shared schema has no
 * vocabulary for a per-figure source, a per-frame caption, or the trim name
 * ("بصمة" — fingerprint) that this page's signature piece is built on.
 */
export type TrustContent = SiteContent & {
  hero: SiteContent["hero"] & {
    fingerprintAlt: string;
    /** Why there is a fingerprint on the page at all, said on the page. */
    fingerprintCaption: string;
    /** Small figures under the hero copy: sourced / published / followers. */
    counts: { value: string; label: string }[];
  };
  fleet: {
    eyebrow: string;
    heading: string;
    intro: string;
    figuresLabel: string;
    captionLabel: string;
    captionNote: string;
    priceLabel: string;
    viewPost: string;
    specLabels: Record<SpecLabel, string>;
    sourceLabels: Record<SpecSource, string>;
    cars: Record<FleetId, FleetCopy>;
  };
  city: {
    eyebrow: string;
    heading: string;
    body: string[];
    signAlt: string;
    signCaption: string;
    signLabel: string;
    signLines: { label: string; value: string }[];
  };
  contact: SiteContent["contact"] & {
    landlineLabel: string;
    landlineSource: string;
    partnersLabel: string;
    partnersSource: string;
    partners: { name: string; phone: string }[];
    mapsLabel: string;
    note: string;
  };
};

export function useTrust() {
  return useContent() as TrustContent;
}
