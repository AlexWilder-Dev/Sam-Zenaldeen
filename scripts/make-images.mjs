// One-off: resizes the salon's own photos and logo from research/images into
// the site (src/assets/img) and its icons (public/). Run with `npm run images`.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const SRC = 'research/images'
const OUT = 'src/assets/img'
const PUB = 'public'
await mkdir(OUT, { recursive: true })

const jobs = [
  // Owner's 2018 panorama of the room (Google Maps listing)
  { from: 'google/g3.jpg', to: 'interior-1600.webp', width: 1600 },
  { from: 'google/g3.jpg', to: 'interior-960.webp', width: 960 },
  // Chair, basin and walnut mirror by the window (Google Maps listing)
  { from: 'google/g1.jpg', to: 'chair-1000.webp', width: 1000 },
  { from: 'google/g1.jpg', to: 'chair-600.webp', width: 600 },
  // Shopfront at dusk (owner photo, Google Maps listing)
  { from: 'google/g5.jpg', to: 'shopfront-640.webp', width: 640 },
  // Sam's portrait from samzenaldeen.co.uk
  { from: 'Sam-portrait.jpg', to: 'sam-portrait.webp', width: 255 },
]

for (const j of jobs) {
  await sharp(`${SRC}/${j.from}`)
    .resize({ width: j.width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(`${OUT}/${j.to}`)
  console.log('wrote', j.to)
}

// Logo: square mark and the full stacked logo, kept as their own artwork
await sharp(`${SRC}/Logo-green.jpg`).png().toFile(`${OUT}/sz-mark.png`)
await sharp(`${SRC}/SamZeneldeen-HG.png`).png().toFile(`${OUT}/sz-logo.png`)

// Icons from the square mark
await sharp(`${SRC}/Logo-green.jpg`).resize(32, 32).png().toFile(`${PUB}/favicon-32.png`)
await sharp(`${SRC}/Logo-green.jpg`).resize(192, 192).png().toFile(`${PUB}/icon-192.png`)
await sharp(`${SRC}/Logo-green.jpg`).resize(180, 180).png().toFile(`${PUB}/apple-touch-icon.png`)
console.log('wrote icons')
