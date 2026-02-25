import { useEffect, useRef } from 'react'

// ─── 4×4 Bayer ordered dithering matrix ──────────────────────────────────
const BAYER4 = [
  [ 0,  8,  2, 10],
  [12,  4, 14,  6],
  [ 3, 11,  1,  9],
  [15,  7, 13,  5],
]

// ─── Smooth 2D value noise ────────────────────────────────────────────────
function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10) }

function hash2(ix, iy) {
  let h = (ix * 1619 + iy * 31337 + 1013904223) | 0
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b)
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b)
  h ^= h >>> 16
  return (h & 0x7fffffff) / 0x7fffffff
}

function valueNoise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix, fy = y - iy
  const sx = fade(fx), sy = fade(fy)
  const v00 = hash2(ix,     iy    )
  const v10 = hash2(ix + 1, iy    )
  const v01 = hash2(ix,     iy + 1)
  const v11 = hash2(ix + 1, iy + 1)
  return v00 + (v10 - v00) * sx + ((v01 - v00) + (v00 - v10 - v01 + v11) * sx) * sy
}

// ─── Fractal Brownian Motion (4 octaves) ─────────────────────────────────
function fbm(x, y) {
  let v = 0, a = 0.5, tot = 0
  for (let o = 0; o < 4; o++) {
    v += a * valueNoise(x, y)
    tot += a; a *= 0.5
    x *= 2.1; y *= 2.1
  }
  return v / tot
}

// ─── Palette: 4 levels from near-black to brand green ────────────────────
// Maps to Axiom colours: ink → deep green → #2C4A3E → lighter green
const PALETTE = [
  [10,  20,  15],   // near-black
  [26,  46,  36],   // very deep green
  [44,  74,  58],   // brand green (#2C4A3E ≈)
  [64, 106,  82],   // lighter highlight green
]

/**
 * Canvas-based animated Perlin wave + Bayer dither background.
 * Accepts the same props as the reactbits Dither component so the import
 * in Home.jsx needs no changes.
 */
export default function Dither({ waveSpeed = 0.05 } = {}) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const startRef  = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Render at a low pixel resolution for the chunky dither look
    const W = 240
    const H = 135
    canvas.width  = W
    canvas.height = H

    const imageData = ctx.createImageData(W, H)
    const d = imageData.data

    function render(ts) {
      if (!startRef.current) startRef.current = ts
      const t = ((ts - startRef.current) / 1000) * waveSpeed * 11  // normalised time

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const nx = x / W
          const ny = y / H

          // Two-layer FBM distorted by time for wave motion
          const wx = nx * 3 + t * 0.4
          const wy = ny * 3 + Math.sin(t * 0.31) * 0.5
          const wave = fbm(wx + fbm(wx * 0.8, wy * 0.8), wy)

          // Radial vignette — edges darker
          const dx = nx - 0.5, dy = ny - 0.5
          const vig = 1 - Math.min(1, (dx * dx + dy * dy) * 3.2)

          let brightness = Math.max(0, Math.min(1, wave * vig))

          // Bayer threshold maps 0-15 → ±offset
          const bayerNorm = BAYER4[y & 3][x & 3] / 15 - 0.5
          brightness = Math.max(0, Math.min(1, brightness + bayerNorm * 0.22))

          // Quantise to 4 palette levels
          const lvl = Math.min(PALETTE.length - 1, Math.floor(brightness * PALETTE.length))
          const c = PALETTE[lvl]
          const i = (y * W + x) * 4
          d[i]     = c[0]
          d[i + 1] = c[1]
          d[i + 2] = c[2]
          d[i + 3] = 255
        }
      }
      ctx.putImageData(imageData, 0, 0)
      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [waveSpeed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        imageRendering: 'pixelated',
        display: 'block',
      }}
    />
  )
}
