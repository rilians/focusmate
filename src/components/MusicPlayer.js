import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosConfig';
import { MusicContext } from '../context/MusicContext';

const MusicPlayer = () => {
  const [musicList, setMusicList] = useState([]);
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useContext(MusicContext);

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

  return (
    <div>
      <h2>Music Player</h2>
      <div>
        {musicList.map((track) => (
          <div key={track.id}>
            <p>
              <strong>{track.title}</strong> by {track.artist}
            </p>
            <button onClick={() => playTrack(track)}>Play</button>
          </div>
        ))}
      </div>
      {currentTrack && (
        <div>
          <h3>Now Playing: {currentTrack.title}</h3>
          <p>By: {currentTrack.artist}</p>
          <button onClick={pauseTrack}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
