const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  uid: {
    type: Number, // compound with site if site not null
    required: true,
  },
  pid: { // TODO: contains @ if cross-site post
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
  vtn: { // votetype.vtn
    type: Number,
    required: true,
  },
  why: String, // TODO: (future) "c" for content not reporting quality
  v: { // value (-1 or +1 to upvote or downvote the characteristic)
    type: Number,
    required: true,
  },
  c: {
    // created date
    type: Date,
    default: moment(),
    required: true,
  },
});

VoteSchema.index({ uid: 1, pid: 1 }, { unique: true });
// ^ compound index (user can only vote once)

const Vote = mongoose.model(
  'Vote',
  VoteSchema,
);

module.exports = Vote;
