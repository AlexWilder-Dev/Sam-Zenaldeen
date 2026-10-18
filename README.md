# Sam Zenaldeen Gentlemen's Grooming: demo site

A speculative redesign for Sam Zenaldeen Gentlemen's Grooming, 119 Sheen Lane, East Sheen, London SW14 8AE, built to show Sam.

It is a front-end demo on static data. There is no CMS, database, payment system or booking backend, so the booking form only shows a confirmation. The WhatsApp and call links are real.

Live: https://alexwilder-dev.github.io/sam-zenaldeen/

## What's in it

- **Walk in off Sheen Lane.** The first screen is the shopfront as it stands: brick, the green fascia with the gold SZ mark, the phone number on the left and the web address on the right, both windows lit, and the door. The door's glass shows whether the salon is open right now (London time), what a Wash Cut & Finish costs, and how to book. Scroll and the door swings open, the camera goes through it, and the owner's panorama of the room pans past with captions: the walnut mirrors, the basins, the red leather chairs, Sam, the red bench.
- **The steamed mirror.** The hot towel shave in the salon's own three steps. Steam fogs a walnut-framed mirror, a cut-throat razor wipes a clean line through it, and facial-massage circles clear it to reveal the price. You can wipe the glass with a finger or the mouse, and it mists over again.
- **The ticket.** Tap prices and a paper ticket adds up. When the choice matches a package, Father & Son or a five-visit bundle, it offers the switch, and a red "Saved £x" stamp lands on the ticket. Savings are worked out from list prices. Then you pick a day and a time inside opening hours and get a confirmation, with a prefilled WhatsApp message one tap away.
- The salon's way of working, lit up word by word as you scroll. Packages as paper passes. Sam's story with his portrait in a walnut frame whose lamp switches on. Google reviews with a rolling marquee of what reviewers mention. Hours, and the walk from Mortlake station drawn onto a to-scale sketch of Sheen Lane.
- Smooth scrolling and a brass cursor on desktop. Everything falls back to a still version when the device asks for reduced motion.

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
