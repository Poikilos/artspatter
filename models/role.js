const mongoose = require('mongoose');

const Role = mongoose.model('Role', new mongoose.Schema({
  // User objects use the auto-generated role._id as a foreign key.
  active: Boolean,
  rid: { // plain-text role such as "admin" or "user"
    type: String,
    unique: true,
    required: true,
  },
  ccids: [String], // TODO: (future) Role can create posts where category.cid matches
  rcids: [String], // TODO: (future) Role can read posts where category.cid matches
  mcids: [String], // TODO: (future) Role can modify posts where category.cid matches
  dcids: [String], // TODO: (future) Role can deactivate posts where category.cid matches
  rrids: [String], // TODO: (future) Role can read user profiles where role.title matches
  mrids: [String], // TODO: (future) Role can modify users where role.title matches
  drids: [String], // TODO: (future) Role can deactivate users where role.title matches
}));

// entries:
// (true, "admin")
// (true, "mod")
// (true, "user")

module.exports = Role;
