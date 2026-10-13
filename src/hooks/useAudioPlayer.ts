import { useRef, useState, useCallback, useEffect } from 'react';

export type ABMode = 'before' | 'after';

export type PlayerState = {
  currentTrackId: number | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  abMode: ABMode;
  ready: boolean;
};

export function useAudioPlayer() {
  const audioBeforeRef = useRef<HTMLAudioElement | null>(null);
  const audioAfterRef = useRef<HTMLAudioElement | null>(null);

  const [state, setState] = useState<PlayerState>({
    currentTrackId: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    abMode: 'after',
    ready: false,
  });

  // Create audio elements on mount
  useEffect(() => {
    audioBeforeRef.current = new Audio();
    audioAfterRef.current = new Audio();
    audioBeforeRef.current.preload = 'metadata';
    audioAfterRef.current.preload = 'metadata';
    audioBeforeRef.current.volume = 0.8;
    audioAfterRef.current.volume = 0.8;

    return () => {
      audioBeforeRef.current?.pause();
      audioAfterRef.current?.pause();
    };
  }, []);

  const getActiveAudio = useCallback(() => {
    return state.abMode === 'before' ? audioBeforeRef.current : audioAfterRef.current;
  }, [state.abMode]);

  // Set up listeners on BOTH audio elements so metadata loads for both
  const setupListeners = useCallback(
    (audio: HTMLAudioElement, which: ABMode) => {
      audio.ontimeupdate = () => {
        // Only update currentTime from the active element
        setState((s) => {
          if ((which === 'before' && s.abMode !== 'before') || (which === 'after' && s.abMode !== 'after')) {
            return s;
          }
          return { ...s, currentTime: audio.currentTime };
        });
      };
      audio.onloadedmetadata = () => {
        setState((s) => {
          const activeIsThis =
            (which === 'before' && s.abMode === 'before') || (which === 'after' && s.abMode === 'after');
          if (!activeIsThis) return s;
          return { ...s, duration: audio.duration || 0, ready: true };
        });
      };
      audio.onended = () => {
        setState((s) => {
          const activeIsThis =
            (which === 'before' && s.abMode === 'before') || (which === 'after' && s.abMode === 'after');
          if (!activeIsThis) return s;
          return { ...s, isPlaying: false, currentTime: 0 };
        });
      };
      audio.onplay = () => {
        setState((s) => {
          const activeIsThis =
            (which === 'before' && s.abMode === 'before') || (which === 'after' && s.abMode === 'after');
          if (!activeIsThis) return s;
          return { ...s, isPlaying: true };
        });
      };
      audio.onpause = () => {
        setState((s) => {
          const activeIsThis =
            (which === 'before' && s.abMode === 'before') || (which === 'after' && s.abMode === 'after');
          if (!activeIsThis) return s;
          return { ...s, isPlaying: false };
        });
      };
    },
    [],
  );

  const loadTrack = useCallback(
    (trackId: number, beforeUrl: string, afterUrl: string) => {
      const before = audioBeforeRef.current!;
      const after = audioAfterRef.current!;

      before.src = beforeUrl;
      after.src = afterUrl;
      before.load();
      after.load();

      // Set up listeners on BOTH elements so both load metadata
      setupListeners(before, 'before');
      setupListeners(after, 'after');

      setState((s) => ({
        ...s,
        currentTrackId: trackId,
        currentTime: 0,
        duration: 0,
        ready: false,
        isPlaying: false,
      }));
    },
    [setupListeners],
  );

  const play = useCallback(() => {
    const audio = getActiveAudio();
    if (audio && audio.src) {
      audio.play().catch((err) => {
        // eslint-disable-next-line no-console
        console.warn('Playback error:', err);
      });
    }
  }, [getActiveAudio]);

  const pause = useCallback(() => {
    audioBeforeRef.current?.pause();
    audioAfterRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, pause, play]);

  const seek = useCallback(
    (time: number) => {
      const audio = getActiveAudio();
      if (audio) {
        audio.currentTime = time;
        setState((s) => ({ ...s, currentTime: time }));
      }
    },
    [getActiveAudio],
  );

  const setVolume = useCallback((vol: number) => {
    if (audioBeforeRef.current) audioBeforeRef.current.volume = vol;
    if (audioAfterRef.current) audioAfterRef.current.volume = vol;
    setState((s) => ({ ...s, volume: vol }));
  }, []);

  const switchAB = useCallback(
    (mode: ABMode) => {
      if (mode === state.abMode) return;

      const wasPlaying = state.isPlaying;
      const currentTime = state.currentTime;

      audioBeforeRef.current?.pause();
      audioAfterRef.current?.pause();

      const newAudio = mode === 'before' ? audioBeforeRef.current : audioAfterRef.current;

      if (newAudio && newAudio.src) {
        // If metadata is already loaded, sync currentTime immediately.
        // Otherwise the play() will start from 0 and currentTime will be set
        // once metadata loads (handled by a temporary listener below).
        if (newAudio.readyState >= 1) {
          try {
            newAudio.currentTime = currentTime;
          } catch {
            // ignore seek errors before metadata
          }
        }
        if (wasPlaying) {
          newAudio.play().catch((err) => {
            // eslint-disable-next-line no-console
            console.warn('Switch AB play error:', err);
          });
        }
      }

      setState((s) => {
        const newAudioEl = mode === 'before' ? audioBeforeRef.current : audioAfterRef.current;
        const isReady = !!newAudioEl && newAudioEl.readyState >= 1;
        const dur = isReady ? newAudioEl!.duration || 0 : s.duration;
        return { ...s, abMode: mode, duration: dur, ready: isReady || s.ready };
      });
    },
    [state.abMode, state.isPlaying, state.currentTime],
  );

  const stop = useCallback(() => {
    audioBeforeRef.current?.pause();
    audioAfterRef.current?.pause();
    if (audioBeforeRef.current) audioBeforeRef.current.currentTime = 0;
    if (audioAfterRef.current) audioAfterRef.current.currentTime = 0;
    setState((s) => ({
      ...s,
      isPlaying: false,
      currentTime: 0,
      currentTrackId: null,
      ready: false,
    }));
  }, []);

  return {
    state,
    loadTrack,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
    switchAB,
    stop,
  };
}
