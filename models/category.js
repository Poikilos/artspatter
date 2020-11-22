const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = mongoose.model('Category', new mongoose.Schema({
  active: Boolean,
  name: {
    type: String,
    unique: true,
    required: true
  },
  caption: {
    type: String,
    unique: true,
    required: true
  },
  section_name: {
    type: String,
    required: false  // if null, then hidden
  },
  parent_name: {
    type: String,
    required: false  // if null, then is a top-level category
  },
  site: String  // for future multi-site support
}));

// entries:
// ("art", "Browse"), ("forum", "Discuss")

module.exports = Category;
