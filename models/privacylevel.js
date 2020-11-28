const mongoose = require('mongoose');

const PrivacyLevel = mongoose.model('PrivacyLevel', new mongoose.Schema({
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
}));

/* entries:
var future_notice = "will be displayed on federated sites"
                    + " (tentatively, in future versions with the feature)"
 (0, "Deleted"), (1, "Archived"), (2, "Private"), (3, "Friends"),
 (4, "Friends of Friends"), (5, "Logged in to this site"),
 (6, "Logged in to federation", future_notice), (7, "Public", future_notice)
 // - number is used in profile (n is index for privacy_levels--see user.js)
 // - number must have same meaning for every site (caption may differ)
*/
module.exports = PrivacyLevel;
