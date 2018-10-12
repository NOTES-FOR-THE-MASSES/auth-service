const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', (err) => {
  if (err) {
    console.log(err);
  }

  console.log('MongoDb ready!');
});

db.on('error', err => console.log(`Database error: ${err}`));
