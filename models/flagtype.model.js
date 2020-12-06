const mongoose = require('mongoose');

const FlagTypeSchema = new mongoose.Schema({
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
});

const FlagType = mongoose.model(
  'FlagType',
  FlagTypeSchema,
);

module.exports = FlagType;
