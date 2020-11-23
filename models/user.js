const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Role = require('./role');

const User = mongoose.model('User', new mongoose.Schema({
    active: {
        type: Boolean,
        required: True
    },
    n: {
        // Use this instead of built-in _id for clarity.
        type: String,  // is a number, unless offsite, then number+"@"+site
        unique: true,
        required: true
    },
    site: String, // for future multi-site support
    name: { // no spaces, used for the profile URL (subdirectory)
        type: String,
        unique: true,
        required: [true, 'You must enter a unique username.']
    },
    display: {
        type: String,
        unique: true,
        required: [true, 'You must enter a unique display name.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'You must enter an e-mail address.']
    },
    confirmed: Boolean,  // e-mail confirmed
    code: String,  // for password reset etc
    ph: String, // password hash
    phM: Date, // password hash modified date
    m: Date, // modified date
    previousPHs: [String], // previous password hashes
    avatarPath: String,
    birthday: {
        type: Date,
        required: [true, 'You must enter a birthday.']
    },
    adult: Boolean,
    show_marks: {
        type: [String],
        required: true
    },
    role: { // (*Mongoose relationships tutorial*, n.d.)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    privacy_levels: [String], // fields by privacy (index is level, content is '+'-separated)
    privacy: { // profile privacy level
        type: Number,
        required: true
    },
    parent: Number, // reserved for future use (parent-managed account)
    note: String  // reserved for system use
}));
// There are types such as Date, Boolean; put the type in brackets to require an array
// (*Mongoose v5.10.15: SchemaTypes*, n.d.).

module.exports = User;
