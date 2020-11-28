const mongoose = require('mongoose');

// const Role = require('./role');

const User = mongoose.model('User', new mongoose.Schema({
  active: {
    type: Boolean,
    required: true,
  },
  uid: { // TODO: (future) contains @ if cross-site
    // user or cross-site user
    type: String,
    required: true,
    unique: true,
  },
  name: { // profile URL (subdirectory)
    // TODO: (future) contains @ if cross-site
    type: String,
    unique: true,
    required: [true, 'You must enter a unique username.'],
  },
  friends: [String], // uid (denormalized here for speed)
  display: {
    // TODO: (future) contains @ if cross-site
    type: String,
    unique: true,
    required: [true, 'You must enter a unique display name.'],
  },
  email: {
    // TODO: (future) contains extra @ if cross-site (determine if so from username)
    type: String,
    unique: true,
    sparse: true, // allow more than one null (won't work with "required")
    // required: [true, 'You must enter an e-mail address.']
  },
  confirmed: Boolean, // e-mail confirmed
  code: String, // for password reset etc
  ph: String, // password hash
  phM: Date, // password hash modified date
  m: Date, // modified date
  previousPHs: [String], // previous password hashes (denormalized for speed)
  avatarPath: String,
  birthday: {
    type: Date,
    required: [true, 'You must enter a birthday.'],
  },
  adult: Boolean,
  show_flags: { // which flags (denormalized for speed)
    type: [String],
    required: true,
  },
  role: { // TODO: (future) do not propopate this to/from cross-site users
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    // (*Mongoose relationships tutorial*, n.d.)
  },
  privacy_levels: [String], // fields by privacy (index is level, content is '+'-separated)
  privacy: { // profile privacy level
    type: Number,
    required: true,
  },
  parent: String, // reserved for future use (parent uid for parent-managed account)
  note: String, // reserved for system use
}));
// There are types such as Date, Boolean; put the type in brackets to require an array
// (*Mongoose v5.10.15: SchemaTypes*, n.d.).

module.exports = User;
