// Splits image-sources/bear.png into two same-size layers so the raised paw can wave on its own:
//   bear-body.png  the bear with the paw removed (a small overlap is kept at the forearm)
//   bear-paw.png   just the paw and lower forearm
// Coordinates are in bear.png's pixels (529×635). The pivot for rotation is the forearm at (395, 190).
// Usage: npm run bear (then npm run images)
import sharp from 'sharp'

const source = 'image-sources/bear.png'
const { width, height } = await sharp(source).metadata()

// Outline of the paw layer: around the paw, clear of the ear and chest, cut across the forearm at y≈192.
const paw = '392,50 474,50 474,132 428,192 381,192 377,150 366,110 381,92'
// What the body loses: the same outline, but stopping at y≈174 so the forearm overlaps the paw layer.
const pawRemoved = '386,46 478,46 478,132 441,174 377,174 372,150 360,108 377,88'

// Renders a polygon to a single-channel raw mask (0–255), softened by `blur` pixels.
async function polygonMask(points, blur) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#000"/><polygon points="${points}" fill="#fff"/></svg>`
  return sharp(Buffer.from(svg)).blur(blur).extractChannel(0).raw().toBuffer()
}

const { data: rgba } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

// Writes a copy of the bear whose alpha is multiplied by weight(i) for each pixel i.
async function writeLayer(file, weight) {
  const out = Buffer.from(rgba)
  for (let i = 0; i < width * height; i++) out[i * 4 + 3] = Math.round((rgba[i * 4 + 3] * weight(i)) / 255)
  await sharp(out, { raw: { width, height, channels: 4 } }).png().toFile(file)
}

const pawMask = await polygonMask(paw, 1.5)
const removedMask = await polygonMask(pawRemoved, 1)
await writeLayer('image-sources/bear-paw.png', (i) => pawMask[i])
await writeLayer('image-sources/bear-body.png', (i) => 255 - removedMask[i])

console.log(`bear layers: ${width}×${height}`)
