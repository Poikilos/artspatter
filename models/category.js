const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = mongoose.model('Category', new mongoose.Schema({
  active: Boolean,
  cid: { // TODO: (future) contains "@" if cross-site
    type: String,
    unique: true,
    required: true
  },
  caption: {
    type: String,
    unique: true,
    required: true
  },
  sid: {
    type: String,
    required: false  // if null, then hidden
  },
  parent: {
    type: String,
    required: false  // if top-level category then null; else cid
  },
  uid: {
    type: String,
    required: true
  },
  pln: { // privacy level
    type: Number,
    required: true
  }
}));

// entries:
// ("art", "Browse"), ("forum", "Discuss")

module.exports = Category;
