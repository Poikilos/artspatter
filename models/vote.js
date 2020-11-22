const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new mongoose.Schema({
    by: { // User number as string, or n+"@"+site
      type: String,
      required: true
    },
    t_n: {
        type: Number,
    },
    value: {
        type: Number,
        required: true
    }
});

VoteSchema.index({by: 1, t_n: 1}, { unique: true});
// ^ compound index (user can only vote once)

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;
