import { songs, albums } from '../data/music';
import SongCard from '../components/SongCard';
import { useContext } from 'react';
import { AppContext } from '../pages/_app';

export default function Home() {
  const { setPlaylist, setCurrentSong, setIsPlaying } = useContext(AppContext);
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Featured Songs</h1>
      <div>
        {songs.map(song => <SongCard key={song.id} song={song} playlist={songs} />)}
      </div>
      <h2 className="text-2xl font-bold mt-12 mb-4">Albums</h2>
      <div className="flex gap-6 flex-wrap">        {albums.map(album => (
          <div key={album.name} className="bg-secondary rounded-xl p-4 w-48 flex flex-col items-center hover:bg-accent/10 transition cursor-pointer"
            onClick={() => {
              const albumSongs = songs.filter(s => album.songs.includes(s.id));
              setPlaylist(albumSongs);
              if (albumSongs.length > 0) {
                setCurrentSong(albumSongs[0]);
                setIsPlaying(true);
              }
            }}>
            <img 
              src={album.cover} 
              alt={album.name} 
              className="w-24 h-24 rounded-lg mb-2 object-cover" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/60x60/333/FFF?text=Album";
              }}
            />
            <div className="font-semibold text-center">{album.name}</div>
            <div className="text-sm text-neutral-400">{album.artist}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
