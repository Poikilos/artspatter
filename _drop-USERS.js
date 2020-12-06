
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');

const db = require('./models');
const User = db.user;

// connect to the database
mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // (BezKoder, 2019a)
  })
  .then(() => {
    console.log('MongoDB is successfully connected.');
    User.collection.drop();
    console.log('user collection dropped.');
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit(1);
  });
