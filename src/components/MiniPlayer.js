import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';

const MiniPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    volume,
    changeVolume,
    playPreviousTrack,
    playNextTrack,
  } = useContext(MusicContext);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f8f9fa',
        padding: '10px',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)',
      }}
    >
      {currentTrack ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <strong>Now Playing:</strong> {currentTrack.title} by {currentTrack.artist}
          </div>
          <div>
            <button onClick={playPreviousTrack}>Previous</button>
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button onClick={playNextTrack}>Next</button>
            <label style={{ marginLeft: '10px' }}>
              Volume:
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                style={{ marginLeft: '5px' }}
              />
            </label>
          </div>
        </div>
      ) : (
        <div>No track is playing</div>
      )}
    </div>
  );
};

export default MiniPlayer;
