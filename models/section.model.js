const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
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
});

const Section = mongoose.model(
  'Section',
  SectionSchema,
);

module.exports = Section;
