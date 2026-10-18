# Sam Zenaldeen Gentlemen's Grooming: demo site

A speculative redesign for Sam Zenaldeen Gentlemen's Grooming, 119 Sheen Lane, East Sheen, London SW14 8AE, built to show Sam.

It is a front-end demo on static data. There is no CMS, database, payment system or booking backend, so the booking form only shows a confirmation. The WhatsApp and call links are real.

Live: https://alexwilder-dev.github.io/sam-zenaldeen/

## What's in it

- **His room, first.** The opening screen is the owner's panorama of the salon. On a phone you swipe it sideways, with native scrolling, to look round, and points on the mirrors, basins, chairs, Sam and the bench name what you're looking at. Under it: whether the salon is open right now (London time), what a Wash Cut & Finish costs, and request / call / WhatsApp.
- **The ticket.** Tap prices and a paper ticket adds up. When the choice matches a package, Father & Son or a five-visit bundle, it offers the switch and a red "Saved £x" stamp lands on the ticket. Savings are worked out from list prices. Then pick a day and a time inside opening hours and get a confirmation, with a prefilled WhatsApp message one tap away.
- **The misted mirror.** The hot towel shave in the salon's own three steps, beside a walnut mirror that steams up when it comes into view. A cut-throat razor takes one stroke through the mist to show the price, and you can wipe the glass yourself.
- Packages as paper passes, Sam's story with his portrait, credited Google reviews, hours, and the walk from Mortlake station drawn onto a to-scale sketch of Sheen Lane.
- Built to be quick on a phone: no scroll-jacking, no intro, and nothing animating while idle. Motion is reduced when the device asks for it.

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
