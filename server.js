const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/db.config');
// ^  // automatically imported
// const mongoose = require('mongoose');
const path = require('path');
// const routes = require('./routes/api');
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
}; // (BezKoder, 2019a)

app.use(cors(corsOptions));

const port = process.env.PORT || 8080;

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// as per BezKoder (2019a).
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');
const Role = db.role;


// connect to the database
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // (BezKoder, 2019a)
  })
  .then(() => {
    console.log('MongoDB is successfully connected.');
    initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit(1);
  });


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to an unnamed ArtSpatter instance.' });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        rid: 'user'
      }).save(err => {
        if (err) {
          console.log('error', err);
        }
        console.log('added "user" to roles collection');
      });

      new Role({
        rid: "moderator"
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log('added "moderator" to roles collection');
      });

      new Role({
        rid: 'admin'
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log('added "admin" to roles collection');
      });
    }
  });
} // (BezKoder, 2019a)
