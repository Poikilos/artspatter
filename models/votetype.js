const mongoose = require('mongoose');

const VoteType = mongoose.model('VoteType', new mongoose.Schema({
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
}));

module.exports = VoteType;

// entries:
// (1,1,"Like"),
// (2,-1,"Dislike")
// (3,-1,"Offensive")
// (4,-1,"Spam")
