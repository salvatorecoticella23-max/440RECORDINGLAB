import { gear } from '@/data/content';
import Reveal from '@/components/Reveal';
import { AudioLines, Speaker, Headphones, Mic } from 'lucide-react';

const categoryIcons: Record<string, typeof Mic> = {
  'Interfaccia Audio': AudioLines,
  Monitoraggio: Speaker,
  'Gestione Cuffie': Headphones,
  Microfoni: Mic,
};

export default function Gear() {
  return (
    <section id="gear" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon/6 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <Reveal direction="up" className="text-center mb-14">
          <span className="text-neon text-sm font-semibold tracking-[0.2em] uppercase">Strumentazione</span>
          <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Gear <span className="text-gradient-cyan">List</span>
          </h2>
          <Reveal direction="up" delay={150}>
            <p className="mt-4 text-white/50 max-w-xl mx-auto font-light">
              L'attrezzatura dello studio, selezionata per garantire qualità e affidabilità a ogni sessione.
            </p>
          </Reveal>
        </Reveal>

        {/* Gear grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gear.map((cat, i) => {
            const Icon = categoryIcons[cat.category] || Mic;
            return (
              <Reveal key={cat.category} direction="scale" delay={i * 120} duration={600}>
                <div className="group p-6 rounded-2xl bg-ink-card border border-ink-border hover:border-neon/40 transition-all duration-500 h-full">
                  <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center mb-4 group-hover:shadow-neon-sm transition-all">
                    <Icon className="w-6 h-6 text-neon" strokeWidth={2} />
                  </div>

                  <h3 className="text-xs font-semibold text-neon/70 uppercase tracking-wider mb-3">
                    {cat.category}
                  </h3>

                  <div className="space-y-3">
                    {cat.items.map((item) => (
                      <div key={item.name}>
                        <div className="font-display font-bold text-base text-white">{item.name}</div>
                        <div className="text-xs text-white/40 mt-0.5 font-light">{item.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Marquee strip */}
        <Reveal direction="up" delay={200} className="mt-16">
          <div className="overflow-hidden border-y border-neon/10 py-5">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className="flex gap-8 items-center text-white/20 font-display font-bold text-2xl">
                  <span>440 RECORDING LAB</span>
                  <span className="text-neon">●</span>
                  <span>REGISTRAZIONE</span>
                  <span className="text-neon">●</span>
                  <span>MIXING</span>
                  <span className="text-neon">●</span>
                  <span>MASTERING</span>
                  <span className="text-neon">●</span>
                  <span>PRODUZIONE</span>
                  <span className="text-neon">●</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
