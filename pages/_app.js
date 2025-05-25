import '../styles/globals.css';
import React, { useState, useEffect, createContext } from 'react';
import PlayerBar from '../components/PlayerBar';
import Sidebar from '../components/Sidebar';

export const AppContext = createContext();

export default function MyApp({ Component, pageProps }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [volume, setVolume] = useState(0.7);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('playlists');
      if (stored) setPlaylists(JSON.parse(stored));
    }
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('playlists', JSON.stringify(playlists));
    }
  }, [playlists]);

  return (
    <AppContext.Provider value={{
      currentSong, setCurrentSong, isPlaying, setIsPlaying,
      playlist, setPlaylist, playlists, setPlaylists, volume, setVolume
    }}>
      <div className="min-h-screen flex flex-col bg-primary">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 pb-24">
            <Component {...pageProps} />
          </main>
        </div>
        <PlayerBar />
      </div>
    </AppContext.Provider>
  );
}
