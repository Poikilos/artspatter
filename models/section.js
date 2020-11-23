const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Section = mongoose.model('Section', new mongoose.Schema({
  active: {
    type: Boolean,
    required: True
  },
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
  privacy: { // privacy level
    type: Number,
    required: true
  },
  site: String // for future multi-site support
}));

// entries:
// ("art": "Browse" or "forum": "Discuss"
// title: "Browse" or "Discuss"

module.exports = Section;
