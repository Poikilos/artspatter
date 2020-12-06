const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    rid: String
  })
);

// entries:
// (true, "admin")
// (true, "moderator")
// (true, "user")

module.exports = Role;