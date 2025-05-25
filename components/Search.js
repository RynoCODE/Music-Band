import { useState } from 'react';
import { songs, artists } from '../data/music';
import SongCard from './SongCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const filteredSongs = songs.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.artist.toLowerCase().includes(query.toLowerCase())
  );
  const filteredArtists = artists.filter(a =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <input
        className="w-full p-3 rounded-lg bg-secondary border border-neutral-700 mb-6"
        placeholder="Search for songs or artists..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div>
        <h3 className="font-bold mb-2">Songs</h3>
        {filteredSongs.length === 0 && <div className="text-neutral-400">No songs found.</div>}
        {filteredSongs.map(song => <SongCard key={song.id} song={song} playlist={filteredSongs} />)}
      </div>
      <div className="mt-8">
        <h3 className="font-bold mb-2">Artists</h3>
        <div className="flex gap-4 flex-wrap">
          {filteredArtists.length === 0 && <div className="text-neutral-400">No artists found.</div>}          {filteredArtists.map(artist => (
            <div key={artist.name} className="flex flex-col items-center bg-secondary rounded-xl p-4 w-32">
              <img 
                src={artist.image} 
                alt={artist.name} 
                className="w-16 h-16 rounded-full mb-2 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/60x60/333/FFF?text=Artist";
                }}
              />
              <span>{artist.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
