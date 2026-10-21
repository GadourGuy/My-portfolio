import { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/hero.webp';
import { gsap, scrollTo, useGSAP } from '../lib/scroll.js';

const VB_H = 900;

// Narrow screens get a narrower viewBox so the masked word still fills the width.
function useViewBoxWidth() {
  const pick = () => (window.innerWidth / window.innerHeight < 0.9 ? 1000 : 1600);
  const [w, setW] = useState(pick);
  useEffect(() => {
    const onResize = () => setW(pick());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return w;
}

export default function Hero({ ready }) {
  const root = useRef(null);
  const vbW = useViewBoxWidth();
  const cx = vbW / 2;

  useGSAP(() => {
    const svgOrigin = `${cx} ${VB_H / 2}`;

    // One long pinned scene: the photo shrinks into the letters of the name.
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: 'top top', end: '+=280%', pin: true, scrub: 1, invalidateOnRefresh: true },
    });
    tl.to('.hero-copy', { opacity: 0, y: -140, duration: 0.3, ease: 'power1.in' }, 0)
      .to('.scroll-cue', { opacity: 0, duration: 0.1 }, 0)
      .fromTo('.mask-word', { scale: 18, svgOrigin }, { scale: 1, svgOrigin, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo('.mask-fill, .mask-outline', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'none' }, 0.08)
      .fromTo('.hero-media img', { scale: 1.08 }, { scale: 1, duration: 1.1, ease: 'power2.inOut' }, 0)
      .fromTo('.hero-after > *', { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.3 }, 0.85)
      .to('.hero-stage', { scale: 0.88, opacity: 0, duration: 0.5, ease: 'power2.in' }, 1.5)
      // Centre the portrait (it sits right on wide screens) and drop it so the
      // face, in the upper third of the photo, lands inside the word.
      .to('.hero-fg', {
        x: (_, el) => el.parentElement.offsetWidth / 2 - (el.offsetLeft + el.offsetWidth / 2),
        yPercent: 16,
        duration: 1,
        ease: 'power2.inOut',
      }, 0);
  }, { scope: root, dependencies: [cx], revertOnUpdate: true });

  return (
    <section className={`hero ${ready ? 'is-ready' : ''}`} id="top" ref={root}>
      <div className="hero-stage">
        <div className="hero-media">
          <img src={heroImg} alt="" className="hero-bg" aria-hidden="true" />
          <img src={heroImg} alt="Portrait of Othman Ali outdoors" className="hero-fg" fetchPriority="high" />
        </div>

        <svg className="hero-mask" viewBox={`0 0 ${vbW} ${VB_H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14061f" />
              <stop offset="55%" stopColor="#0b0610" />
              <stop offset="100%" stopColor="#080808" />
            </linearGradient>
            <linearGradient id="word-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffc371" />
              <stop offset="50%" stopColor="#ff5e3a" />
              <stop offset="100%" stopColor="#ff004f" />
            </linearGradient>
            <mask id="word-mask" maskUnits="userSpaceOnUse" x="-20000" y="-20000" width="40000" height="40000">
              <rect x="-20000" y="-20000" width="40000" height="40000" fill="#fff" />
              <g className="mask-word">
                <text x={cx} y={VB_H / 2} textAnchor="middle" dominantBaseline="central" className="mask-text" fill="#000">
                  OTHMAN
                </text>
              </g>
            </mask>
          </defs>
          <rect className="mask-fill" x="-20000" y="-20000" width="40000" height="40000" fill="url(#dusk)" mask="url(#word-mask)" />
          <g className="mask-word">
            <text x={cx} y={VB_H / 2} textAnchor="middle" dominantBaseline="central" className="mask-text mask-outline">
              OTHMAN
            </text>
          </g>
        </svg>

        <div className="hero-copy container">
          <p className="hero-eyebrow"><span>Software Engineer · Computer Science @ UTM</span></p>
          <h1 className="hero-title">
            <span className="line"><span>Hi, I’m <em>Othman</em></span></span>
            <span className="line"><span>Ali from Sudan</span></span>
          </h1>
        </div>

        <div className="hero-after">
          <p className="hero-after-role">Software Engineer</p>
          <p className="hero-after-line">Machine vision · Back ends · Full stack web</p>
        </div>

        <button className="scroll-cue" onClick={() => scrollTo('#about')} aria-label="Scroll down">
          <span>Scroll</span>
          <i />
        </button>
      </div>
    </section>
  );
}
