import { services } from '@/data/content';
import Reveal from '@/components/Reveal';
import { ArrowUpRight } from 'lucide-react';

export default function Services() {
  return (
    <section id="servizi" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon/8 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <Reveal direction="up" className="text-center mb-14">
          <span className="text-neon text-sm font-semibold tracking-[0.2em] uppercase">Servizi</span>
          <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Cosa <span className="text-gradient-cyan">Facciamo</span>
          </h2>
          <Reveal direction="up" delay={150}>
            <p className="mt-4 text-white/50 max-w-xl mx-auto font-light">
              Un percorso completo dalla registrazione al prodotto finito, con standard professionali a ogni fase.
            </p>
          </Reveal>
        </Reveal>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <Reveal key={service.id} direction="up" delay={i * 120} duration={600}>
              <div className="group relative p-6 rounded-2xl bg-ink-card border border-ink-border hover:border-neon/50 transition-all duration-500 hover:-translate-y-1 h-full">
                <div className="absolute inset-0 rounded-2xl bg-neon/0 group-hover:bg-neon/5 transition-colors duration-500" />

                <div className="relative mb-5">
                  <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center group-hover:shadow-neon-sm transition-all duration-300">
                    <service.icon className="w-6 h-6 text-neon group-hover:scale-110 transition-transform" strokeWidth={2} />
                  </div>
                </div>

                <div className="relative">
                  <h3 className="font-display font-bold text-xl text-white">{service.title}</h3>
                  <p className="text-xs text-neon font-medium mt-1">{service.subtitle}</p>
                  <p className="mt-3 text-sm text-white/50 leading-relaxed font-light">{service.description}</p>

                  <ul className="mt-5 space-y-2">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-white/40">
                        <span className="w-1 h-1 rounded-full bg-neon flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-neon" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
