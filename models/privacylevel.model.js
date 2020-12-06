const mongoose = require('mongoose');

const PrivacyLevelSchema = new mongoose.Schema({
  active: Boolean,
  pln: {
    type: Number,
    unique: true,
    required: true,
  },
  caption: {
    type: String,
    unique: true,
    required: true,
  },
  description: String,
});

const PrivacyLevel = mongoose.model(
  'PrivacyLevel',
  PrivacyLevelSchema,
);

module.exports = PrivacyLevel;
