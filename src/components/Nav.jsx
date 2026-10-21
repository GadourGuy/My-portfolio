import { useEffect, useRef, useState } from 'react';
import { navLinks } from '../data.js';
import { gsap, ScrollTrigger, scrollTo, setScrollLocked, useGSAP } from '../lib/scroll.js';

export default function Nav() {
  const root = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useGSAP(() => {
    // Hide on the way down, return on the way up, go solid once past the hero.
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        root.current.classList.toggle('is-solid', y > window.innerHeight * 0.5);
        root.current.classList.toggle('is-hidden', self.direction === 1 && y > window.innerHeight);
      },
    });
    gsap.to('.progress span', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });
  });

  useEffect(() => {
    // Section triggers are created after the sections themselves pin, so wait a frame.
    let ctx;
    const id = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        navLinks.forEach(({ id: section }) => {
          ScrollTrigger.create({
            trigger: `#${section}`,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => self.isActive && setActive(section),
            onLeaveBack: () => section === navLinks[0].id && setActive(''),
          });
        });
      });
      ScrollTrigger.refresh();
    });
    return () => {
      cancelAnimationFrame(id);
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    setScrollLocked(open);
    if (open) {
      gsap.fromTo('.menu-links li', { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: 'power4.out', delay: 0.25 });
    }
  }, [open]);

  const go = (e, target) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollTo(target));
  };

  return (
    <>
      <header className="nav" ref={root}>
        <a href="#top" className="nav-logo" onClick={(e) => go(e, null)} aria-label="Back to top">OTHMAN</a>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className={active === l.id ? 'is-active' : ''} onClick={(e) => go(e, `#${l.id}`)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contact" className="nav-cta" onClick={(e) => go(e, '#contact')}>Let’s talk</a>
        <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          <span /><span />
        </button>
        <div className="progress" aria-hidden="true"><span /></div>
      </header>

      <div className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <ul className="menu-links">
          {navLinks.map((l, i) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={(e) => go(e, `#${l.id}`)} tabIndex={open ? 0 : -1}>
                <small>0{i + 1}</small>{l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
