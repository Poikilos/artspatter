const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlagType = mongoose.model('FlagType', new mongoose.Schema({
  active: {
    type: Boolean,
    required: True
  },
  site: String, // for future multi-site support  
  n: {
    type: Number,
    unique: true,
    required: true
  },
  caption: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  privacy: { // privacy level
    type: Number,
    required: true
  },
}));

module.exports = FlagType;

// entries:
// (0, "general audiences", "This is appropriate for anyone.")
// (1, "teen", "This is only appropriate for teens or older (may be shocking, but not provocative).")
// (2, "adult", "This is only appropriate for mature audiences.")
