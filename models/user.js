const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Role = require('./role');

const User = mongoose.model('User', new mongoose.Schema({
    displayName: {
        type: String,
        unique: true,
        required: [true, 'You must enter a unique display name.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'You must enter an e-mail address.']
    },
    ph: String, // password hash
    phModified: Date, // password hash last change date
    previousPHs: [String], // previous password hashes
    avatarPath: String,
    birthday: {
        type: Date,
        required: [true, 'You must enter a birthday.']
    },
    adult: Boolean,
    role: { // (*Mongoose relationships tutorial*, n.d.)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
}));
// There are types such as Date, Boolean; put the type in brackets to require an array
// (*Mongoose v5.10.15: SchemaTypes*, n.d.).

module.exports = User;
