import { ArrowRight, Radio, Waves } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20 sm:pb-0">
      {/* Background layers */}
      <div className="absolute inset-0">
        <img
          src="/images/ed2d2208-7cd5-4549-bb92-5efbe3e7cd77.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-lg opacity-80"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/8 rounded-full blur-[150px]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-neon/30 bg-neon/5 backdrop-blur-sm opacity-0 translate-y-4"
          style={{ animation: 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s forwards' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-neon opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon glow-dot" />
          </span>
          <span className="text-xs font-medium text-neon tracking-wider uppercase">Studio Aperto · Prenotazioni Attive</span>
        </div>

        {/* Title */}
        <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-2">
          <span
            className="block text-white opacity-0 translate-y-6"
            style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s forwards' }}
          >
            440
          </span>
          <span
            className="block text-gradient-cyan neon-text opacity-0 translate-y-6"
            style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s forwards' }}
          >
            Recording Lab
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6 text-lg sm:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed opacity-0 translate-y-4"
          style={{ animation: 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.6s forwards' }}
        >
          Diamo forma al tuo suono.{' '}
          <span className="text-neon-bright font-medium">Registrazione, Mix e Mastering.</span>
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 translate-y-4"
          style={{ animation: 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.75s forwards' }}
        >
          <a
            href="#contatti"
            className="group inline-flex items-center gap-2 px-7 py-4 bg-neon text-black font-semibold rounded-full hover:shadow-neon-lg hover:scale-105 transition-all duration-300"
          >
            Prenota una Sessione
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#ascolti"
            className="group inline-flex items-center gap-2 px-7 py-4 border border-neon/40 text-neon font-semibold rounded-full hover:bg-neon/10 hover:border-neon transition-all duration-300"
          >
            <Waves className="w-5 h-5" />
            Ascolta i Lavori
          </a>
        </div>

        {/* Stats */}
        <div
          className="mt-14 sm:mt-16 grid grid-cols-3 gap-2 sm:gap-6 max-w-md sm:max-w-lg mx-auto opacity-0 translate-y-4 px-2"
          style={{ animation: 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.9s forwards' }}
        >
          {[
            { value: '440Hz', label: 'Reference' },
            { value: '100%', label: 'Full ITB' },
            { value: '∞', label: 'Dettaglio' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="text-center opacity-0 translate-y-3 min-w-0"
              style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) ${1 + i * 0.1}s forwards` }}
            >
              <div className="font-display font-bold text-xl sm:text-3xl text-gradient-cyan leading-none">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-white/40 mt-1.5 uppercase tracking-tight sm:tracking-wide break-words leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — hidden on short/mobile screens to avoid overlap */}
      <div
        className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0"
        style={{ animation: 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.4s forwards' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-neon/40 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-neon rounded-full animate-scroll-down" />
        </div>
      </div>

      {/* Decorative radio icon */}
      <div className="absolute top-24 right-10 hidden lg:block opacity-10">
        <Radio className="w-32 h-32 text-neon animate-spin-slow" strokeWidth={1} />
      </div>
    </section>
  );
}
