const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = mongoose.model('Role', new mongoose.Schema({
  // User objects use the auto-generated role._id as a foreign key.
  active: Boolean,
  title: {
      type: String,
      unique: true,
      required: true
  },
  ccids: [String], // TODO: (future) Role can create posts where category.cid matches
  rcids: [String], // TODO: (future) Role can read posts where category.cid matches
  mcids: [String], // TODO: (future) Role can modify posts where category.cid matches
  dcids: [String], // TODO: (future) Role can delete posts where category.cid matches
  mcids: [String], // TODO: (future) Role can modify posts where category.cid matches
  rtitles: [String], // TODO: (future) Role can read user profiles where role.title matches
  mtitles: [String], // TODO: (future) Role can modify users where role.title matches
  dtitles: [String], // TODO: (future) Role can deactivate users where role.title matches
}));
// artist or admin

module.exports = Role;
