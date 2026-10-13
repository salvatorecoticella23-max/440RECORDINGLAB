import { useState, useEffect } from 'react';
import { tracks, filters, type Track } from '@/data/content';
import type { useAudioPlayer } from '@/hooks/useAudioPlayer';
import Reveal from '@/components/Reveal';
import AudioPlayer from './AudioPlayer';
import { Headphones, Zap, Play, Pause } from 'lucide-react';

type AudioHook = ReturnType<typeof useAudioPlayer>;

type Props = {
  audio: AudioHook;
};

export default function Showcase({ audio }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>('Tutti');
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const filteredTracks =
    activeFilter === 'Tutti' ? tracks : tracks.filter((t) => t.genre === activeFilter);

  const handleSelectTrack = (track: Track) => {
    if (audio.state.currentTrackId === track.id) {
      audio.togglePlay();
    } else {
      audio.loadTrack(track.id, track.audioBefore, track.audioAfter);
      setSelectedTrack(track);
      setTimeout(() => audio.play(), 400);
    }
  };

  useEffect(() => {
    if (audio.state.currentTrackId) {
      const t = tracks.find((t) => t.id === audio.state.currentTrackId);
      if (t) setSelectedTrack(t);
    } else {
      setSelectedTrack(null);
    }
  }, [audio.state.currentTrackId]);

  return (
    <section id="ascolti" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-neon/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <Reveal direction="up" className="text-center mb-12">
          <span className="text-neon text-sm font-semibold tracking-[0.2em] uppercase">Vetrina Ascolti</span>
          <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Ascolta il <span className="text-gradient-cyan">Risultato</span>
          </h2>
          <Reveal direction="up" delay={150}>
            <p className="mt-4 text-white/50 max-w-xl mx-auto font-light">
              Confronta il suono grezzo con il prodotto finale mixato e masterizzato. Usa il selettore A/B per sentire la differenza.
            </p>
          </Reveal>
        </Reveal>

        {/* Filters */}
        <Reveal direction="up" delay={250} className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-neon text-black shadow-neon-sm'
                  : 'bg-ink-card text-white/60 border border-ink-border hover:border-neon/40 hover:text-neon'
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>

        {/* Track grid + Player panel */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Track list */}
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredTracks.map((track, i) => {
              const isActive = audio.state.currentTrackId === track.id;
              return (
                <Reveal key={track.id} direction="up" delay={i * 80} duration={600}>
                  <div
                    onClick={() => handleSelectTrack(track)}
                    className={`group relative cursor-pointer rounded-2xl overflow-hidden border transition-all duration-500 ${
                      isActive
                        ? 'border-neon/60 shadow-neon-sm'
                        : 'border-ink-border hover:border-neon/30'
                    }`}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <div className="w-14 h-14 rounded-full bg-neon/90 backdrop-blur flex items-center justify-center">
                          {isActive && audio.state.isPlaying ? (
                            <Pause className="w-6 h-6 text-black" fill="currentColor" />
                          ) : (
                            <Play className="w-6 h-6 text-black ml-0.5" fill="currentColor" />
                          )}
                        </div>
                      </div>

                      {isActive && (
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon/90 text-black text-xs font-semibold">
                          {audio.state.isPlaying ? (
                            <span className="flex items-end gap-0.5 h-3">
                              <span className="w-0.5 h-2 bg-black rounded-full" style={{ animation: 'wave-bounce 0.6s ease-in-out infinite' }} />
                              <span className="w-0.5 h-3 bg-black rounded-full" style={{ animation: 'wave-bounce 0.6s ease-in-out 0.2s infinite' }} />
                              <span className="w-0.5 h-1.5 bg-black rounded-full" style={{ animation: 'wave-bounce 0.6s ease-in-out 0.4s infinite' }} />
                            </span>
                          ) : (
                            <span className="w-1.5 h-1.5 bg-black rounded-full" />
                          )}
                          In riproduzione
                        </div>
                      )}

                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-neon/20 text-xs font-medium text-neon">
                        {track.genre}
                      </div>
                    </div>

                    <div className="p-4 bg-ink-card">
                      <div className="font-semibold text-white text-sm truncate">{track.title}</div>
                      <div className="text-xs text-white/50 truncate mt-0.5">{track.artist}</div>
                      <div className="text-xs text-neon/70 mt-1.5 flex items-center gap-1">
                        <Headphones className="w-3 h-3" />
                        {track.service}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Player Panel */}
          <Reveal direction="left" delay={200} duration={700} className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl bg-ink-card border border-neon/20 overflow-hidden shadow-card">
              {selectedTrack && (
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={selectedTrack.cover}
                    alt={selectedTrack.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      audio.state.isPlaying ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-transparent to-transparent" />
                  {audio.state.isPlaying && <div className="absolute inset-0 bg-neon/5" />}
                </div>
              )}

              <div className="p-5 space-y-4">
                {/* Track title + description */}
                {selectedTrack && (
                  <div>
                    <div className="font-display font-bold text-lg text-white truncate">
                      {selectedTrack.title}
                    </div>
                    <div className="text-sm text-white/50">{selectedTrack.artist}</div>
                    {selectedTrack.description && (
                      <p className="mt-2 text-xs text-neon/70 leading-relaxed">
                        {selectedTrack.description}
                      </p>
                    )}
                  </div>
                )}

                {/* A/B Toggle */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-neon" />
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">A/B Confronto</span>
                  </div>
                  <div className="relative flex rounded-full bg-black border border-ink-border p-1">
                    <button
                      onClick={() => audio.switchAB('before')}
                      disabled={!selectedTrack}
                      className={`relative z-10 flex-1 py-2 text-xs font-semibold rounded-full transition-colors duration-300 ${
                        audio.state.abMode === 'before' ? 'text-black' : 'text-white/50 hover:text-white/80'
                      } disabled:opacity-40`}
                    >
                      Before · Grezzo
                    </button>
                    <button
                      onClick={() => audio.switchAB('after')}
                      disabled={!selectedTrack}
                      className={`relative z-10 flex-1 py-2 text-xs font-semibold rounded-full transition-colors duration-300 ${
                        audio.state.abMode === 'after' ? 'text-black' : 'text-white/50 hover:text-white/80'
                      } disabled:opacity-40`}
                    >
                      After · Mix & Master
                    </button>
                    <div
                      className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-neon transition-transform duration-300 ease-out"
                      style={{
                        transform:
                          audio.state.abMode === 'before' ? 'translateX(0)' : 'translateX(calc(100% + 8px))',
                      }}
                    />
                  </div>
                </div>

                {/* Player */}
                {selectedTrack ? (
                  <AudioPlayer
                    state={audio.state}
                    trackTitle={selectedTrack.title}
                    trackArtist={selectedTrack.artist}
                    coverUrl={selectedTrack.cover}
                    onTogglePlay={audio.togglePlay}
                    onSeek={audio.seek}
                    onVolume={audio.setVolume}
                    onSwitchAB={audio.switchAB}
                  />
                ) : (
                  <div className="py-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-neon/10 border border-neon/20 flex items-center justify-center mx-auto mb-3">
                      <Play className="w-6 h-6 text-neon/50 ml-0.5" />
                    </div>
                    <p className="text-sm text-white/40">Seleziona un brano per iniziare l&apos;ascolto</p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
