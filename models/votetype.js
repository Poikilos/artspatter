const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteType = mongoose.model('VoteType', new mongoose.Schema({
  active: {
    type: Boolean,
    required: True
  },
  n: {
    type: Number,
    unique: true,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  caption: {
    type: String,
    unique: true,
    required: true
  }
}));

module.exports = VoteType;

// entries:
// (1,1,"Like"),
// (2,-1,"Dislike")
// (3,-1,"Offensive")
// (4,-1,"Spam")
