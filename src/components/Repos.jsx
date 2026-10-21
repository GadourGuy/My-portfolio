import { useRef } from 'react';
import { langColors, repos } from '../data.js';
import { gsap, ScrollTrigger, useGSAP } from '../lib/scroll.js';

const GITHUB = 'https://github.com/GadourGuy';

export default function Repos() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.from('.repos-head > *', {
      y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.repos-head', start: 'top 80%' },
    });
    gsap.set('.repo', { y: 80, opacity: 0 });
    ScrollTrigger.batch('.repo', {
      start: 'top 90%',
      onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: 'power3.out' }),
    });
  }, { scope: root });

  // Spotlight follows the pointer inside each card.
  const onMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section className="repos container" ref={root}>
      <div className="repos-head">
        <p className="eyebrow"><b>04</b> Open source</p>
        <h2 className="section-title">More on <span className="grad">GitHub</span></h2>
        <a className="btn" href={GITHUB} target="_blank" rel="noreferrer">
          <i className="fa-brands fa-github" /> All 36 repositories
        </a>
      </div>

      <ul className="repo-grid">
        {repos.map((r) => (
          <li className="repo" key={r.name} onPointerMove={onMove}>
            <a href={`${GITHUB}/${r.name}`} target="_blank" rel="noreferrer" className="repo-link">
              <span className="repo-top">
                <i className="fa-regular fa-folder-open" />
                <i className="fa-solid fa-arrow-up-right repo-arrow" />
              </span>
              <span className="repo-name">{r.name.replaceAll('_', ' ').replaceAll('-', ' ')}</span>
              <span className="repo-desc">{r.desc}</span>
              <span className="repo-lang">
                <i style={{ background: langColors[r.lang] }} />{r.lang}
              </span>
            </a>
            {r.live && (
              <a href={r.live} target="_blank" rel="noreferrer" className="repo-live">Live demo</a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
