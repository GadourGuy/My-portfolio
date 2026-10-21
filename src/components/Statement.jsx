import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/scroll.js';

// Words wrapped in *asterisks* get the sunset gradient.
const TEXT =
  'I build software that has to work in the real world: *industrial* *machine* *vision* systems on factory floors and *fast* *full* *stack* web apps. A Computer Science student at UTM with a *3.99* *CGPA,* writing everything from C to the cloud.';

export default function Statement() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.to('.statement-word', {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: '.statement-text', start: 'top 80%', end: 'bottom 45%', scrub: true },
    });
    gsap.from('.statement-eyebrow', {
      opacity: 0, y: 30, duration: 1,
      scrollTrigger: { trigger: root.current, start: 'top 75%' },
    });
  }, { scope: root });

  return (
    <section className="statement container" ref={root}>
      <p className="eyebrow statement-eyebrow">The short version</p>
      <p className="statement-text">
        {TEXT.split(' ').map((w, i) => {
          const hot = w.startsWith('*');
          return (
            <span key={i} className={`statement-word ${hot ? 'grad' : ''}`}>
              {hot ? w.replaceAll('*', '') : w}{' '}
            </span>
          );
        })}
      </p>
    </section>
  );
}
