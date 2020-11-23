const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlagSchema = new mongoose.Schema({
    by: { // what user number (n or n+"@"+site)
      type: String,
      required: true
    },
    t_n: {
      type: Number,
      required: true
    },
    site: String // for future multi-site support
});

FlagSchema.index({by: 1, t_n: 1}, { unique: true});
// ^ compound index (user can only choose one flag)

const Flag = mongoose.model('Flag', FlagSchema);

module.exports = Flag;
