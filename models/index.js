const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// Preloaded:
db.privacylevel = require("./privacylevel.model");
db.role = require("./role.model");
db.flagtype = require("./flagtype.model");
db.section = require("./section.model");
db.user = require("./user.model");
db.category = require("./category.model");
db.votetype = require("./votetype.model");

// No initial data:
db.flag = require("./flag.model");
db.post = require("./post.model");
db.vote = require("./vote.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

// (BezKoder, 2019a)
