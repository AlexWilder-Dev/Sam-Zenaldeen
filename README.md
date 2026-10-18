# Sam Zenaldeen Gentlemen's Grooming: demo site

A speculative redesign for Sam Zenaldeen Gentlemen's Grooming, 119 Sheen Lane, East Sheen, London SW14 8AE, built to show Sam.

It is a front-end demo on static data. There is no CMS, database, payment system or booking backend, so the booking form only shows a confirmation. The WhatsApp and call links are real.

Live: https://alexwilder-dev.github.io/sam-zenaldeen/

## What's in it

- **The shopfront as the first screen.** The green fascia with the gold SZ mark, the phone number on the left and the web address on the right, as painted on Sheen Lane. Under it, the "door" shows whether the salon is open right now (London time), what a Wash Cut & Finish costs, and how to book.
- **Your visit.** Tap services in the price list and a running total appears. When the choice matches one of the salon's packages, Father & Son, or a five-visit bundle, the tray offers it and shows the saving against list prices. From there you choose a day and a time inside opening hours, add your details, and get a confirmation. A prefilled WhatsApp message is always one tap away.
- **The hot towel shave**, told in the salon's own three steps as you scroll: hot towel, traditional shave, facial massage.
- Packages and five-visit bundles, Sam's story with his portrait, the team, Google reviews (credited), hours with a live status, and a to-scale sketch of Sheen Lane with a directions link.

## Where the content lives

Everything the site states about the salon (services, prices, hours, contact details, reviews, story) is in [`src/data/salon.ts`](src/data/salon.ts). Sources and research are in [`research/notes.md`](research/notes.md).

## Develop

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check and build to dist/
npm run images    # one-off: resize the salon's photos and logo from research/images
npm run og        # one-off: build public/og.jpg (1200x630 link preview)
```

The site deploys to GitHub Pages through `.github/workflows/deploy.yml` on every push to `main`. Under Settings → Pages, set the source to "GitHub Actions".

The base path is `/sam-zenaldeen/`. GitHub Pages paths are case-sensitive, so the repository name must be `sam-zenaldeen` (lowercase) for that URL and the link-preview image to resolve.

Site by AlexWilder-Dev.
