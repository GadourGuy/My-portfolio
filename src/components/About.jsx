import { useRef } from 'react';
import photo from '../assets/me-photo.webp';
import { profile, stats } from '../data.js';
import { gsap, useGSAP } from '../lib/scroll.js';

export default function About() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.about-bigname', { xPercent: 5 }, {
      xPercent: -35,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    gsap.fromTo('.about-photo', { yPercent: 10, rotate: -6 }, {
      yPercent: -6,
      rotate: -2,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    gsap.fromTo('.about-photo img', { scale: 1.2 }, {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    gsap.from('.about-copy > *', {
      y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-copy', start: 'top 75%' },
    });

    gsap.utils.toArray('.stat-value').forEach((el) => {
      const target = Number(el.dataset.value);
      const decimals = Number(el.dataset.decimals || 0);
      const counter = { v: 0 };
      gsap.to(counter, {
        v: target,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
        onUpdate: () => { el.textContent = counter.v.toFixed(decimals); },
      });
    });
  }, { scope: root });

  return (
    <section className="about" id="about" ref={root}>
      <div className="about-bigname" aria-hidden="true">OTHMAN ALI ✦ OTHMAN ALI ✦</div>

      <div className="container about-grid">
        <div className="about-visual">
          <div className="about-sun" />
          <figure className="about-photo">
            <img src={photo} alt="Othman Ali smiling in a bookstore" loading="lazy" />
          </figure>
        </div>

        <div className="about-copy">
          <p className="eyebrow"><b>01</b> About me</p>
          <h2 className="section-title">From <span className="grad">{profile.origin}</span>, building in Malaysia.</h2>
          <p className="lead">
            I’m a Computer Science student at Universiti Teknologi Malaysia who likes to go one layer deeper
            than the assignment asks. I’ve written shells and ray casters in C, shipped an industrial
            machine vision platform in Python and C++, and built full stack web apps with React, Next.js and Express.
          </p>
          <p>
            I care about software that is fast, reliable and pleasant to use, whether it runs on a factory PC
            or in a browser. Away from the editor I edit video in Adobe Creative Cloud and chip away at Project Euler.
          </p>
          <dl className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <dt>{s.label}</dt>
                <dd>
                  <span className="stat-value" data-value={s.value} data-decimals={s.decimals ?? 0}>0</span>
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
