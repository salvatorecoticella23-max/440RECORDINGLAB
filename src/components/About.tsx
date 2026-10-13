import { Headphones, Award, Sparkles, Heart } from 'lucide-react';
import Reveal from '@/components/Reveal';

const values = [
  { icon: Headphones, title: 'Ascolto Critico', text: 'Ogni decisione parte dall\'orecchio, non dal solo tecnico.' },
  { icon: Award, title: 'Standard Elevati', text: 'Riferimento a 440Hz per coerenza e precisione assoluta.' },
  { icon: Sparkles, title: 'Cura del Dettaglio', text: 'Dal rumore di fondo alla dinamica, nulla è lasciato al caso.' },
  { icon: Heart, title: 'Passione Reale', text: 'Ogni progetto è trattato come se fosse il mio.' },
];

export default function About() {
  return (
    <section id="chi-sono" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-neon/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section header */}
        <Reveal direction="up" className="text-center mb-16">
          <span className="text-neon text-sm font-semibold tracking-[0.2em] uppercase">Chi Sono</span>
          <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Salvatore — <span className="text-gradient-cyan">Resident Engineer</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <Reveal direction="left" duration={800}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-neon/40 to-transparent rounded-2xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl border border-neon/20">
                <img
                  src="/images/ed2d2208-7cd5-4549-bb92-5efbe3e7cd77.jpg"
                  alt="Salvatore - Fonico Residente del 440 Recording Lab"
                  className="w-full h-[400px] lg:h-[560px] object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/70 backdrop-blur-md border border-neon/30 rounded-xl p-4">
                    <div className="font-display font-bold text-xl text-white">Salvatore</div>
                    <div className="text-neon text-sm font-medium">Fonico Residente · 440 Recording Lab</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bio text */}
          <div className="space-y-6">
            <Reveal direction="right" delay={100}>
              <p className="text-lg text-white/80 leading-relaxed font-light">
                Sono <span className="text-neon font-medium">Salvatore</span>, fonico residente e fondatore del 440 Recording Lab.
                Il mio percorso nel mondo dell\'audio engineering nasce dalla passione per il suono e dalla costante ricerca
                della qualità assoluta. Una formazione approfondita, anni di esperienza sul campo e una vera ossessione
                per il dettaglio definiscono ogni progetto che entersa nel mio studio.
              </p>
            </Reveal>

            <Reveal direction="right" delay={200}>
              <p className="text-base text-white/60 leading-relaxed font-light">
                Al 440 Recording Lab applico un approccio ITB puro, dove la precisione del workflow ITB viene valorizzata da scelte tecniche consapevoli. Credo che ogni brano abbia un'anima, e il mio lavoro
                consiste nel valorizzarla attraverso scelte tecniche curate: dall'acquisizione della fonte,
                al bilanciamento delle frequenze, fino all'ultimo passaggio di mastering.
              </p>
            </Reveal>

            <Reveal direction="right" delay={300}>
              <p className="text-base text-white/60 leading-relaxed font-light">
                La mia filosofia si basa su un principio semplice: <span className="text-neon-bright">ascoltare prima di agire</span>.
                Ogni decisione di mix o mastering nasce da un\'analisi attenta e da un confronto continuo con l\'artista,
                per garantire che il risultato finale rispecchi fedelmente la visione creativa di partenza.
              </p>
            </Reveal>

            {/* Values grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {values.map((v, i) => (
                <Reveal key={v.title} direction="up" delay={400 + i * 100}>
                  <div className="group p-4 rounded-xl bg-ink-card border border-ink-border hover:border-neon/40 transition-all duration-300 h-full">
                    <v.icon className="w-6 h-6 text-neon mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-semibold text-white text-sm">{v.title}</div>
                    <div className="text-xs text-white/50 mt-1 leading-relaxed">{v.text}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
