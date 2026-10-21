import { scrollTo } from '../lib/scroll.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Othman Ali. Built with React &amp; GSAP.</p>
        <button className="to-top" onClick={() => scrollTo(null)}>
          Back to top <i className="fa-solid fa-arrow-up" />
        </button>
      </div>
    </footer>
  );
}
