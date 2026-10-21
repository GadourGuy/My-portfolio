import { useRef } from 'react';
import { education, experience } from '../data.js';
import { gsap, useGSAP } from '../lib/scroll.js';

export default function Experience() {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop: the panels ride sideways while the section is pinned.
    mm.add('(min-width: 900px)', () => {
      const distance = () => track.current.scrollWidth - window.innerWidth;
      const slide = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.to('.exp-progress span', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: true },
      });
      gsap.utils.toArray('.exp-card').forEach((card) => {
        gsap.from(card.querySelectorAll('.exp-anim'), {
          y: 50, opacity: 0, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: card, containerAnimation: slide, start: 'left 85%', end: 'left 45%', scrub: true },
        });
      });
    });

    // Mobile: a plain vertical stack with simple reveals.
    mm.add('(max-width: 899px)', () => {
      gsap.utils.toArray('.exp-panel').forEach((panel) => {
        gsap.from(panel, { y: 60, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: panel, start: 'top 85%' } });
      });
    });
  }, { scope: root });

  return (
    <section className="exp" id="experience" ref={root}>
      <div className="exp-track" ref={track}>
        <div className="exp-panel exp-intro">
          <p className="eyebrow"><b>02</b> Experience</p>
          <h2 className="section-title huge">Where I’ve <span className="grad">shipped</span></h2>
          <p className="lead">From an intensive bootcamp to an R&amp;D lab building inspection systems for real production lines.</p>
          <p className="exp-hint" aria-hidden="true">Keep scrolling <i className="fa-solid fa-arrow-right-long" /></p>
        </div>

        {experience.map((job, i) => (
          <article className="exp-panel exp-card" key={job.company}>
            <span className="exp-index exp-anim">0{i + 1}</span>
            <p className="exp-period exp-anim">{job.period}</p>
            <h3 className="exp-role exp-anim">{job.role}</h3>
            <p className="exp-company exp-anim">{job.company}</p>
            <ul className="exp-points">
              {job.points.map((p) => <li className="exp-anim" key={p}>{p}</li>)}
            </ul>
            <ul className="tags exp-anim">
              {job.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </article>
        ))}

        <article className="exp-panel exp-card exp-edu">
          <span className="exp-index exp-anim"><i className="fa-solid fa-graduation-cap" /></span>
          <h3 className="exp-role exp-anim">Education</h3>
          <ol className="edu-list">
            {education.map((e) => (
              <li className="exp-anim" key={e.place}>
                <span className="edu-period">{e.period}</span>
                <strong>{e.title}</strong>
                <span className="edu-place">{e.place}</span>
                <span className="edu-note">{e.note}</span>
              </li>
            ))}
          </ol>
        </article>
      </div>
      <div className="exp-progress" aria-hidden="true"><span /></div>
    </section>
  );
}
