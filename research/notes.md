# Sam Zenaldeen Gentlemen's Grooming: research notes

Compiled 18 October 2026. Every claim on the demo site traces back to something below.

## Is it still trading?

Yes.
- Google Maps listing "Sam Zenaldeen Gentlemen`s Grooming", 119 Sheen Ln, London SW14 8AE, category "Barber shop". Rating **4.8 from 200 reviews**. The newest reviews are about 4 and 6 months old (roughly June and April 2026). The listing showed "Open · Closes 5 PM" on Sunday 18 October 2026.
- The owner has claimed the listing: it shows "Sam Zenaldeen Gentlemen`s Grooming (Owner)", and owner photo uploads date from January 2018.
- samzenaldeen.co.uk still loads, with © 2026 in the footer.

## Sources checked

| Source | What it gave | Status |
|---|---|---|
| samzenaldeen.co.uk (home, /services/barbering, /beards, /shaving, /grooming-packages, /bookings) | Story, team text, current prices, contact details, logo, icons, palette, font | Read |
| Google Maps place (place id ChIJ6_eL744OdkgR1UCOFmI5pkE) | Rating, review count, hours, 5 full reviews, 3 review snippets, review topics, 8 photos, accessibility attribute, reviewer price range | Read from Maps' own data endpoints |
| Fresha `/lvp/sam-zenaldeen-gentlemens-grooming-sheen-lane-WqoLKX` | Hours (same as Google), phone | Read. This is an unclaimed "lite" page with a stock placeholder image, no menu, no reviews and no real online booking. |
| VisitRichmond | Interior photo (the panorama; Google holds the same shot at higher resolution) | Image only. I couldn't find or fetch the listing page itself. |
| Yell | n/a | 403 to automated fetch |
| Instagram / Facebook | None found. The site links none, the Google listing links none, and searches turn nothing up. Instagram rate-limited the fetch (429). | Not found |
| Treatwell / Booksy | No listing found | Not found |
| OpenStreetMap / Nominatim | Coordinates of the shop, Mortlake station and the Sheen Lane segments | Read |

Team members: **no source names anyone other than Sam.** The Google reviews talk about "Sam" and "these guys". The site's Team section names nobody, so the demo names nobody.

## The room

From the owner's 2018 panorama (Google / VisitRichmond), the owner's chair photo, and the corner and front photos:

