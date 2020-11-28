const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
// const routes = require('./routes/api');
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
}

app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

// connect to the database
mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log(err));

// since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
*/

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// as per BezKoder (2019)
app.use(bodyParser.urlencoded({ extended: true }));
/* app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});
*/
app.get('/', (req, res) => {
  res.json({ message: "Welcome to an unnamed ArtSpatter instance." });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
