/**
 * Only two of Trust Motors' 47 posts render without a session — the thinnest
 * yield sourced for this series, thinner even than accounts with far fewer
 * total posts. Re-verified against the logged-out embed route before this
 * build: `a[href*="/p/"]` on the profile returns exactly two codes, and
 * scrolling reveals no more.
 *
 * What is there is unusually legible, because the two posts are presented in
 * completely different registers. The dealer's own Ciaz post is a carousel of
 * two frames: a fully designed poster, and the raw photograph from the shoot
 * behind it, lighting stand still standing. The Sportage post is two phone
 * photos with a caption bubble typed straight onto the image — and it was
 * posted by a different account entirely.
 */

export type FleetId = "ciaz" | "sportage";

/** Which artefact published a figure — the dealer's typed caption, or the
 *  designed poster artwork. The split is the whole point of this page. */
export type SpecSource = "caption" | "poster";

export type Frame = {
  src: string;
  /** `poster` is designed collateral; `photo` is a camera frame. */
  kind: "poster" | "photo";
};

export type FleetCar = {
  id: FleetId;
  marque: string;
  model: string;
  year: string;
  frames: Frame[];
  /** The post's caption exactly as published, newlines and all. */
  caption: string;
  /** The account the post was published from. */
  handle: string;
  postUrl: string;
  /** Set when the post did not come from the dealer's own account. */
  thirdParty?: boolean;
};

const post = (code: string) => `https://www.instagram.com/p/${code}/`;

export const FLEET: FleetCar[] = [
  {
    id: "ciaz",
    marque: "Suzuki",
    model: "Ciaz",
    year: "2022",
    frames: [
      { src: "/media/ciaz-1.jpg", kind: "poster" },
      { src: "/media/ciaz-2.jpg", kind: "photo" },
    ],
    caption:
      "Suzuki Ciaz 2022\nاعلي فئه بصمه\nفابريكا بالكامل\nعداد ٧٤ الف كيلو\nصيانات توكيل\nللاتسفسار 01144606008\n#SuzukiCiaz #suzuki #سيارات_للبيع",
    handle: "trustmotorscars",
    postUrl: post("DcQ1JevjHZZ"),
  },
  {
    id: "sportage",
    marque: "Kia",
    model: "Sportage",
    year: "2020",
    frames: [
      { src: "/media/sportage-1.jpg", kind: "photo" },
      { src: "/media/sportage-2.jpg", kind: "photo" },
    ],
    caption:
      "Kia Sportage 2020\nاعلي فئه\nفابريكا بالكامل\nصيانات توكيل\n٨٤ الف كيلو\nرخصه سنتين\nللتواصل 01144606008\n#kiq #kiasportage #سيارات_للبيع #trust_motors",
    handle: "megaheeed",
    postUrl: post("DcOCOxNiNr-"),
    thirdParty: true,
  },
];

/** A crop of their own shopfront out of the Sportage post — the only picture
 *  of the premises either post contains, and the only place the landline and
 *  the trade line appear at all. */
export const SHOPFRONT = "/media/shopfront.jpg";

export const PROFILE = {
  instagram: "https://www.instagram.com/trustmotorscars/",
  handle: "trustmotorscars",
  /** Their own display name, spelled exactly as the account sets it. */
  displayName: "Trust Motors Cars Partion",
  maps: "https://maps.app.goo.gl/9yGoPQcoCmCug9gF8",
  /** On the sign and on the poster's seal. Never in the bio. */
  landline: "03/4282000",
  landlineHref: "tel:+20034282000",
  /** In the bio. Only the second of the two appears in either caption. */
  partner1: { phone: "01223240801" },
  partner2: { phone: "01144606008" },
  followers: "807",
  posts: "47",
  postsSourced: "2",
} as const;
