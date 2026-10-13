import { useEffect, useState } from 'react';
import { tracks, type Track } from '@/data/content';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Showcase from '@/components/Showcase';
import Services from '@/components/Services';
import Gear from '@/components/Gear';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import StickyPlayer from '@/components/StickyPlayer';

function App() {
  const audio = useAudioPlayer();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  useEffect(() => {
    if (audio.state.currentTrackId) {
      const t = tracks.find((t) => t.id === audio.state.currentTrackId);
      setCurrentTrack(t ?? null);
    } else {
      setCurrentTrack(null);
    }
  }, [audio.state.currentTrackId]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Showcase audio={audio} />
        <Services />
        <Gear />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <StickyPlayer
        state={audio.state}
        track={currentTrack}
        onTogglePlay={audio.togglePlay}
        onSeek={audio.seek}
        onVolume={audio.setVolume}
        onSwitchAB={audio.switchAB}
        onStop={audio.stop}
      />
      {/* Bottom padding for sticky player */}
      {currentTrack && <div className="h-20" />}
    </div>
  );
}

export default App;
