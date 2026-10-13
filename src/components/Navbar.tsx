import { useEffect, useState } from 'react';
import { Menu, X, Radio } from 'lucide-react';

const links = [
  { href: '#chi-sono', label: 'Chi Sono' },
  { href: '#ascolti', label: 'Ascolti' },
  { href: '#servizi', label: 'Servizi' },
  { href: '#gear', label: 'Strumentazione' },
  { href: '#contatti', label: 'Contatti' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => setOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-xl border-b border-neon/15 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group" onClick={handleClick}>
          <div className="relative">
            <Radio className="w-7 h-7 text-neon group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            <div className="absolute inset-0 bg-neon/30 blur-md group-hover:bg-neon/50 transition-colors" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            440 <span className="text-neon neon-text">Recording Lab</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-neon transition-colors relative group"
            >
              {l.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-neon group-hover:w-3/4 transition-all duration-300" />
            </a>
          ))}
        </div>

        <a
          href="#contatti"
          className="hidden lg:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-black bg-neon rounded-full hover:shadow-neon hover:scale-105 transition-all duration-300"
        >
          Prenota una Sessione
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden text-neon p-1.5"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/95 backdrop-blur-xl border-t border-neon/10 px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={handleClick}
              className="py-3 text-base font-medium text-white/80 hover:text-neon transition-colors border-b border-white/5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contatti"
            onClick={handleClick}
            className="mt-3 text-center py-3 font-semibold text-black bg-neon rounded-full"
          >
            Prenota una Sessione
          </a>
        </div>
      </div>
    </nav>
  );
}
