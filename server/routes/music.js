
const express = require('express');
const router = express.Router();

const musicList = [
  { id: 1, title: 'Cozy Coffeehouse', artist: 'Lunar Years', url: '/music/cozycoffeehouse.mp3' },
  { id: 2, title: 'Moonlight Drive', artist: 'Yunior Arronte', url: '/music/moonlightdrive.mp3' },
  { id: 3, title: 'Rainy Day', artist: 'Yunior Arronte', url: '/music/rainyday.mp3' }
];

// Mendapatkan daftar musik
router.get('/', (req, res) => {
  res.json(musicList);
});

module.exports = router;
