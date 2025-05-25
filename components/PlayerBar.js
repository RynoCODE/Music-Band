import { useContext, useRef, useEffect, useState } from 'react';
import { AppContext } from '../pages/_app';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function PlayerBar() {
  const { currentSong, isPlaying, setIsPlaying, setCurrentSong, playlist, setPlaylist, volume, setVolume } = useContext(AppContext);
  const audioRef = useRef();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;
    const update = () => setProgress(audioRef.current.currentTime / audioRef.current.duration || 0);
    audioRef.current.addEventListener('timeupdate', update);
    return () => audioRef.current.removeEventListener('timeupdate', update);
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Seek
  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
    setProgress(percent);
  };
  
  const handleSkip = (dir) => {
    if (!currentSong || !playlist || playlist.length === 0) return;
    const idx = playlist.findIndex((s) => s.id === currentSong.id);
    
    if (idx === -1) {
      setCurrentSong(playlist[0]);
      return;
    }
    let nextIdx = dir === 1 ? idx + 1 : idx - 1;
    if (nextIdx < 0) nextIdx = playlist.length - 1;
    if (nextIdx >= playlist.length) nextIdx = 0;
    setCurrentSong(playlist[nextIdx]);
    setIsPlaying(true);
  };

  if (!currentSong) return <div className="h-24" />;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-neutral-800 h-24 flex items-center px-4 z-50">
      <img src={currentSong.albumArt} alt="Album" className="w-16 h-16 rounded-xl mr-4" />
      <div className="flex flex-col justify-center mr-6">
        <span className="font-semibold">{currentSong.title}</span>
        <span className="text-sm text-neutral-400">{currentSong.artist}</span>
      </div>
      <div className="flex items-center gap-4 flex-1">
        <button onClick={() => handleSkip(-1)} className="p-2 hover:bg-accent/20 rounded-full"><SkipBack /></button>
        <button onClick={() => setIsPlaying((p) => !p)} className="p-2 hover:bg-accent/20 rounded-full">
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button onClick={() => handleSkip(1)} className="p-2 hover:bg-accent/20 rounded-full"><SkipForward /></button>
        <div className="flex-1 mx-4">
          <div className="h-2 bg-neutral-700 rounded-full cursor-pointer" onClick={handleSeek}>
            <div className="h-2 bg-accent rounded-full" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
        <Volume2 />
        <input type="range" min={0} max={1} step={0.01} value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-24 ml-2 accent-accent" />
      </div>
      <audio ref={audioRef} src={currentSong.audio} onEnded={() => handleSkip(1)} />
    </div>
  );
}
