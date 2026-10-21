import { useRef } from 'react';
import { projects } from '../data.js';
import { gsap, useGSAP } from '../lib/scroll.js';
import ProjectArt from './ProjectArt.jsx';

export default function Work() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.from('.work-head > *', {
      y: 80, opacity: 0, stagger: 0.12, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.work-head', start: 'top 75%' },
    });

    const cards = gsap.utils.toArray('.project');
    const parts = (card) => ({
      frame: card.querySelector('.project-frame'),
      bg: card.querySelector('.project-bg'),
      win: card.querySelector('.project-window'),
      anim: card.querySelectorAll('.project-anim'),
    });
    const CLOSED = 'inset(12% 14% 12% 14% round 36px)';
    const OPEN = 'inset(0% 0% 0% 0% round 0px)';

    // A frame opens from a rounded window to full bleed as it scrolls in.
    const openOnScroll = (card) => {
      const { frame, bg, win, anim } = parts(card);
      const enter = { trigger: card, start: 'top bottom', end: 'top top', scrub: true };
      gsap.fromTo(frame, { clipPath: CLOSED }, { clipPath: OPEN, ease: 'none', scrollTrigger: enter });
      gsap.fromTo(bg, { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: enter });
      gsap.fromTo(win, { y: 140, rotate: 3 }, { y: 0, rotate: 0, ease: 'none', scrollTrigger: enter });
      gsap.from(anim, {
        y: 50, opacity: 0, stagger: 0.07, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 35%', toggleActions: 'play none none reverse' },
      });
    };

    const mm = gsap.matchMedia();

    // Desktop: one pinned deck. Each card rests, then the next rises over it.
    mm.add('(min-width: 900px)', () => {
      openOnScroll(cards[0]);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.projects',
          start: 'top top',
          end: () => `+=${(cards.length - 1) * 160}%`,
          pin: true,
          scrub: 1,
        },
      });
      cards.slice(1).forEach((card, i) => {
        const prev = parts(cards[i]);
        const { frame, bg, win, anim } = parts(card);
        tl.to({}, { duration: 0.6 })
          .fromTo(card, { yPercent: 100 }, { yPercent: 0, duration: 1, ease: 'none' })
          .fromTo(frame, { clipPath: CLOSED }, { clipPath: OPEN, duration: 1, ease: 'none' }, '<')
          .fromTo(bg, { scale: 1.35 }, { scale: 1, duration: 1, ease: 'none' }, '<')
          .fromTo(win, { y: 140, rotate: 3 }, { y: 0, rotate: 0, duration: 1, ease: 'none' }, '<')
          .to(prev.frame, { scale: 0.9, filter: 'brightness(0.3)', duration: 1, ease: 'none' }, '<')
          .from(anim, { y: 50, opacity: 0, stagger: 0.05, duration: 0.35, ease: 'power2.out' }, '-=0.35');
      });
      tl.to({}, { duration: 0.6 });
    });

    // Mobile: cards simply flow, each opening as it arrives.
    mm.add('(max-width: 899px)', () => cards.forEach(openOnScroll));
  }, { scope: root });

  return (
    <section className="work" id="work" ref={root}>
      <div className="work-head container">
        <p className="eyebrow"><b>03</b> Selected work</p>
        <h2 className="section-title huge">Things I’ve <span className="grad">built</span></h2>
        <p className="lead">Industrial software, full stack platforms and low level systems, each built to hold up when people actually use it.</p>
      </div>

      <div className="projects">
        {projects.map((p, i) => (
          <article className="project" key={p.title}>
            <div className="project-frame">
              <div className="project-bg" data-art={p.art}>
                {p.image && <img src={p.image} alt="" loading="lazy" />}
              </div>
              <div className="project-shade" />
              <div className="project-inner container">
                <div className="project-info">
                  <span className="project-index project-anim">{String(i + 1).padStart(2, '0')}</span>
                  <p className="project-kicker project-anim">{p.kicker}</p>
                  <h3 className="project-title project-anim">{p.title}</h3>
                  <p className="project-desc project-anim">{p.description}</p>
                  <ul className="tags project-anim">
                    {p.tags.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                  {p.links.length > 0 ? (
                    <div className="project-links project-anim">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn btn-ghost">
                          {l.label} <i className="fa-solid fa-arrow-up-right-from-square" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="project-note project-anim"><i className="fa-solid fa-lock" /> Private source · illustration shown</p>
                  )}
                </div>
                <div className="project-window">
                  {p.image ? (
                    <div className="window-shot">
                      <div className="art-bar"><i /><i /><i /><span>{p.title}</span></div>
                      <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" />
                    </div>
                  ) : (
                    <ProjectArt kind={p.art} />
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
