import { useEffect, useState } from 'react';
import { initSmoothScroll, setScrollLocked, ScrollTrigger } from './lib/scroll.js';
import Loader from './components/Loader.jsx';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Statement from './components/Statement.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Work from './components/Work.jsx';
import Repos from './components/Repos.jsx';
import Skills from './components/Skills.jsx';
import Beyond from './components/Beyond.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const destroy = initSmoothScroll();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return destroy;
  }, []);

  useEffect(() => {
    setScrollLocked(!loaded);
    if (loaded) ScrollTrigger.refresh();
  }, [loaded]);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <Cursor />
      <Nav />
      <main>
        <Hero ready={loaded} />
        <Statement />
        <About />
        <Experience />
        <Work />
        <Repos />
        <Skills />
        <Beyond />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
