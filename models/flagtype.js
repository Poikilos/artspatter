const mongoose = require('mongoose');

const FlagType = mongoose.model('FlagType', new mongoose.Schema({
  active: {
    type: Boolean,
    required: true,
  },
  ftn: {
    type: Number,
    unique: true,
    required: true,
  },
  caption: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pln: { // privacy level
    type: Number,
    required: true,
  },
}));

module.exports = FlagType;

// entries:
// (0, "General Audiences", "This is appropriate for anyone.")
// (1, "Teen", "This is only appropriate for teens or older (may be shocking).")
// (2, "Mature", "This is only appropriate for mature audiences (may be misleading or provocative).")
