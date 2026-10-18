// One-off: resizes Sam's portrait and the logo mark from research/images into
// the site (src/assets/img) and its icons (public/). The room and the
// shopfront are drawn in SVG instead. Run with `npm run images`.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const SRC = 'research/images'
const OUT = 'src/assets/img'
const PUB = 'public'
await mkdir(OUT, { recursive: true })

const jobs = [
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

// Logo: the square mark, kept as its own artwork
await sharp(`${SRC}/Logo-green.jpg`).resize(96, 96).png().toFile(`${OUT}/sz-mark.png`)

// Icons from the square mark
await sharp(`${SRC}/Logo-green.jpg`).resize(32, 32).png().toFile(`${PUB}/favicon-32.png`)
await sharp(`${SRC}/Logo-green.jpg`).resize(192, 192).png().toFile(`${PUB}/icon-192.png`)
await sharp(`${SRC}/Logo-green.jpg`).resize(180, 180).png().toFile(`${PUB}/apple-touch-icon.png`)
console.log('wrote icons')
