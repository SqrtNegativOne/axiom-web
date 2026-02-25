import { useEffect, useRef } from 'react'

// 4×4 Bayer ordered dithering matrix (values 0–15, normalised to 0–1 elsewhere)
const BAYER = [
  [ 0,  8,  2, 10],
  [12,  4, 14,  6],
  [ 3, 11,  1,  9],
  [15,  7, 13,  5],
]

/**
 * Renders a canvas with a dithered radial gradient, giving the hero section
 * a bitmap / philosophical-diagram aesthetic.
 * The dithering is applied once on mount; the canvas itself is static.
 */
export default function DitherCanvas({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height

    // ─── draw a rich gradient: deep green + warm glow in the upper-centre ───
    const radial = ctx.createRadialGradient(W * 0.5, H * 0.3, 0, W * 0.5, H * 0.5, W * 0.8)
    radial.addColorStop(0,   '#3a5e50')  // lighter centre
    radial.addColorStop(0.45,'#2C4A3E')  // deep green
    radial.addColorStop(1,   '#1a2e26')  // near-black edge

    ctx.fillStyle = radial
    ctx.fillRect(0, 0, W, H)

    // ─── apply Bayer ordered dithering ─────────────────────────────────────
    const imageData = ctx.getImageData(0, 0, W, H)
    const d = imageData.data

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4
        // threshold: maps 0–15 Bayer value to a ±24 brightness nudge
        const t = (BAYER[y & 3][x & 3] / 15 - 0.5) * 48
        d[i]     = Math.min(255, Math.max(0, d[i]     + t))
        d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + t))
        d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + t))
      }
    }

    ctx.putImageData(imageData, 0, 0)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={1400}
      height={900}
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      aria-hidden="true"
    />
  )
}
