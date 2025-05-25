import { useContext, useState } from 'react';
import { AppContext } from '../pages/_app';
import SongCard from './SongCard';
import { songs } from '../data/music';

export default function PlaylistView() {
  const { playlists, setPlaylists, setCurrentSong, setIsPlaying, setPlaylist } = useContext(AppContext);
  const [newName, setNewName] = useState('');
  const [selected, setSelected] = useState(0);

  const addPlaylist = () => {
    if (!newName.trim()) return;
    setPlaylists([...playlists, { name: newName, songs: [] }]);
    setNewName('');
  };
    const playPlaylist = (pl) => {
    if (pl.songs.length === 0) return;
    
    const fullSongs = pl.songs.map(song => {
      if (typeof song === 'number') {
        return songs.find(s => s.id === song);
      } else if (typeof song === 'object' && song !== null) {
        // If it's already an object but missing album art, find the full song object
        if (!song.albumArt && song.id) {
          return songs.find(s => s.id === song.id) || song;
        }
        return song;
      }
      return null;
    }).filter(Boolean);
    
    setPlaylist(fullSongs);
    if (fullSongs.length > 0) {
      setCurrentSong(fullSongs[0]);
      setIsPlaying(true);
    }
  };
  // Add current song to selected playlist
  const addCurrentToPlaylist = (song) => {
    // Make sure we're adding the full song object
    const songToAdd = typeof song === 'number' ? 
      songs.find(s => s.id === song) : song;
      
    if (!songToAdd) return;
    
    setPlaylists(playlists.map((pl, i) =>
      i === selected ? { ...pl, songs: [...pl.songs, songToAdd] } : pl
    ));
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="flex gap-2 mb-6">
        <input
          className="p-2 rounded-lg bg-secondary border border-neutral-700 flex-1"
          placeholder="New playlist name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <button className="bg-accent px-4 py-2 rounded-lg text-white font-semibold" onClick={addPlaylist}>Create</button>
      </div>
      <div className="flex gap-4 mb-8 overflow-x-auto">
        {playlists.length === 0 && <div className="text-neutral-400">No playlists yet.</div>}
        {playlists.map((pl, i) => (
          <div key={pl.name} className={`p-4 rounded-xl cursor-pointer ${selected === i ? 'bg-accent/30' : 'bg-secondary'}`} onClick={() => setSelected(i)}>
            <div className="font-bold">{pl.name}</div>
            <div className="text-xs text-neutral-400">{pl.songs.length} songs</div>
            <button className="mt-2 text-accent underline text-xs" onClick={e => { e.stopPropagation(); playPlaylist(pl); }}>Play</button>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-bold mb-2">Songs in Playlist</h3>
      {playlists[selected] && playlists[selected].songs.length === 0 && <div className="text-neutral-400">No songs in this playlist.</div>}
        {playlists[selected] && playlists[selected].songs.map(song => {
          // Make sure we have the full song object with all properties
          const fullSong = typeof song === 'number' ? 
            songs.find(s => s.id === song) : song;
          return fullSong ? 
            <SongCard key={fullSong.id + Math.random()} song={fullSong} playlist={playlists[selected].songs} /> : 
            null;
        })}
      </div>
    </div>
  );
}
