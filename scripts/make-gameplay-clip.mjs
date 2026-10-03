// Turns recorded Wildfire Command frames (/image-sources/wildfire-command-gameplay-frames, one every 0.6s)
// into a looping animated WebP, played back at roughly 4x speed.
// Usage: npm run clip
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'

const directory = 'image-sources/wildfire-command-gameplay-frames'
const width = 1000
const frameDelay = 140 // ms per frame on playback (recorded every 600ms)
const finalHold = 1600 // ms to rest on the last frame before looping

const files = (await readdir(directory)).filter((file) => file.endsWith('.jpg')).sort()
const frames = await Promise.all(
  files.map((file) => sharp(`${directory}/${file}`).resize({ width }).toBuffer()),
)
const delays = frames.map((_, index) => (index === frames.length - 1 ? finalHold : frameDelay))

await sharp(frames, { join: { animated: true } })
  .webp({ quality: 72, effort: 5, loop: 0, delay: delays })
  .toFile('public/images/wildfire-command-gameplay.webp')

// Still frame for visitors who prefer reduced motion, and as the first paint.
await sharp(`${directory}/${files.at(-1)}`).resize({ width }).webp({ quality: 78 }).toFile('public/images/wildfire-command-gameplay-still.webp')

console.log(`clip: ${frames.length} frames at ${width}px`)
