import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';
import type { PlayerState, ABMode } from '@/hooks/useAudioPlayer';
import type { Track } from '@/data/content';

type Props = {
  state: PlayerState;
  track: Track | null;
  onTogglePlay: () => void;
  onSeek: (t: number) => void;
  onVolume: (v: number) => void;
  onSwitchAB: (m: ABMode) => void;
  onStop: () => void;
};

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function StickyPlayer({ state, track, onTogglePlay, onSeek, onVolume, onSwitchAB, onStop }: Props) {
  if (!track || state.currentTrackId === null) return null;

  const progress = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <div className="bg-ink-card/95 backdrop-blur-xl border border-neon/25 rounded-2xl shadow-neon-lg overflow-hidden">
          {/* Progress line at top */}
          <div
            className="h-0.5 bg-white/10 cursor-pointer relative group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              onSeek(pct * state.duration);
            }}
          >
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-dim to-neon"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
            {/* Cover */}
            <img
              src={track.cover}
              alt={track.title}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg object-cover border border-neon/20 flex-shrink-0"
            />

            {/* Track info */}
            <div className="hidden sm:block min-w-0 w-32 lg:w-40 flex-shrink-0">
              <div className="text-sm font-semibold text-white truncate">{track.title}</div>
              <div className="text-xs text-white/40 truncate">{track.artist}</div>
            </div>

            {/* Play / pause */}
            <button
              onClick={onTogglePlay}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-neon text-black flex items-center justify-center hover:scale-110 transition-transform"
              aria-label={state.isPlaying ? 'Pausa' : 'Riproduci'}
            >
              {state.isPlaying ? (
                <Pause className="w-4 h-4" fill="currentColor" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
              )}
            </button>

            {/* Time + seek (desktop) */}
            <div className="hidden md:flex items-center gap-2 flex-1 min-w-0">
              <span className="text-xs font-mono text-neon/60 tabular-nums flex-shrink-0">
                {formatTime(state.currentTime)}
              </span>
              <div
                className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer relative group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  onSeek(pct * state.duration);
                }}
              >
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-dim to-neon rounded-full"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-neon rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `calc(${progress}% - 5px)` }}
                />
              </div>
              <span className="text-xs font-mono text-white/30 tabular-nums flex-shrink-0">
                {formatTime(state.duration)}
              </span>
            </div>

            {/* A/B toggle */}
            <div className="flex items-center rounded-full bg-black border border-ink-border p-0.5 flex-shrink-0">
              <button
                onClick={() => onSwitchAB('before')}
                className={`px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-semibold rounded-full transition-colors ${
                  state.abMode === 'before' ? 'bg-neon text-black' : 'text-white/40 hover:text-white/70'
                }`}
              >
                Before
              </button>
              <button
                onClick={() => onSwitchAB('after')}
                className={`px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-semibold rounded-full transition-colors ${
                  state.abMode === 'after' ? 'bg-neon text-black' : 'text-white/40 hover:text-white/70'
                }`}
              >
                After
              </button>
            </div>

            {/* Volume (desktop only) */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onVolume(state.volume > 0 ? 0 : 0.8)}
                className="text-white/40 hover:text-neon transition-colors"
              >
                {state.volume > 0 ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={state.volume}
                onChange={(e) => onVolume(parseFloat(e.target.value))}
                className="w-16 h-1 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neon
                  [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-neon [&::-moz-range-thumb]:border-none
                  bg-[linear-gradient(to_right,#00D2FF_var(--vol,80%),rgba(255,255,255,0.1)_var(--vol,80%))]"
                style={{ ['--vol' as string]: `${state.volume * 100}%` }}
              />
            </div>

            {/* Close */}
            <button
              onClick={onStop}
              className="flex-shrink-0 w-8 h-8 rounded-lg text-white/40 hover:text-neon hover:bg-neon/10 flex items-center justify-center transition-colors"
              aria-label="Chiudi player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
