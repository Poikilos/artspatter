const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// See https://www.npmjs.com/package/mongoose-sequence

// const Role = require('./role');
const UserPrivacySchema = new mongoose.Schema({
  display: Number,
  overview: Number,
  email: Number,
  avatarPath: Number,
  coverPath: Number,
  birthday: Number,
  friends: Number,
});

const UserSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    required: true,
  },
  uid: { // TODO: (future) contains @ if cross-site
    // user or cross-site user
    type: String,
    // TODO: (future) required: true,
    // TODO: (future) unique: true,
  },
  // TODO: (future) profile URL (subdirectory)
  username: {
    // TODO: (future) contains @ if cross-site
    type: String,
    unique: true,
    required: [true, 'You must enter a unique username.'],
  },
  email: {
    // TODO: (future) contains extra @ if cross-site (determine if so from username)
    type: String,
    unique: true,
    sparse: true,
    // ^ allow more than one null (won't work with "required")
    // required: [true, 'You must enter an e-mail address.']
  },
  confirmed: Boolean, // e-mail confirmed
  password: String, // password hash
  // TODO: (future) add setting: honor cross-site roles (none for now)
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    }
  ],
  code: String, // for password reset etc
  phM: Date, // password hash modified date
  c: {
    // created date
    type: Date,
    default: Date.now, // should only have parenthesis upon creation not schema
    required: true,
  },
  m: Date, // modified date
  previousPHs: [String], // previous password hashes
  avatarPath: String,
  overview: String, // profile overview (relative to API_URL)
  coverPath: String, // cover image path (relative to API_URL)
  color: String, // theme color 
  birthday: {
    type: Date,
    default: Date.now, // should only have parenthesis upon creation not schema
    required: true,
    // TODO:  required: [true, 'You must enter a birthday.'],
  },
  showFtns: [ // flag type numbers (ftns) the user can see
    {
      type: String,
      required: true,
    }
  ],
  showFields: {
    type: UserPrivacySchema,
    default: {display:7, overview:4, email:1, avatarPath:7, coverPath:7, birthday:1, friends: 3},
  },
  // ^ show my fields 
  // ^ (if [String] then index is level, content is '+'-separated)
  pln: { // profile privacy level
    type: Number,
    required: true,
  },
  delDate: Date, // if privacy=0 for a certain span from here, delete
  friends: [String], // uid of each friend
  pendingFriends: [String], // uid of each pending friend request
  display: { // display name
    // TODO: (future) contains @ if cross-site
    type: String,
    unique: true,
    required: [true, 'You must enter a unique display name.'],
  },
  parent: String, // reserved for future use (parent uid for parent-managed account)
  note: String, // reserved for system use
});

UserSchema.plugin(AutoIncrement, {inc_field: 'user_id'});

UserSchema.post('save', function(doc, next) {
  doc.uid = doc.user_id.toString();
  console.log(`  * set uid to ${doc.uid}`);
  next();
});

const User = mongoose.model(
  'User',
  UserSchema,
);
// There are types such as Date, Boolean; put the type in brackets to require an array
// (*Mongoose v5.10.15: SchemaTypes*, n.d.).

module.exports = User, UserPrivacySchema;
