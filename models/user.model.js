const mongoose = require('mongoose');

// const Role = require('./role');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    // TODO: uid: String,
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      }
    ],
  })
);
// There are types such as Date, Boolean; put the type in brackets to require an array
// (*Mongoose v5.10.15: SchemaTypes*, n.d.).

module.exports = User;
