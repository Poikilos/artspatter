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
  name: { // TODO: (future) profile URL (subdirectory)
    // TODO: (future) contains @ if cross-site
    type: String,
    unique: true,
    required: [true, 'You must enter a unique username.'],
  },
  friends: [String], // uid of each friend
  friends_pending: [String], // uid of each pending friend request
  display: { // display name
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
  previousPHs: [String], // previous password hashes
  avatarPath: String,
  birthday: {
    type: Date,
    required: [true, 'You must enter a birthday.'],
  },
  show_flags: [ // which flags user can see
    {
      type: String,
      required: true,
    }
  ],
  roles: [ // TODO: (future) add setting: honor cross-site roles (none for now)
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    }
  ],
  privacy_levels: [String], // show my fields (index is level, content is '+'-separated)
  privacy: { // profile privacy level
    type: Number,
    required: true,
  },
  delDate: Date, // if privacy=0 for a certain span from here, delete
  parent: String, // reserved for future use (parent uid for parent-managed account)
  note: String, // reserved for system use
}));
// There are types such as Date, Boolean; put the type in brackets to require an array
// (*Mongoose v5.10.15: SchemaTypes*, n.d.).

module.exports = User;
