// One-off: builds public/og.jpg (1200x630) for link previews, in the site's
// own style: the name in Instrument Serif over the ink drawing of the room,
// with the SZ mark. The page is laid out in a headless Chromium, then encoded
// with sharp. Run with `npm run og` (set CHROME_PATH if Chromium isn't found).
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { chromium } from 'playwright-core'
import sharp from 'sharp'

const W = 1200
const H = 630
const file = (p) => pathToFileURL(resolve(p)).href

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { RoomDrawing } = await vite.ssrLoadModule('/src/components/RoomDrawing.tsx')
const room = renderToStaticMarkup(createElement(RoomDrawing, { lit: true, decorative: true, crop: '0 74 2400 680' }))
await vite.close()

const css = await readFile('src/styles/site.css', 'utf8')
const fonts = 'node_modules/@fontsource/instrument-serif/files'
const sans = 'node_modules/@fontsource-variable/instrument-sans/files'

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
@font-face { font-family: 'Instrument Serif'; font-style: normal; font-weight: 400; src: url(${file(`${fonts}/instrument-serif-latin-400-normal.woff2`)}) format('woff2'); }
@font-face { font-family: 'Instrument Serif'; font-style: italic; font-weight: 400; src: url(${file(`${fonts}/instrument-serif-latin-400-italic.woff2`)}) format('woff2'); }
@font-face { font-family: 'Instrument Sans Variable'; font-style: normal; font-weight: 400 700; src: url(${file(`${sans}/instrument-sans-latin-wght-normal.woff2`)}) format('woff2-variations'); }
${css}
body { width: ${W}px; height: ${H}px; overflow: hidden; }
.og { position: relative; width: ${W}px; height: ${H}px; padding: 40px 56px 0; }
.og__top { display: flex; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid var(--ink);
  font-size: 15px; font-weight: 560; letter-spacing: .09em; text-transform: uppercase; }
.og__top span:first-child { color: var(--green); }
.og__name { display: flex; align-items: center; gap: 28px; margin: 26px 0 0; }
.og__name img { width: 104px; height: 104px; }
.og__name h1 { margin: 0; font: 400 112px/.86 var(--serif); letter-spacing: -.02em; }
.og__name em { display: block; margin-top: 10px; font-size: 46px; letter-spacing: 0; }
.og__room { position: absolute; left: 0; right: 0; bottom: 0; height: 340px; border-top: 1px solid var(--ink); }
</style></head>
<body><div class="og">
  <div class="og__top"><span>119 Sheen Lane, East Sheen</span><span>Open seven days</span></div>
  <div class="og__name">
    <img src="${file('research/images/Logo-green.jpg')}" alt="">
    <h1>Sam Zenaldeen <em>Gentlemen’s Grooming</em></h1>
  </div>
  <div class="og__room">${room}</div>
</div></body></html>`

const dir = await mkdtemp(join(tmpdir(), 'sz-og-'))
const page = join(dir, 'og.html')
await writeFile(page, html)

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const tab = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
await tab.goto(pathToFileURL(page).href)
await tab.evaluate(() => document.fonts.ready)
const png = await tab.screenshot({ type: 'png' })
await browser.close()
await rm(dir, { recursive: true })

await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toFile('public/og.jpg')
const meta = await sharp('public/og.jpg').metadata()
const { size } = await stat('public/og.jpg')
console.log(`og.jpg ${meta.width}x${meta.height} ${meta.format} ${(size / 1024).toFixed(1)}KB`)
