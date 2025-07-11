import Header from './components/Header';
import Hero from './components/Hero';
import News from './components/News';
import About from './components/About';
import Keynote from './components/Keynote';
import Access from './components/Access';
import Sponsors from './components/Sponsors';
import Speakers from './components/Speakers';
import Supporters from './components/Supporters';
import Staff from './components/Staff';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header isScrolled={isScrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <News />
      <About />
      <Keynote />
      <Access />
      <Sponsors />
      <Speakers />
      <Supporters />
      <Staff />
      <Footer />
    </div>
  );
}