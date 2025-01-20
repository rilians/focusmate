import React, { createContext, useState, useRef, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [musicList, setMusicList] = useState([]); // Daftar musik
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // Inisialisasi elemen audio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;

      audioRef.current.onpause = () => setIsPlaying(false);
      audioRef.current.onplay = () => setIsPlaying(true);
      audioRef.current.onvolumechange = () => setVolume(audioRef.current.volume);
    }
  }, [volume]);

  // Fetch daftar musik
  useEffect(() => {
    const fetchMusicList = async () => {
      try {
        const response = await axiosInstance.get('/api/music');
        setMusicList(response.data);
      } catch (error) {
        console.error('Error fetching music list:', error);
      }
    };

    fetchMusicList();
  }, []);

  const playTrack = (track) => {
    if (audioRef.current) {
      if (currentTrack?.url !== track.url) {
        audioRef.current.pause();
        audioRef.current.src = `http://localhost:5000${track.url}`;
        audioRef.current.load();
        setCurrentTrack(track);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const changeVolume = (value) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  // Fungsi untuk memainkan lagu sebelumnya
  const playPreviousTrack = () => {
    if (currentTrack && musicList.length > 0) {
      const currentIndex = musicList.findIndex((track) => track.id === currentTrack.id);
      const previousIndex = (currentIndex - 1 + musicList.length) % musicList.length;
      playTrack(musicList[previousIndex]);
    }
  };

  // Fungsi untuk memainkan lagu berikutnya
  const playNextTrack = () => {
    if (currentTrack && musicList.length > 0) {
      const currentIndex = musicList.findIndex((track) => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % musicList.length;
      playTrack(musicList[nextIndex]);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        musicList,
        currentTrack,
        isPlaying,
        volume,
        playTrack,
        pauseTrack,
        togglePlay,
        changeVolume,
        playPreviousTrack,
        playNextTrack,
      }}
    >
      <audio ref={audioRef} preload="auto" />
      {children}
    </MusicContext.Provider>
  );
};
