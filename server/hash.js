const bcrypt = require('bcrypt');

(async () => {
  const password = 'egiganteng123'; // Password asli
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword); // Salin hasil hash ini
})();
