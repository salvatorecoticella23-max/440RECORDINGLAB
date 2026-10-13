import { useState } from 'react';
import Reveal from '@/components/Reveal';
import { Send, MapPin, Mail, Clock } from 'lucide-react';
import SocialLinks from '@/components/SocialLinks';

const jobTypes = [
  'Registrazione',
  'Mixing',
  'Mastering',
  'Produzione & Consulenza',
  'Altro',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    jobType: jobTypes[0],
    demoLink: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', jobType: jobTypes[0], demoLink: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contatti" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-neon/10 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <Reveal direction="up" className="text-center mb-14">
          <span className="text-neon text-sm font-semibold tracking-[0.2em] uppercase">Contatti</span>
          <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Inizia il tuo <span className="text-gradient-cyan">Progetto</span>
          </h2>
          <Reveal direction="up" delay={150}>
            <p className="mt-4 text-white/50 max-w-xl mx-auto font-light">
              Raccontami la tua idea, inviami un demo e riceverai una proposta personalizzata.
            </p>
          </Reveal>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          {/* Form */}
          <Reveal direction="right" duration={700}>
            <form
              onSubmit={handleSubmit}
              className="p-6 lg:p-8 rounded-2xl bg-ink-card border border-ink-border space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-ink-border rounded-xl text-white text-sm placeholder-white/30 focus:border-neon focus:outline-none focus:shadow-neon-sm transition-all"
                    placeholder="Il tuo nome"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-ink-border rounded-xl text-white text-sm placeholder-white/30 focus:border-neon focus:outline-none focus:shadow-neon-sm transition-all"
                    placeholder="email@esempio.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  Tipo di lavoro
                </label>
                <select
                  value={form.jobType}
                  onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-ink-border rounded-xl text-white text-sm focus:border-neon focus:outline-none focus:shadow-neon-sm transition-all appearance-none"
                >
                  {jobTypes.map((t) => (
                    <option key={t} value={t} className="bg-black">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  Link demo o file
                </label>
                <input
                  type="url"
                  value={form.demoLink}
                  onChange={(e) => setForm({ ...form, demoLink: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-ink-border rounded-xl text-white text-sm placeholder-white/30 focus:border-neon focus:outline-none focus:shadow-neon-sm transition-all"
                  placeholder="https://soundcloud.com/... o link WeTransfer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  Messaggio
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-ink-border rounded-xl text-white text-sm placeholder-white/30 focus:border-neon focus:outline-none focus:shadow-neon-sm transition-all resize-none"
                  placeholder="Descrivi il tuo progetto, riferimenti artistici, scadenze..."
                />
              </div>

              <button
                type="submit"
                disabled={sent}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  sent
                    ? 'bg-neon/20 text-neon border border-neon/40'
                    : 'bg-neon text-black hover:shadow-neon hover:scale-[1.02]'
                }`}
              >
                {sent ? (
                  'Messaggio inviato con successo'
                ) : (
                  <>
                    Invia richiesta
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </Reveal>

          {/* Contact info sidebar */}
          <div className="space-y-4">
            <Reveal direction="left" delay={150} duration={700}>
              <div className="p-6 rounded-2xl bg-ink-card border border-ink-border">
                <h3 className="font-display font-bold text-lg text-white mb-4">Dettagli</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-neon" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">Studio</div>
                      <div className="text-sm text-white mt-0.5">440 Recording Lab</div>
                      <div className="text-xs text-white/50">Italia · Sessioni in studio e remote</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-neon" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">Email</div>
                      <a href="mailto:440recordinglab@gmail.com" className="text-sm text-neon mt-0.5 hover:underline">440recordinglab@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-neon" />
                    </div>
                    <div className="min-w-0 w-full">
                      <div className="text-xs text-white/40 uppercase tracking-wider">Orari</div>
                      <div className="mt-1.5 space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white">Lun - Ven</span>
                          <span className="text-neon font-medium">09:00 - 19:00</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white">Sabato</span>
                          <span className="text-neon font-medium">09:00 - 13:00</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white">Domenica</span>
                          <span className="text-white/40">Chiuso</span>
                        </div>
                      </div>
                      <div className="text-xs text-white/40 mt-2">Su appuntamento</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={300} duration={700}>
              <div className="p-6 rounded-2xl bg-ink-card border border-ink-border">
                <h3 className="font-display font-bold text-lg text-white mb-4">Seguimi</h3>
                <SocialLinks />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