- **Walnut-framed mirrors** run the full left wall, one per station, each with a small brass lamp on the frame. Under each mirror there is a **white ceramic backwash basin with ribbed sides**, set into dark wood cabinets with brass knobs and **black granite worktops**.
- **Red leather barber chairs** with chrome bases and white piping: a strong lipstick red (sampled at about #90282F).
- **A long red buttoned (chesterfield-style) bench** down the right-hand wall for waiting. It is darker in shadow (about #55151D).
- **Dark wood plank floor** and **white panelled walls with wainscoting**, cornicing, recessed downlights, and **steel industrial pendant lamps** on twisted flex.
- A **reception counter** in the same walnut with a granite top. Fresh flowers in a vase (orange and red) on the counter and in the window.
- Antler coat hooks, a bentwood hat stand, and a fox-head coat hook by the window.
- By the window: a stack of magazines (Q, Rugby World, Golf).
- One corner has glass shelves with bottles. In one photo it is dressed for Halloween with cobwebs and a mask, so they do seasonal touches.
- Light: warm tungsten from the mirror lamps and pendants, set against cool white walls. At night the shop glows amber through the windows.

**Sam in the photos:** a full beard, navy waistcoat over a pale shirt (navy waistcoat, white shirt and tie in his portrait). In a customer photo from about 2022 he wears a blue polo while cutting a boy's hair.

## The shop front (owner photo)

- A **deep bottle-green painted shopfront**: fascia, pilasters, stall risers and a half-glazed door all in the same green, under London stock brick.
- **The fascia carries the gold square SZ mark**, then "SAM ZENALDEEN / GENTLEMEN'S GROOMING" in gold. **"020 8392 2954" is painted at the far left** and **"samzenaldeen.co.uk" at the far right.**
- Two large windows show the lit interior: the mirror lamps on the left and the red bench and flowers on the right. A Christmas tree stands in the doorway in the owner's photo.
- **The sign spells it "ZENALDEEN"**, so I use "Zenaldeen" throughout. The "Zeneldeen" spelling appears only in old image filenames.

## Brand assets (downloaded to research/images/)

- `SamZeneldeen-HG.png`: the full logo. A square green panel with a gold frame. Inside, a **high-contrast serif S in gold** interlocks with a **serif Z in white**. Underneath, "SAM ZENALDEEN" in thin, tall gold capitals and "GENTLEMEN'S GROOMING" in wide-tracked capitals.
- `Logo-green.jpg` (200×200), `Favicon-green.jpg` (64×64): the square mark alone.
- Site CSS colours: **#003426** (deep green) and **#BE9F4A** (gold). The shopfront paint matches the green.
- Site font: **Arimo** (a Divi default, not a brand choice).
- Service icons, flat clip-art in black, green or green-and-gold: a cut-throat razor (shaving), a barber pole (barbering), scissors (filed as "Manicure.png" but used for beards), an "X" monogram with scissors, razor, comb and moustache (packages), and a moustache divider.
- Banner photos on the current site (`SZ-barbers-header-green.jpg`, `Beard-trim-green.jpg`, `Barber-tools.jpg`, `Barbering-shave.jpg`, `Barbering-1.jpg`, `Beards.jpg`, `Packages.jpg`, `Shaving3.jpg`) are **all stock**: a barber pole, a tattooed arm trimming a beard, a shaving brush and razor, flying beard oil, a "Fedora" vintage chair, a man with a handlebar moustache, a three-way mirror. None of them shows this shop, so **none is used.**
- `Sam-portrait.jpg` (255×350): Sam, head and shoulders, in waistcoat and tie on a pale grey background. Real but small.
- `google/g3.jpg` (1600×681): owner's 2018 panorama of the whole room, with Sam leaning on the counter in a waistcoat. **The best photo they have.**
- `google/g5.jpg` (640×854): owner's photo of the shopfront at dusk. Low resolution but real.
- `google/g1.jpg` (1474×1600): a red chair, basin and walnut mirror by the window. Good quality. Likely an owner or listing photo with no people in it.
- `google/g2.jpg` (900×1600): a corner with glass shelves, flowers and the red bench, with Halloween decorations. Usable but busy.
- Four more Google photos were customers' review attachments. Three came with Lucy W.'s review: a boy choosing from **a wooden box of sweets** on the red bench, Sam cutting the boy's hair, and the boy in the chair. The fourth is Jack G.'s selfie. I looked at them as evidence only (sweets for children, Sam working the chair himself). **They are not saved in this repo and not used on the site**, because they are photos of a child and of a private person.
- `visitrichmond-salon_701448607.jpg`: the same panorama as g3, at a lower resolution.

## How they talk about themselves

Formal, warm, a little old-school "gentlemen's" register. Phrases worth keeping:
- "luxury barbers", "a high end, gentlemen's grooming salon", "the local area would benefit from"
- "core values of quality and customer service"
- "a bespoke service tailored around their requirements"
- "really understanding what customers want, providing expert advice and guidance on what will suit the client"
- "leave the salon feeling confident, comfortable and happy, and most importantly looking **sharp and dapper!**"
- "We begin each appointment with a detailed client consultation"
- "traditional barbering techniques … precision and skill"
- "Beard maintenance requires commitment and a professional eye"
- "traditional cut throat shave … feeling relaxed and confident"
- The team are "hand-picked because of their skills, professionalism and commitment to exceptional customer service … approachable, friendly"
- "a first class experience … from the moment you walk into the salon to the minute you leave"
- Express Hot Towel Shave note: "Including a hot towel, followed by a traditional shave followed by facial massage"
- Page meta descriptions: "Sit back and relax at our luxury barber shop in Sheen", "treat yourself to the finest in male grooming", "a luxury cut throat wet shave", "the complete luxury barber shop experience with one of our men's grooming packages. **Group bookings available.**"

## Who comes

- **Local families.** "My son and husband both have their hair here" (Lucy W.). Father & Son and Teen prices exist. A sweet box for children. Google review topic "family friendly" (6).
- **Long-standing regulars.** "I've been going to Sam for over two years" (Daniel H.). "A friend who has been going to Sam's barber shop for many years" (Peter R.).
- **Men switching barbers.** "Had to switch barbershops as my barber moved away… Tried out Sam's shop due to the glowing reviews… I will certainly be a regular here now" (Jack G.).
- **Early and late weekday customers.** It opens at 8am and closes at 7pm Monday to Friday, about 300 m from Mortlake station. Before-work and after-work commuters are my inference from the hours and location. No review says so.

## What reviewers praise

- Google review topics (number of reviews mentioning each): **welcoming atmosphere (13)**, free drinks (7), welcoming staff (7), trimming (7), **hot towels (6)**, family friendly (6), keen eye to detail (3), perfect barber (3), quality of haircuts (2), gents hairdresser (2).
- Sam himself: "service provided by Sam himself was excellent", "Sam is a perfect gentleman. Knowledgeable and skilled."
- Consultation: "always open for discussion on how to shape your hair".
- Hospitality: "Complimentary refreshments and hot towels just make you feel at home". "Go, get pampered, get a shave, have a beer or coffee while it happens and enjoy."
- Being welcomed: "You're welcomed like family, given time and attention...and a top haircut."
- Unhurried: "pampered for as long as I was happy with the result", plus "extra service regarding my ears hair".
- Value: "all at an incredibly reasonable price". Google's reviewer-reported price range is £30–35 per person.

## Complaints

I didn't find any. All five full reviews I could read are 5 stars, and 4.8 across 200 suggests very few complaints. Google refused (403) the request that sorts reviews lowest first, so I couldn't check the low end directly. The demo does not invent a weakness or answer one.

## Hours

Google Maps (read 18 Oct 2026), Fresha and VisitRichmond all agree:
- Mon–Fri 8am–7pm
- Sat 8am–6pm
- Sun 10am–5pm

**Confirmed on Google Maps.** The current website does not publish its hours at all.

## Getting there

- 119 Sheen Lane, East Sheen, SW14 8AE (51.46553, -0.26667). On Sheen Lane, about 110 m north of the Upper Richmond Road West junction and about 290 m south of **Mortlake station** (straight-line distances from OpenStreetMap coordinates).
- Google lists a **wheelchair-accessible entrance**.
- Directions link: `https://www.google.com/maps/dir/?api=1&destination=...&destination_place_id=ChIJ6_eL744OdkgR1UCOFmI5pkE`

## What's weak on the current site

1. **Booking is a request form** (name, phone, email, service, "Preferred date/time"), so every booking needs a call back. The /bookings page also still carries an "All Services" list at **old prices** (£31 cut, £39 shave and so on) beside the current ones.
2. **No opening hours anywhere on the site.**
3. **No preview card** when the link is shared: no og:image, though og:title and og:description exist.
4. **Pinch-zoom is disabled** (`maximum-scale=1.0, user-scalable=0`), which is an accessibility failure on phones.
5. **A stray shortcode, "[/db_pb_map_pin]", shows as visible text** in the Find Us block on every page. /contact returns 404.
6. **Stock photography throughout.** The real room (walnut, red leather, granite) appears nowhere, although it is the best thing they have.
7. Sam's 4.8 from 200 Google reviews is never mentioned.
8. Email is a "CLICK HERE" link. The WhatsApp number is plain text, not a tap-to-chat link.
9. No social links, no map, and no sense of where on Sheen Lane the shop is.
10. A 2017 Divi build: heavy, with generic Arimo type.

## Design reasoning

- **Why it changed.** Earlier cuts used the salon's photos as the main visuals and a "luxury barber" palette (gold, walnut, red leather). Feedback: it read as cheap and templated, and the photos (dated phone shots, a 255 px portrait) dragged it down. This version is built from ink, paper and type, with the room drawn instead of photographed.
- **Palette:** bone paper #EEEAE2, ink #141311, a warm grey #6D675F for secondary text, and Sam's own bottle green **#003426** (the shopfront fascia and logo square) used sparingly: the booking buttons, the "open now" light, chosen services, savings, today's hours and the footer. The fascia in the shopfront drawing is the only large green area on the page apart from the footer. No gold, no red, no walnut.
- **Type:** **Instrument Serif** for headlines and prices (tall, narrow, editorial; prices read like a printed tariff), **Instrument Sans** for everything else. Section heads are numbered like an index (01 Price list, 02 The hot towel shave…) on a hairline rule.
- **Layout:** asymmetric and editorial rather than centred cards: a huge headline in their own words ("Sharp and dapper", from Sam's story), a narrow column beside it that answers the three questions (open now, £33, book), then the room drawn edge to edge. Hairlines, not boxes.
- **Signature 1, the room in ink:** the salon drawn as an elevation from the owner's panorama: five walnut-framed mirrors with their lamps, ribbed basins, barber chairs, pendant lamps on twisted flex, the door to the back, the coat stand, the reception counter with flowers and rolled hot towels, the buttoned bench. The lamps are lit while the salon is open (London time) and off when it's shut. The chairs, basins, towels and bench can be pressed to see and add their service (Wash Cut & Finish, Wash & Blow-Dry, the Luxury shave, Father & Son). Swipe sideways on a phone.
- **Signature 2, your visit:** tap prices and the visit adds up. When the choice matches a package, Father & Son or a five-visit bundle, it offers the switch, worked out from list prices, and shows a green "Saved £x". It ends in a booking request with a day and time inside opening hours, then a confirmation with a prefilled WhatsApp message.
- **Signature 3, the misted mirror:** their three-step description beside a mirror that reflects one of the drawn stations. It mists over when it comes into view, a razor clears one line, and you can wipe the glass.
- **Find us:** the shopfront drawn in ink with its green fascia, lit or dark with the opening hours, beside the hours, contacts and a to-scale sketch of Sheen Lane from Mortlake station.
- **Reviews:** not a carousel. The 4.8 set huge, Google's review topics as a ledger with counts, and two credited quotes.

## Photos on the demo

- Only one photo is left: Sam's portrait from the current site, shown small and in black and white, at no more than its native 255 px width.
- The room (hero, mirror reflection, team section) and the shopfront are SVG drawings made from the owner's panorama (g3), the chair photo (g1) and the shopfront at dusk (g5).
- Link preview (public/og.jpg): the SZ mark and the name in Instrument Serif above the drawing of the room.
- Not used: the current site's stock banners, the busy Halloween corner (g2), and the customer photos (not kept).

## Unknowns, left out of the site

- Durations (none published), team names, opening year, product brands, and whether refreshments include beer (one review says so; I didn't use that review because it has no author).
- What Father & Son covers. The demo compares its £51 with a Wash Cut & Finish plus a Teen Wash Cut & Finish (£57). That pairing is my reading of the name, not something they publish.
- How the five-visit bundles are redeemed (prepaid? expiry?). The demo shows only the price and the saving.
- Whether the luxury shave includes exactly the three steps. Their three-step note sits under the Express shave, so the scroll story is framed as "the hot towel shave" in general.

## What Sam most wants this site to do

1. **Turn a visit to the site into a confirmed booking without phone tag.** Today every booking is a call-back form and there is no online booking anywhere (the Fresha page is unclaimed).
2. **Sell the hot towel shave, the packages and the five-visit bundles.** Hot towels are one of reviewers' most-mentioned delights, yet the current site buries the packages on a page with no photos and no savings shown.
3. **Show Sheen this is Sam's own high-end salon, where you're welcomed like family.** The research shifts this from "worth the price": reviewers already call it "incredibly reasonable". What wins people is Sam himself, the room, the drinks and the hot towels, so the site should make a man switching barbers pick Sam's.
