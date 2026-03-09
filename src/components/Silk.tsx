import { useEffect, useRef } from "react";

interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
  mouseInfluence?: number;
}

const Silk = ({
  speed = 0.5,
  scale = 1,
  color = "#aaaaaa",
  noiseIntensity = 1.5,
  rotation = 0,
  mouseInfluence = 0.5,
}: SilkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const target = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vert = `
      attribute vec2 a_pos;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const frag = `
      precision highp float;

      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_speed;
      uniform float u_scale;
      uniform vec3 u_color;
      uniform float u_noise;
      uniform float u_rotation;
      uniform float u_mouse_influence;

      #define PI 3.14159265358979

      mat2 rot(float a) {
        float c = cos(a), s = sin(a);
        return mat2(c, -s, s, c);
      }

      float hash(vec2 p) {
        p = fract(p * vec2(234.34, 435.345));
        p += dot(p, p + 34.23);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1,0)), u.x),
          mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 r = rot(0.5);
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p = r * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        uv = (uv - 0.5) * 2.0;
        uv.x *= u_resolution.x / u_resolution.y;

        uv *= rot(u_rotation * PI / 180.0);
        uv *= u_scale;

        float t = u_time * u_speed * 0.3;

        vec2 mouseEffect = (u_mouse - 0.5) * u_mouse_influence;

        vec2 q = vec2(
          fbm(uv + t * 0.3 + mouseEffect),
          fbm(uv + vec2(1.0))
        );

        vec2 r = vec2(
          fbm(uv + 1.0 * q + vec2(1.7, 9.2) + t * 0.15 + mouseEffect * 0.5),
          fbm(uv + 1.0 * q + vec2(8.3, 2.8) + t * 0.126)
        );

        float f = fbm(uv + r);

        float d = length(r) * u_noise;
        float wave = sin(uv.x * 3.0 + t + r.y * 4.0) * 0.5 + 0.5;
        wave *= sin(uv.y * 2.5 - t * 0.8 + q.x * 3.0) * 0.5 + 0.5;

        float pattern = f * f * (0.4 + wave * 0.6) * (1.0 - d * 0.3);
        pattern = clamp(pattern, 0.0, 1.0);

        float ribbon = smoothstep(0.35, 0.55, pattern) * (1.0 - smoothstep(0.65, 0.85, pattern));
        ribbon += smoothstep(0.20, 0.35, pattern) * 0.3;

        vec3 col = u_color * ribbon * 0.85;
        col = mix(col, u_color * 1.1, ribbon * 0.4);

        float vignette = 1.0 - length(gl_FragCoord.xy / u_resolution - 0.5) * 1.4;
        vignette = clamp(vignette, 0.0, 1.0);

        gl_FragColor = vec4(col * vignette, ribbon * 0.9 * vignette);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uSpeed = gl.getUniformLocation(prog, "u_speed");
    const uScale = gl.getUniformLocation(prog, "u_scale");
    const uColor = gl.getUniformLocation(prog, "u_color");
    const uNoise = gl.getUniformLocation(prog, "u_noise");
    const uRot = gl.getUniformLocation(prog, "u_rotation");
    const uMouseInf = gl.getUniformLocation(prog, "u_mouse_influence");

    const hex = color.replace("#", "");
    const r = parseInt(hex.slice(0,2), 16) / 255;
    const g = parseInt(hex.slice(2,4), 16) / 255;
    const b = parseInt(hex.slice(4,6), 16) / 255;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let animId: number;
    let start = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      target.current.x = e.clientX / window.innerWidth;
      target.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      mouse.current.x += (target.current.x - mouse.current.x) * 0.05;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.05;

      const t = (performance.now() - start) / 1000;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.current.x, mouse.current.y);
      gl.uniform1f(uSpeed, speed);
      gl.uniform1f(uScale, scale);
      gl.uniform3f(uColor, r, g, b);
      gl.uniform1f(uNoise, noiseIntensity);
      gl.uniform1f(uRot, rotation);
      gl.uniform1f(uMouseInf, mouseInfluence);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [speed, scale, color, noiseIntensity, rotation, mouseInfluence]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 1,
      }}
    />
  );
};

export default Silk;
