import type { Metadata } from "next";
import { EB_Garamond, Nunito_Sans, Lateef, Readex_Pro } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// A certificate-weight serif, echoing the formality of their own circular
// seal, paired with a plain humanist sans for the spec sheets.
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-eb-garamond",
});
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito-sans",
});
const lateef = Lateef({
  subsets: ["arabic"],
  weight: ["700", "800"],
  variable: "--font-lateef",
});
const readexPro = Readex_Pro({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-readex-pro",
});

export const metadata: Metadata = {
  title: "Trust Motors — two posts, two ways of selling a car | Ibrahimiya, Alexandria",
  description:
    "The only two of Trust Motors' 47 posts that render logged out: a fully designed dealer poster, and two phone photos posted from someone else's account. Twelve published figures and no price.",
  metadataBase: new URL("https://trust-motors-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "Trust Motors — two posts, two ways of selling a car",
    description: "The first Alexandria dealer sourced for this series, built from the thinnest Instagram yet — two posts out of forty-seven.",
    locale: "en_US",
    type: "website",
  },
  other: { "theme-color": "#f4f3f0" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the page ships hand-written Arabic and English copy,
    // and Chrome's auto-translate rewrites `lang`, which would also break
    // every [dir="rtl"] correction if the CSS were keyed off language.
    <html
      lang="en"
      dir="ltr"
      translate="no"
      className={`notranslate ${ebGaramond.variable} ${nunitoSans.variable} ${lateef.variable} ${readexPro.variable}`}
    >
      <body className="bg-ground text-ink antialiased">
        {/* Content is verified into place under an intersection observer,
            so without scripting every block would stay invisible. */}
        <noscript>
          <style>{`[data-scan-inner]{clip-path:none!important;animation:none!important}[data-scan-bar]{display:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="en">
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
