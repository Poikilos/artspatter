const mongoose = require('mongoose');

const FlagSchema = new mongoose.Schema({
  fid: { // TODO: (future) contains @ if cross-site
    type: String,
    required: true,
  },
  uid: { // user.uid
    type: String,
    required: true,
  },
  ftn: { // flagtype.ftn
    type: Number,
    required: true,
  },
});

FlagSchema.index({ uid: 1, fid: 1 }, { unique: true });
// ^ compound index (user can only choose one flag)

const Flag = mongoose.model(
  'Flag',
  FlagSchema,
);

module.exports = Flag;
