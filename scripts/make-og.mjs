// One-off: builds public/og.jpg (1200x630) for link previews.
// The salon's own fascia layout (gold square mark, wordmark beside it) above
// the owner's panorama of the room. Run with `npm run og`.
import sharp from 'sharp'

const W = 1200
const H = 630
const FASCIA = 176
const GREEN = '#003426'

const logo = 'research/images/SamZeneldeen-HG.png'

// The stacked logo split into its square mark and its wordmark
const mark = await sharp(logo).extract({ left: 87, top: 0, width: 226, height: 225 }).resize(128, 128).png().toBuffer()
const word = await sharp(logo).extract({ left: 0, top: 258, width: 400, height: 75 }).resize({ width: 470 }).png().toBuffer()
const wordMeta = await sharp(word).metadata()

const photoH = H - FASCIA
const photo = await sharp('research/images/google/g3.jpg')
  .resize({ width: W, height: Math.round((W / 1600) * 681) })
  .extract({ left: 0, top: Math.round((W / 1600) * 681) - photoH, width: W, height: photoH })
  .toBuffer()

// Fascia mouldings: a darker lip under the sign board and a fine highlight above it
const mouldings = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${W}" height="6" fill="#02261c"/>
  <rect x="0" y="10" width="${W}" height="1.5" fill="#1d5644" opacity="0.8"/>
  <rect x="0" y="${FASCIA - 12}" width="${W}" height="1.5" fill="#1d5644" opacity="0.8"/>
  <rect x="0" y="${FASCIA - 8}" width="${W}" height="8" fill="#02261c"/>
  <rect x="0" y="${FASCIA}" width="${W}" height="${photoH}" fill="none" stroke="#02261c" stroke-width="10"/>
</svg>`)

const markX = Math.round((W - (128 + 34 + wordMeta.width)) / 2)
await sharp({ create: { width: W, height: H, channels: 3, background: GREEN } })
  .composite([
    { input: photo, top: FASCIA, left: 0 },
    { input: mouldings, top: 0, left: 0 },
    { input: mark, top: Math.round((FASCIA - 128) / 2), left: markX },
    { input: word, top: Math.round((FASCIA - wordMeta.height) / 2), left: markX + 128 + 34 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og.jpg')

const meta = await sharp('public/og.jpg').metadata()
const { size } = await import('node:fs').then((fs) => fs.promises.stat('public/og.jpg'))
console.log(`og.jpg ${meta.width}x${meta.height} ${meta.format} ${(size / 1024).toFixed(1)}KB`)
