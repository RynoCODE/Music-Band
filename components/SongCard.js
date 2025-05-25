import { Play } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../pages/_app';

export default function SongCard({ song, playlist }) {
  const { setCurrentSong, setIsPlaying, setPlaylist } = useContext(AppContext);
  return (
    <div className="flex items-center bg-secondary rounded-xl p-3 mb-3 hover:bg-accent/10 transition cursor-pointer group" onClick={() => {
      setPlaylist(playlist);
      setCurrentSong(song);
      setIsPlaying(true);
    }}>
      <img 
        src={song.albumArt} 
        alt="Album" 
        className="w-12 h-12 rounded-lg mr-4 object-cover" 
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/60x60/333/FFF?text=Album";
        }}
      />
      <div className="flex-1">
        <div className="font-semibold">{song.title}</div>
        <div className="text-sm text-neutral-400">{song.artist}</div>
      </div>
      <button className="opacity-0 group-hover:opacity-100 p-2 rounded-full bg-accent text-white"><Play size={20} /></button>
    </div>
  );
}
