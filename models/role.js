const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = mongoose.model('Role', new mongoose.Schema({
  active: Boolean,
  title: String
}));
// artist or admin

module.exports = Role;
