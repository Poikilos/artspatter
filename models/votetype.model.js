const mongoose = require('mongoose');

const VoteTypeSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    required: true,
  },
  vtn: {
    type: Number,
    unique: true,
    required: true,
  },
  v: { // value by which it affects the "Like" score
    type: Number,
    required: true,
  },
  caption: {
    type: String,
    unique: true,
    required: true,
  },
  pln: { // privacylevel.pln
    type: Number,
    required: true,
  },
});

const VoteType = mongoose.model(
  'VoteType', 
  VoteTypeSchema,
);

module.exports = VoteType;
