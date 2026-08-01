import { useEffect, useRef } from 'react'

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    v_uv.y = 1.0 - v_uv.y;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision highp float;
  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;

  // Bayer matrix
  float bayer(vec2 p) {
    vec2 b = mod(floor(p), 4.0);
    float val = 0.0;
    if(b.x == 0.0 && b.y == 0.0) val = 0.0;
    else if(b.x == 1.0 && b.y == 0.0) val = 8.0;
    else if(b.x == 2.0 && b.y == 0.0) val = 2.0;
    else if(b.x == 3.0 && b.y == 0.0) val = 10.0;
    else if(b.x == 0.0 && b.y == 1.0) val = 12.0;
    else if(b.x == 1.0 && b.y == 1.0) val = 4.0;
    else if(b.x == 2.0 && b.y == 1.0) val = 14.0;
    else if(b.x == 3.0 && b.y == 1.0) val = 6.0;
    else if(b.x == 0.0 && b.y == 2.0) val = 3.0;
    else if(b.x == 1.0 && b.y == 2.0) val = 11.0;
    else if(b.x == 2.0 && b.y == 2.0) val = 1.0;
    else if(b.x == 3.0 && b.y == 2.0) val = 9.0;
    else if(b.x == 0.0 && b.y == 3.0) val = 15.0;
    else if(b.x == 1.0 && b.y == 3.0) val = 7.0;
    else if(b.x == 2.0 && b.y == 3.0) val = 13.0;
    else if(b.x == 3.0 && b.y == 3.0) val = 5.0;
    return val / 15.0 - 0.5;
  }

  // Value noise
  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0); // fade(t)
    
    // Hash function similar to JS hash2
    float v00 = fract(sin(dot(i + vec2(0.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453123);
    float v10 = fract(sin(dot(i + vec2(1.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453123);
    float v01 = fract(sin(dot(i + vec2(0.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453123);
    float v11 = fract(sin(dot(i + vec2(1.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453123);
    
    return mix(mix(v00, v10, u.x), mix(v01, v11, u.x), u.y);
  }

  // FBM
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    float tot = 0.0;
    for (int i = 0; i < 4; i++) {
      v += a * valueNoise(p);
      tot += a;
      a *= 0.5;
      p *= 2.1;
    }
    return v / tot;
  }

  void main() {
    vec2 uv = v_uv;
    
    // Match JS time scale: t = (ts / 1000) * waveSpeed * 11
    float t = u_time * 0.4;
    
    // FBM wave
    vec2 wx1 = vec2(uv.x * 3.0 + t, uv.y * 3.0 + sin(t * 0.77) * 0.5);
    vec2 wx2 = vec2(uv.x * 3.0 * 0.8 + t, uv.y * 3.0 * 0.8 + sin(t * 0.77) * 0.5);
    float wave = fbm(wx1 + fbm(wx2));
    
    // Vignette
    vec2 d = uv - 0.5;
    float vig = 1.0 - min(1.0, dot(d, d) * 3.2);
    
    float brightness = clamp(wave * vig, 0.0, 1.0);
    
    // Bayer dither based on pixel coords (gl_FragCoord)
    float b = bayer(gl_FragCoord.xy);
    brightness = clamp(brightness + b * 0.22, 0.0, 1.0);
    
    // Palette
    vec3 c0 = vec3(10.0, 20.0, 15.0) / 255.0;
    vec3 c1 = vec3(26.0, 46.0, 36.0) / 255.0;
    vec3 c2 = vec3(44.0, 74.0, 58.0) / 255.0;
    vec3 c3 = vec3(64.0, 106.0, 82.0) / 255.0;
    
    float lvl = floor(brightness * 4.0);
    vec3 col;
    if(lvl <= 0.0) col = c0;
    else if(lvl == 1.0) col = c1;
    else if(lvl == 2.0) col = c2;
    else col = c3;
    
    gl_FragColor = vec4(col, 1.0);
  }
`

export default function Dither({ waveSpeed = 0.05 } = {}) {
    const canvasRef = useRef(null)
    const rafRef = useRef(null)
    const startRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const gl =
            canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl')
        if (!gl) return // Fallback gracefully if WebGL is disabled

        const W = 240
        const H = 135
        canvas.width = W
        canvas.height = H
        gl.viewport(0, 0, W, H)

        function compileShader(type, source) {
            const shader = gl.createShader(type)
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader))
                gl.deleteShader(shader)
                return null
            }
            return shader
        }

        const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource)
        const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
        const program = gl.createProgram()
        gl.attachShader(program, vs)
        gl.attachShader(program, fs)
        gl.linkProgram(program)
        gl.useProgram(program)

        // Full screen quad
        const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)

        const aPos = gl.getAttribLocation(program, 'a_position')
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        const uTime = gl.getUniformLocation(program, 'u_time')
        const uRes = gl.getUniformLocation(program, 'u_resolution')
        gl.uniform2f(uRes, W, H)

        function render(ts) {
            if (!startRef.current) startRef.current = ts
            // JS passed: ((ts - startRef.current) / 1000) * waveSpeed * 11
            const t = ((ts - startRef.current) / 1000.0) * waveSpeed * 11.0

            gl.uniform1f(uTime, t)
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

            rafRef.current = requestAnimationFrame(render)
        }

        rafRef.current = requestAnimationFrame(render)

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            gl.deleteProgram(program)
            gl.deleteShader(vs)
            gl.deleteShader(fs)
            gl.deleteBuffer(buf)
        }
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
