const mongoose = require('mongoose');

const Section = mongoose.model('Section', new mongoose.Schema({
  active: Boolean,
  sid: {
    // TODO: (future) contains "@" if cross-site
    type: String,
    unique: true,
    required: true,
  },
  caption: {
    type: String,
    unique: true,
    required: true,
  },
  pln: { // privacy level
    type: Number,
    required: true,
  },
}));

// entries:
// ("art", "Browse", 7),
// ("forum", "Discuss", 7)

module.exports = Section;
