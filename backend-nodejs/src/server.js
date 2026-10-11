require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[READY] Travel Guard Express server running on port ${PORT}`);
});
