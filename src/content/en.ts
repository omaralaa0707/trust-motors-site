import type { TrustContent } from "./schema-ext";
import { PROFILE } from "./media";

export const en: TrustContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "Trust Motors",
    shortName: "TM",
    tagline: "Trust Motors · Alexandria",
  },

  nav: [
    { label: "The two posts", href: "#fleet" },
    { label: "The shop", href: "#city" },
    { label: "Visit", href: "#contact" },
  ],

  hero: {
    eyebrow: "Ibrahimiya · Alexandria",
    headline: "Two posts, two ways of selling a car",
    sub: "Forty-seven posts; two of them render without a session. One is the dealer's own — a fully designed poster, with the raw photograph from the shoot sitting right behind it in the same carousel. The other is two phone frames with a caption bubble typed onto the image, posted from a different account and tagged #trust_motors. Between them they publish twelve figures and no price.",
    primaryCta: "Call the shop",
    secondaryCta: "Read both posts",
    fingerprintAlt:
      "A fingerprint ridge field built as displaced 3D geometry and swept once by a red scanning bar — taken from the Suzuki Ciaz's own advertised keyless trim, which Trust Motors name in Arabic as بصمة, a fingerprint.",
    fingerprintCaption:
      "The Ciaz's top trim is named بصمة — fingerprint — after its keyless entry, and the dealer is named Trust. So: a real ridge field, displaced into geometry rather than drawn, scanned once a cycle.",
    counts: [
      { value: PROFILE.posts, label: "posts published" },
      { value: PROFILE.postsSourced, label: "render logged out" },
      { value: "12", label: "figures published" },
      { value: "0", label: "prices published" },
    ],
  },

  about: { heading: "Trust Motors", body: [] },
  services: { heading: "The two posts", items: [] },
  gallery: { heading: "The two posts", items: [] },

  fleet: {
    eyebrow: "The two posts",
    heading: "Every figure they publish, and where it actually appears",
    intro:
      "Every row carries a tag. \"Caption\" means the dealer typed it. \"Poster only\" means the figure appears nowhere in their words at all — it exists solely inside the artwork. The Sportage post has no artwork, which is why every row on it carries the same tag. Nothing is carried between the two listings.",
    figuresLabel: "Published figures",
    captionLabel: "The caption, verbatim",
    captionNote: "Reproduced exactly as posted.",
    priceLabel: "On price",
    viewPost: "Open the post on Instagram",
    specLabels: {
      trim: "Trim",
      mileage: "Mileage",
      paint: "Paint",
      maintenance: "Servicing",
      license: "Licence",
      engine: "Engine",
      transmission: "Transmission",
      keyless: "Entry",
    },
    sourceLabels: {
      caption: "caption",
      poster: "poster only",
    },
    cars: {
      ciaz: {
        presentedAs: "Published as designed collateral",
        presentationNote:
          "One flattened square carrying their registered circular seal, a composited sky, a red checklist, a three-icon specification strip, a price line with no price in it, and an address bar along the bottom set with their own line — ثقتك … أولويتنا, your trust, our priority. The second frame in the same carousel is a plain photograph of the same car on the road at sunset, with the shoot's own lighting stand still standing at the kerb.",
        frameCaptions: [
          "The poster as published, uncropped.",
          "Second frame, same post: the same car at sunset, lighting stand still at the kerb.",
        ],
        figures: [
          { label: "trim", value: "Top trim — بصمة (fingerprint)", from: "caption" },
          { label: "paint", value: "Fully original factory paint", from: "caption" },
          { label: "mileage", value: "74,000 km", from: "caption" },
          { label: "maintenance", value: "Agency-serviced", from: "caption" },
          { label: "engine", value: "1600 cc, Japanese-built", from: "poster" },
          { label: "transmission", value: "Automatic", from: "poster" },
          { label: "keyless", value: "Fingerprint start, smart entry", from: "poster" },
        ],
        priceNote:
          "The poster's only line on price is السعر مناسب جدا — the price is very reasonable — set over فرصة لا تعوض, an opportunity that will not come again. No figure appears anywhere in the artwork or in the caption.",
      },
      sportage: {
        presentedAs: "Published as a phone photo",
        presentationNote:
          "Two frames straight off a phone, each with a white caption bubble typed onto the image — فابريكا بالكامل on one, the model and trim on the other. No template, no seal, no specification strip. The first frame is also the only picture of the shop itself in either post.",
        frameCaptions: [
          "Parked outside their own shopfront, caption bubble typed onto the image.",
          "Front three-quarter on the same street, second caption bubble.",
        ],
        figures: [
          { label: "trim", value: "Top trim", from: "caption" },
          { label: "paint", value: "Fully original factory paint", from: "caption" },
          { label: "maintenance", value: "Agency-serviced", from: "caption" },
          { label: "mileage", value: "84,000 km", from: "caption" },
          { label: "license", value: "Two years' licence", from: "caption" },
        ],
        note: "Posted by a third account, @megaheeed, and tagged #trust_motors — not published from the dealer's own account. The number in the caption is the dealer's own.",
      },
    },
  },

  city: {
    eyebrow: "Alexandria",
    heading: "The first Alexandria dealer in this series",
    body: [
      "Every dealership built before this one trades from Greater Cairo — Cairo on one bank of the Nile, Giza on the other. Trust Motors is the first from Alexandria, working a single storefront on a residential street in Ibrahimiya, across from the Fathallah supermarket's Riviera branch.",
      "That storefront appears exactly once across the two posts that render, in the corner of a photograph posted from someone else's account. It is also the only place two of their published facts appear at all: the landline, and the line describing what the business actually does.",
    ],
    signAlt:
      "Trust Motors' shopfront in Ibrahimiya: red channel letters reading TRUST MOTORS on a grey fascia, a circular seal at the left edge, the landline beside it, and an Arabic trade line beneath.",
    signCaption:
      "Their shopfront, cropped from the first frame of the Sportage post. A passer-by's face has been blurred.",
    signLabel: "What the sign publishes",
    signLines: [
      { label: "Name", value: "TRUST MOTORS" },
      { label: "Trade", value: "Sale · Purchase · Consignment trade-in" },
      { label: "Landline", value: PROFILE.landline },
      { label: "Seal", value: "TRUST MOTORS · ALEXANDRIA · 03/4282000" },
    ],
  },

  contact: {
    heading: "Visit",
    addressLabel: "Address",
    address: "Ibrahimiya, opposite Fathallah Riviera, Alexandria",
    landlineLabel: "Shop landline",
    landlineSource: "On the sign and on the poster's seal. Never in the bio.",
    partnersLabel: "Direct lines",
    partnersSource: "Published in the bio.",
    partners: [
      { name: "Eng. Essam", phone: PROFILE.partner1.phone },
      { name: "Eng. Mohamed", phone: PROFILE.partner2.phone },
    ],
    phoneLabel: "Phone",
    phones: [PROFILE.partner1.phone, PROFILE.partner2.phone],
    mapsUrl: PROFILE.maps,
    mapsLabel: "Google Maps",
    instagramUrl: PROFILE.instagram,
    note: "Both posts give only one of the two mobiles — 01144606008 — including the one published from a different account.",
    cta: "Call the shop",
  },

  footer: {
    rights: "© Trust Motors. All rights reserved.",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
