import { Radio, Heart } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SocialLinks from '@/components/SocialLinks';

export default function Footer() {
  return (
    <footer className="relative border-t border-neon/10 pt-16 pb-8 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-neon/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <Reveal direction="up" delay={0}>
            <div className="flex items-center gap-2.5 mb-4">
              <Radio className="w-7 h-7 text-neon" strokeWidth={2.5} />
              <span className="font-display font-bold text-lg">
                440 <span className="text-neon">Recording Lab</span>
              </span>
            </div>
            <p className="text-sm text-white/40 font-light leading-relaxed max-w-xs">
              Studio di registrazione, mix e mastering professionale.
              Diamo forma al tuo suono.
            </p>
          </Reveal>

          {/* Quick links */}
          <Reveal direction="up" delay={120}>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Navigazione</h4>
            <ul className="space-y-2">
              {[
                { href: '#chi-sono', label: 'Chi Sono' },
                { href: '#ascolti', label: 'Ascolti' },
                { href: '#servizi', label: 'Servizi' },
                { href: '#gear', label: 'Strumentazione' },
                { href: '#contatti', label: 'Contatti' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/50 hover:text-neon transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Social + contact */}
          <Reveal direction="up" delay={240}>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Collegati</h4>
            <div className="mb-4">
              <SocialLinks size="sm" />
            </div>
            <a
              href="mailto:440recordinglab@gmail.com"
              className="text-sm text-white/50 hover:text-neon transition-colors"
            >
              440recordinglab@gmail.com
            </a>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <Reveal direction="up" delay={360}>
          <div className="pt-8 border-t border-ink-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} 440 Recording Lab. Tutti i diritti riservati.
            </p>
            <p className="text-xs text-white/30 flex items-center gap-1.5">
              Realizzato con <Heart className="w-3 h-3 text-neon fill-neon" /> per il suono
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
