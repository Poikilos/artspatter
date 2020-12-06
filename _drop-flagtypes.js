
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');

const db = require('./models');
const FlagType = db.flagtype;

// connect to the database
mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // (BezKoder, 2019a)
  })
  .then(() => {
    console.log('MongoDB is successfully connected.');
    FlagType.collection.drop(function(err) {
      console.log('FlagType collection dropped.');
      process.exit(0);
    });

})
  .catch((err) => {
    console.error('Connection error', err);
    process.exit(1);
  });
