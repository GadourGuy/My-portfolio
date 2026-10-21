import { useRef, useState } from 'react';
import { profile } from '../data.js';
import { gsap, useGSAP } from '../lib/scroll.js';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbx0Bh_rma_nK-3svsodLiqa6uHx_ccgVz8C7l9rq4FSHr_J5Jy48_SJs9P-Ck4j4RBt/exec';
const HEADLINE = ['LET’S', 'BUILD', 'SOMETHING'];

export default function Contact() {
  const root = useRef(null);
  const [status, setStatus] = useState({ state: 'idle', text: '' });

  useGSAP(() => {
    gsap.from('.contact-title .char', {
      yPercent: 110,
      rotate: 8,
      stagger: 0.025,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-title', start: 'top 85%', end: 'top 35%', scrub: 1 },
    });
    gsap.from('.contact-grid > *', {
      y: 60, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
    });
  }, { scope: root });

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus({ state: 'sending', text: 'Sending…' });
    try {
      const res = await fetch(SHEET_URL, { method: 'POST', body: data });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus({ state: 'ok', text: 'Message sent. I’ll get back to you soon.' });
      setTimeout(() => setStatus({ state: 'idle', text: '' }), 6000);
    } catch {
      // Keep the visitor's message: hand it to their email app instead.
      const subject = `Portfolio message from ${data.get('Name')}`;
      const body = `${data.get('Message') || ''}\n\n${data.get('Name')} (${data.get('Email')})`;
      setStatus({
        state: 'error',
        text: 'The form couldn’t send right now.',
        mailto: `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      });
    }
  };

  return (
    <section className="contact" id="contact" ref={root}>
      <div className="contact-glow" aria-hidden="true" />
      <div className="container">
        <p className="eyebrow"><b>07</b> Contact</p>
        <h2 className="contact-title" aria-label="Let’s build something">
          {HEADLINE.map((word, w) => (
            <span className={`word ${w === 2 ? 'grad-chars' : ''}`} key={word} aria-hidden="true">
              {word.split('').map((c, i) => <span className="char" key={i}>{c}</span>)}
            </span>
          ))}
        </h2>

        <div className="contact-grid">
          <div className="contact-info">
            <p className="lead">Open to internships, graduate roles and interesting projects. Tell me what you’re building.</p>
            <a className="contact-line" href={`mailto:${profile.email}`}><i className="fa-solid fa-paper-plane" />{profile.email}</a>
            <a className="contact-line" href={`mailto:${profile.altEmail}`}><i className="fa-solid fa-envelope" />{profile.altEmail}</a>
            <a className="contact-line" href={`tel:${profile.phone}`}><i className="fa-solid fa-phone" />{profile.phone}</a>
            <p className="contact-line"><i className="fa-solid fa-location-dot" />{profile.base}</p>
            <div className="socials">
              {profile.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form" name="submit-to-google-sheet" onSubmit={onSubmit}>
            <label>
              <span>Name</span>
              <input type="text" name="Name" placeholder="Your name" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="Email" placeholder="you@example.com" required />
            </label>
            <label>
              <span>Message</span>
              <textarea name="Message" rows="5" placeholder="Tell me about your project or role" />
            </label>
            <button type="submit" className="btn btn-solid" disabled={status.state === 'sending'}>
              {status.state === 'sending' ? 'Sending…' : 'Send message'} <i className="fa-solid fa-arrow-right" />
            </button>
            <p className={`form-status is-${status.state}`} role="status">
              {status.text}
              {status.mailto && <> <a href={status.mailto}>Send it by email instead</a></>}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
