import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/scroll.js';

const WORD = 'OTHMAN';

function pageReady() {
  const loaded = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
  const fonts = document.fonts?.ready ?? Promise.resolve();
  // Never hold the visitor hostage to a slow asset.
  const timeout = new Promise((resolve) => setTimeout(resolve, 4000));
  return Promise.race([Promise.all([loaded, fonts]), timeout]);
}

export default function Loader({ onDone }) {
  const root = useRef(null);
  const count = useRef(null);

  useGSAP(() => {
    const counter = { v: 0 };
    const render = () => {
      count.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
      gsap.set('.loader-bar span', { scaleX: counter.v / 100 });
    };

    gsap.from('.loader-word span', { yPercent: 110, stagger: 0.06, duration: 0.9, ease: 'power4.out' });
    const intro = gsap.to(counter, { v: 86, duration: 1.6, ease: 'power2.out', onUpdate: render });

    let cancelled = false;
    pageReady().then(() => {
      if (cancelled) return;
      gsap.timeline({ delay: Math.max(0, intro.duration() - intro.time()) })
        .to(counter, { v: 100, duration: 0.4, ease: 'power1.inOut', onUpdate: render })
        .to('.loader-word span', { yPercent: -110, stagger: 0.04, duration: 0.6, ease: 'power3.in' })
        .to('.loader-meta', { opacity: 0, duration: 0.3 }, '<')
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, '-=0.15')
        .add(onDone, '-=0.7')
        .set(root.current, { display: 'none' });
    });
    return () => { cancelled = true; };
  }, { scope: root });

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader-word">
        {WORD.split('').map((c, i) => <span key={i}>{c}</span>)}
      </div>
      <div className="loader-meta">
        <span>Portfolio · {new Date().getFullYear()}</span>
        <span ref={count}>000</span>
      </div>
      <div className="loader-bar"><span /></div>
    </div>
  );
}
