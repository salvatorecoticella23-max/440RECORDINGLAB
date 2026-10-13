import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import type { PlayerState } from '@/hooks/useAudioPlayer';
import type { ABMode } from '@/hooks/useAudioPlayer';

type Props = {
  state: PlayerState;
  trackTitle: string;
  trackArtist: string;
  coverUrl: string;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onVolume: (vol: number) => void;
  onSwitchAB: (mode: ABMode) => void;
  compact?: boolean;
};

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({
  state,
  trackTitle,
  trackArtist,
  coverUrl,
  onTogglePlay,
  onSeek,
  onVolume,
  onSwitchAB,
  compact = false,
}: Props) {
  const progress = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

  return (
    <div className={`flex items-center gap-3 ${compact ? 'w-full' : 'w-full'}`}>
      {/* Play button */}
      <button
        onClick={onTogglePlay}
        disabled={!state.ready && state.currentTrackId !== null}
        className="relative flex-shrink-0 w-11 h-11 rounded-full bg-neon text-black flex items-center justify-center hover:shadow-neon hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:scale-95"
        aria-label={state.isPlaying ? 'Pausa' : 'Riproduci'}
      >
        {state.isPlaying ? (
          <Pause className="w-5 h-5" fill="currentColor" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
        )}
        {state.isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-neon animate-pulse-ring" />
        )}
      </button>

      {/* Track info + progress */}
      <div className="flex-1 min-w-0">
        {/* Title row */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2.5 min-w-0">
            {!compact && (
              <img
                src={coverUrl}
                alt={trackTitle}
                className="w-9 h-9 rounded-md object-cover border border-neon/20 flex-shrink-0"
                loading="lazy"
              />
            )}
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white truncate">{trackTitle}</div>
              <div className="text-xs text-white/50 truncate">{trackArtist}</div>
            </div>
          </div>
          <span className="text-xs font-mono text-neon/70 flex-shrink-0 tabular-nums">
            {formatTime(state.currentTime)} / {formatTime(state.duration)}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="group relative h-1.5 bg-white/10 rounded-full cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            onSeek(pct * state.duration);
          }}
        >
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-dim to-neon rounded-full transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-neon rounded-full shadow-neon-sm opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>
      </div>

      {/* Volume (hidden on mobile in compact mode) */}
      {!compact && (
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onVolume(state.volume > 0 ? 0 : 0.8)}
            className="text-white/50 hover:text-neon transition-colors"
            aria-label={state.volume > 0 ? 'Mute' : 'Unmute'}
          >
            {state.volume > 0 ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={state.volume}
            onChange={(e) => onVolume(parseFloat(e.target.value))}
            className="w-20 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neon [&::-webkit-slider-thumb]:shadow-neon-sm
              [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-neon [&::-moz-range-thumb]:border-none
              bg-[linear-gradient(to_right,#00D2FF_var(--vol,80%),rgba(255,255,255,0.1)_var(--vol,80%))]"
            style={{ ['--vol' as string]: `${state.volume * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
