# Sam Zenaldeen Gentlemen's Grooming: demo site

A speculative redesign for Sam Zenaldeen Gentlemen's Grooming, 119 Sheen Lane, East Sheen, London SW14 8AE, built to show Sam.

It is a front-end demo on static data. There is no CMS, database, payment system or booking backend, so the booking form only shows a confirmation. The WhatsApp and call links are real.

Live: https://alexwilder-dev.github.io/sam-zenaldeen/

## What's in it

- **His room, in ink.** The opening screen is a line drawing of the salon made from the owner's panorama: the mirrors, basins, barber chairs, pendant lamps, reception counter with the hot towels, and the buttoned bench. The lamps are on while the salon is open (London time) and off when it's shut. Press a chair, a basin, the towels or the bench to see that service's price and add it. Beside it: whether it's open right now, what a Wash Cut & Finish costs, and book / call / WhatsApp.
- **Your visit.** Tap prices and the visit adds up. When the choice matches a package, Father & Son or a five-visit bundle, it offers the switch and shows what you save, worked out from list prices. Then pick a day and a time inside opening hours and get a confirmation, with a prefilled WhatsApp message one tap away.
- **The misted mirror.** The hot towel shave in the salon's own three steps, beside a mirror that steams up when it comes into view. A razor takes one stroke through the mist, and you can wipe the glass yourself.
- Packages as a plain table of what you'd pay separately and what you save, Sam's story, credited Google reviews, the hours, and the shopfront drawn with its green fascia beside a to-scale sketch of Sheen Lane.
- Bone paper, black ink and the salon's own green, used sparingly. Instrument Serif and Instrument Sans.
- Quick on a phone: no scroll-jacking, no intro, one small photo, and nothing animating while idle. Motion is reduced when the device asks for it.

## Where the content lives

Everything the site states about the salon (services, prices, hours, contact details, reviews, story) is in [`src/data/salon.ts`](src/data/salon.ts). Sources and research are in [`research/notes.md`](research/notes.md).

## Develop

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check and build to dist/
npm run images    # one-off: resize Sam's portrait and the logo mark from research/images
npm run og        # one-off: build public/og.jpg (1200x630 link preview) with headless Chromium
```

The site deploys to GitHub Pages through `.github/workflows/deploy.yml` on every push to `main` or the working branch. Under Settings → Pages, set the source to "GitHub Actions".

The base path is `/sam-zenaldeen/`. GitHub Pages paths are case-sensitive, so the repository name must be `sam-zenaldeen` (lowercase) for that URL and the link-preview image to resolve.

Site by AlexWilder-Dev.
