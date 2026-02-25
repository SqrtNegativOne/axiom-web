import { useEffect, useRef } from 'react'

// 4×4 Bayer ordered dithering matrix
const BAYER = [
  [ 0,  8,  2, 10],
  [12,  4, 14,  6],
  [ 3, 11,  1,  9],
  [15,  7, 13,  5],
]

// Simple 2D Perlin-style value noise
function hash(x, y) {
  let h = x * 374761393 + y * 668265263
  h = (h ^ (h >> 13)) * 1274126177
  return (h ^ (h >> 16)) / 2147483648
}

function smoothNoise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix, fy = y - iy
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy)
  const n00 = hash(ix, iy), n10 = hash(ix + 1, iy)
  const n01 = hash(ix, iy + 1), n11 = hash(ix + 1, iy + 1)
  const nx0 = n00 + (n10 - n00) * sx
  const nx1 = n01 + (n11 - n01) * sx
  return nx0 + (nx1 - nx0) * sy
}

function fbm(x, y, octaves = 4) {
  let value = 0, amp = 1, freq = 1, max = 0
  for (let i = 0; i < octaves; i++) {
    value += amp * smoothNoise(x * freq, y * freq)
    max += amp
    amp *= 0.5
    freq *= 2
  }
  return value / max
}

/**
 * Animated dithered canvas with wave distortion.
 * Renders a Perlin-noise-based wave pattern with Bayer ordered dithering,
 * giving the hero section an animated bitmap / philosophical-diagram aesthetic.
 */
export default function DitherCanvas({ className = '' }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height

    // Pre-allocate ImageData
    const imageData = ctx.createImageData(W, H)
    const d = imageData.data

    // Color palette (green tones matching the design system)
    const colors = [
      [26, 46, 38],   // near-black green
      [44, 74, 62],   // deep green (#2C4A3E)
      [58, 94, 80],   // lighter green
      [80, 120, 100], // highlight green
    ]

    let start = null

    function render(timestamp) {
      if (!start) start = timestamp
      const t = (timestamp - start) * 0.0003 // slow time progression

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4

          // Normalised coordinates
          const nx = x / W
          const ny = y / H

          // Wave-distorted noise
          const wave = fbm(nx * 3 + t, ny * 3 + Math.sin(t * 0.7) * 0.5, 4)

          // Radial vignette — darker at edges
          const dx = nx - 0.5, dy = ny - 0.5
          const dist = Math.sqrt(dx * dx + dy * dy) * 1.6
          const vignette = 1 - Math.min(1, dist * dist)

          // Combined brightness 0..1
          const brightness = Math.max(0, Math.min(1, wave * vignette))

          // Bayer dithering threshold
          const threshold = (BAYER[y & 3][x & 3] / 15 - 0.5) * 0.25

          // Quantise to color palette
          const idx = Math.max(0, Math.min(colors.length - 1,
            Math.floor((brightness + threshold) * colors.length)
          ))
          const c = colors[idx]

          d[i]     = c[0]
          d[i + 1] = c[1]
          d[i + 2] = c[2]
          d[i + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)
      animRef.current = requestAnimationFrame(render)
    }

    animRef.current = requestAnimationFrame(render)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={180}
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    />
  )
}
