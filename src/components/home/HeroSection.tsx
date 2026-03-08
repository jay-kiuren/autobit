import { useEffect } from "react";
import ScrollReveal from "../ScrollReveal";

const HeroSection = () => {
  useEffect(() => {
    const el = document.getElementById('hero-bg');
    if (!el) return;
    let raf: number;
    import('three').then((T) => {
      const renderer = new T.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(el.clientWidth, el.clientHeight);
      Object.assign(renderer.domElement.style, { position:'absolute', inset:'0', width:'100%', height:'100%', zIndex:'0' });
      el.appendChild(renderer.domElement);
      const scene = new T.Scene();
      const cam = new T.OrthographicCamera(-1,1,1,-1,0,1);
      const uni = { uTime: { value: 0 }, uRes: { value: new T.Vector2(el.clientWidth, el.clientHeight) } };
      const mat = new T.ShaderMaterial({
        transparent: true, uniforms: uni,
        vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.);}`,
        fragmentShader: `
          uniform float uTime; uniform vec2 uRes; varying vec2 vUv;
          void main(){
            vec2 p=(vUv*2.-1.)*vec2(uRes.x/uRes.y,1.);
            float t=uTime*.1;
            vec2 q=p/(.4+.15*dot(p,p));
            q+=.12*cos(t)-3.;
            vec3 c=vec3(0.);
            for(int i=0;i<3;i++){
              vec2 r=sin(1.3*(q.yx*.85)+1.6*cos(q*.85));
              float m=length(r+sin(4.*r.y*.85-2.5*t+float(i))/4.);
              c[i]=1.-exp(-4./exp(5.*m));
            }
            c=clamp(c*.10,0.,1.);
            float a=max(max(c.r,c.g),c.b);
            gl_FragColor=vec4(a<.001?vec3(0.):c/a*a,a*.65);
          }`
      });
      scene.add(new T.Mesh(new T.PlaneGeometry(2,2), mat));
      const tick = () => { mat.uniforms.uTime.value += .016; renderer.render(scene, cam); raf = requestAnimationFrame(tick); };
      tick();
      const onResize = () => { renderer.setSize(el.clientWidth, el.clientHeight); uni.uRes.value.set(el.clientWidth, el.clientHeight); };
      window.addEventListener('resize', onResize);
    });
    return () => { cancelAnimationFrame(raf); };
  }, []);

  return (
    <section
      id="hero-bg"
      className="min-h-screen bg-background pt-[88px] pb-10"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="section-container text-center" style={{ position: 'relative', zIndex: 1 }}>
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
