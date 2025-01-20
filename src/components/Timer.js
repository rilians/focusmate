import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';

const Timer = ({ userId }) => {
  const [seconds, setSeconds] = useState(1500); // Default: 25 menit (Pomodoro)
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      handleSessionEnd();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleSessionEnd = async () => {
    setIsActive(false);
    setSessionsCompleted((prev) => prev + 1);

    // Simpan sesi ke database
    try {
      await axiosInstance.post('/api/sessions', {
        user: userId,
        duration: mode === 'custom' ? seconds / 60 : modeDurations[mode] / 60,
      });
    } catch (error) {
      console.error('Failed to save session:', error);
    }

    // Atur waktu sesuai mode
    switch (mode) {
      case 'pomodoro':
        setSeconds(sessionsCompleted % 4 === 3 ? 15 * 60 : 5 * 60); // Long break after 4 sessions
        break;
      case 'ultradian':
        setSeconds(20 * 60); // 20 menit istirahat setelah 90 menit
        break;
      case 'fiftyTen':
        setSeconds(10 * 60); // 10 menit istirahat setelah 50 menit
        break;
      default:
        setSeconds(3600); // Default 1 jam untuk custom
    }
  };

  const toggleTimer = () => setIsActive((prev) => !prev);

  const resetTimer = () => {
    setSeconds(modeDurations[mode]);
    setIsActive(false);
    setSessionsCompleted(0);
  };

  const handleModeChange = (event) => {
    const selectedMode = event.target.value;
    setMode(selectedMode);
    setSeconds(modeDurations[selectedMode]);
    setIsActive(false); // Pause timer saat mode berubah
  };

  const modeDurations = {
    pomodoro: 1500, // 25 menit
    ultradian: 5400, // 90 menit
    fiftyTen: 3000, // 50 menit
    custom: seconds, // Durasi kustom
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.timerText}>
        {Math.floor(seconds / 60)}:{('0' + (seconds % 60)).slice(-2)}
      </h1>
      <select value={mode} onChange={handleModeChange} style={styles.dropdown}>
        <option value="pomodoro">Pomodoro (25 min work, 5 min break)</option>
        <option value="ultradian">Ultradian Rhythm (90 min work, 20 min break)</option>
        <option value="fiftyTen">50/10 Rule (50 min work, 10 min break)</option>
        <option value="custom">Custom</option>
      </select>
      {mode === 'custom' && (
        <input
          type="number"
          value={Math.floor(seconds / 60)}
          onChange={(e) => setSeconds(e.target.value * 60)}
          min="1"
          style={styles.input}
        />
      )}
      <div style={styles.buttonContainer}>
        <button onClick={toggleTimer} style={styles.button}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} style={styles.button}>Reset</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  timerText: {
    fontSize: '48px',
    fontWeight: 'bold',
    margin: '20px 0',
  },
  dropdown: {
    fontSize: '16px',
    margin: '10px',
  },
  input: {
    fontSize: '16px',
    margin: '10px',
    width: '60px',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    fontSize: '16px',
    margin: '5px',
    padding: '10px 20px',
  },
};

export default Timer;
