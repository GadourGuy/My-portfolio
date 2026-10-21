import { useRef } from 'react';
import { skillGroups, skillRows } from '../data.js';
import { gsap, ScrollTrigger, useGSAP } from '../lib/scroll.js';

export default function Skills() {
  const root = useRef(null);

  useGSAP(() => {
    // Endless marquees in alternating directions that surge with scroll speed.
    const loops = gsap.utils.toArray('.marquee-inner').map((el, i) =>
      gsap.fromTo(el, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 28 + i * 6, ease: 'none', repeat: -1 })
    );
    let settle;
    ScrollTrigger.create({
      trigger: root.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 400);
        loops.forEach((t) => gsap.to(t, { timeScale: boost, duration: 0.2, overwrite: true }));
        clearTimeout(settle);
        settle = setTimeout(() => loops.forEach((t) => gsap.to(t, { timeScale: 1, duration: 0.8, overwrite: true })), 120);
      },
    });

    gsap.from('.skill-card', {
      y: 80, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.skill-cards', start: 'top 80%' },
    });
    gsap.from('.skills-head > *', {
      y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.skills-head', start: 'top 80%' },
    });
    return () => clearTimeout(settle);
  }, { scope: root });

  return (
    <section className="skills" id="skills" ref={root}>
      <div className="skills-head container">
        <p className="eyebrow"><b>05</b> Toolkit</p>
        <h2 className="section-title">Low level to <span className="grad">full stack</span></h2>
      </div>

      <div className="marquees" aria-label="Technologies">
        {skillRows.map((row, i) => (
          <div className={`marquee ${i === 1 ? 'is-outline' : ''}`} key={i}>
            <div className="marquee-inner">
              {[...row, ...row].map((s, j) => (
                <span key={j} aria-hidden={j >= row.length}>{s}<i>✦</i></span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="skill-cards container">
        {skillGroups.map((g) => (
          <article className="skill-card" key={g.title}>
            <i className={g.icon} />
            <h3>{g.title}</h3>
            <p>{g.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
