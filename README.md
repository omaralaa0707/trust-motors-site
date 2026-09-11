# Trust Motors — site 29 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with Trust Motors, and not an official site.**

- **Live:** https://trust-motors-site.vercel.app
- **Repo:** [trust-motors-site](https://github.com/omaralaa0707/trust-motors-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: Document white #F4F3F0 over ink #1B1A19, with their circular seal's own red #C21414 — and red is never an action colour here: every button is ink, and red marks only *presentation* (the seal, the scan bar, the line naming how a listing was published, the tag on a figure that lives only in the artwork)

**Type pairing**
: EB Garamond + Nunito Sans / Lateef + Readex Pro (AR)

**3D / signature technique**
: **The print**: a fingerprint whorl built as displaced `PlaneGeometry` from a closed-form phase `k·r + θ` — winding number exactly 1, so the `atan2` branch cut cancels and the field is seamless — on a matte ink platen framed by its own bezel, swept once a cycle by a red scanning bar that a pointer entering the plate re-arms. Sourced: the Ciaz's advertised top trim is literally called بصمة, a fingerprint

**Motion language**
: The scan — a hard `clip-path` reveal travelling up the block with a red bar riding the reveal edge, the way a reader confirms a surface rather than fading or sliding it in

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/trustmotorscars/

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
