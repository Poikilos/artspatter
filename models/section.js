const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Section = mongoose.model('Section', new mongoose.Schema({
  active: {
    type: Boolean,
    required: True
  },
  sid: {
    // TODO: (future) contains "@" if cross-site
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
  }
}));

// entries:
// ("art": "Browse" or "forum": "Discuss"
// title: "Browse" or "Discuss"

module.exports = Section;
