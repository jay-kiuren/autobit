import { useEffect } from "react";
import ScrollReveal from "../ScrollReveal";

const HeroSection = () => {
  useEffect(() => {
    const container = document.getElementById('hero-canvas-container');
    if (!container) return;

    let cleanup: (() => void) | undefined;

    import('three').then((THREE) => {
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
      container.appendChild(renderer.domElement);

      const geo = new THREE.PlaneGeometry(2, 2);
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
        },
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.0); }`,
        fragmentShader: `
          uniform float uTime;
          uniform vec2 uRes;
          varying vec2 vUv;
          void main(){
            vec2 p = vUv * 2.0 - 1.0;
            p.x *= uRes.x / uRes.y;
            float t = uTime * 0.12;
            vec2 q = p;
            q /= 0.5 + 0.18 * dot(q,q);
            q += 0.15 * cos(t) - 4.0;
            vec3 col = vec3(0.0);
            for(int i=0;i<3;i++){
              vec2 r = sin(1.4*(q.yx*0.9)+1.8*cos(q*0.9));
              float m = length(r + sin(4.5*r.y*0.9 - 2.8*t + float(i))/4.0);
              col[i] = 1.0 - exp(-5.0/exp(5.5*m));
            }
            col = clamp(col * 0.12, 0.0, 1.0);
            float a = max(max(col.r,col.g),col.b);
            gl_FragColor = vec4(col/max(a,0.001)*a, a*0.7);
          }
        `
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      let raf: number;
      const clock = new THREE.Clock();
      const animate = () => {
        mat.uniforms.uTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      animate();

      const onResize = () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        mat.uniforms.uRes.value.set(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('resize', onResize);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    });

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="hero-canvas-container"
      className="min-h-screen bg-background pt-[88px] pb-10 relative overflow-hidden"
    >
      <div className="section-container text-center relative z-[1]">
        <ScrollReveal>
          <span className="text-eyebrow block mb-2">Start Something™</span>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h1 className="text-[clamp(32px,5vw,48px)] font-bold tracking-[-1px] leading-[1.1] text-foreground max-w-[800px] mx-auto">
            AI systems engineered for what's next.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p className="text-[clamp(17px,2.5vw,21px)] font-normal text-ab-text-secondary mt-2 max-w-[700px] mx-auto">
            AI agents, automation, web applications, and intelligent robotics — built and deployed in days.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.24}>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-6">
            <a
              href="mailto:autobitofficial.ph@gmail.com"
              className="inline-flex items-center justify-center h-11 px-8 bg-primary text-primary-foreground rounded-full text-[17px] font-semibold hover:bg-ab-link-hover hover:text-background transition-all duration-200"
            >
              Start a project
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center text-[17px] text-primary hover:text-ab-link-hover transition-colors"
            >
              See our work →
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.32}>
          <div className="mx-auto mt-10 max-w-[800px] min-h-[400px] rounded-lg bg-ab-card border border-border flex items-center justify-center">
            <span className="text-ab-text-muted text-sm" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;
