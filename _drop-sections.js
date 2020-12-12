
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');

const db = require('./models');
const Section = db.section;

// connect to the database
mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // (BezKoder, 2019a)
    useFindAndModify: false, // fix DeprecationWarning
    useCreateIndex: true,  // fix DeprecationWarning
  })
  .then(() => {
    console.log('MongoDB is successfully connected.');
    Section.collection.drop(function(err) {
      console.log('Section collection dropped.');
      process.exit(0);
    });
  
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit(1);
  });
