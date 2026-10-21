import { useRef } from 'react';
import eventImg from '../assets/event.webp';
import { milestones } from '../data.js';
import { gsap, useGSAP } from '../lib/scroll.js';

export default function Beyond() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.beyond-photo img', { yPercent: -12, scale: 1.2 }, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: '.beyond-photo', start: 'top bottom', end: 'bottom top', scrub: true },
    });
    gsap.fromTo('.beyond-photo', { clipPath: 'inset(20% 10% 20% 10% round 28px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 28px)',
      ease: 'none',
      scrollTrigger: { trigger: '.beyond-photo', start: 'top bottom', end: 'center center', scrub: true },
    });
    gsap.from('.beyond-copy > *', {
      y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.beyond-copy', start: 'top 78%' },
    });
    gsap.fromTo('.timeline-line span', { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true },
    });
    gsap.utils.toArray('.timeline li').forEach((li) => {
      gsap.from(li, { x: 50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: li, start: 'top 82%' } });
    });
  }, { scope: root });

  return (
    <section className="beyond container" id="beyond" ref={root}>
      <p className="eyebrow"><b>06</b> Beyond the code</p>
      <h2 className="section-title">Learning <span className="grad">in public</span></h2>

      <div className="beyond-feature">
        <figure className="beyond-photo">
          <img src={eventImg} alt="CelcomDigi UniConnect event at UTM" loading="lazy" />
        </figure>
        <div className="beyond-copy">
          <p className="beyond-date">29 April 2025 · UTM</p>
          <h3>CelcomDigi UniConnect</h3>
          <p>
            An industry–academia programme run by CelcomDigi with UTM: talks, career workshops and networking
            with people from telecoms and tech, covering digital innovation, 5G and where careers in Malaysia’s
            tech scene are heading.
          </p>
          <ul className="takeaways">
            <li><strong>The future is digital-first.</strong> Cloud, data and mobile skills are what keep you competitive as every industry transforms.</li>
            <li><strong>Soft skills matter.</strong> Communication, adaptability and a growth mindset weigh heavily in hiring and long-term growth.</li>
          </ul>
        </div>
      </div>

      <div className="timeline">
        <div className="timeline-line" aria-hidden="true"><span /></div>
        <ol>
          {milestones.map((m) => (
            <li key={m.text}>
              <span className="timeline-year">{m.year}</span>
              <p>{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
