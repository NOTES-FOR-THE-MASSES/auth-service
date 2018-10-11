require('dotenv').config();

const app = require('./config/server');

// Listen
app.listen(process.env.PORT, () => {
  console.log(`Listening to: http://localhost:${process.env.PORT}`);
});
