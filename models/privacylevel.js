const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrivacyLevel = mongoose.model('PrivacyLevel', new mongoose.Schema({
  active: Boolean,
  n: {
    type: Number,
    unique: true,
    required: true
  },
  caption: {
    type: String,
    unique: true,
    required: true
  }
}));

/* entries:
 (0, "Deleted"), (1, "Private"), (2, "Friends"), (3, "Friends of Friends"),
 (4, "Logged in to this site"), (5, "Logged in to federation*"),
 (6, "Public*")
 // - number is used in profile (n is index for privacy_levels--see user.js)
 // - number must have same meaning for every site (caption may differ)
 // *will be displayed on federated sites (tentatively, in future versions with the feature)
*/
module.exports = PrivacyLevel;
