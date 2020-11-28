const mongoose = require('mongoose');

// const Role = require('./role');

const Post = mongoose.model('Post', new mongoose.Schema({
  active: Boolean,
  pid: {
    type: String, // TODO: (future) contains @ if cross-site
    required: true,
  },
  uid: {  // user.uid
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  /*
  user_id: { // (*Mongoose relationships tutorial*, n.d.)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  */
  m: Date, // modified date
  mBy: String, // last change by what user number
  // TODO: (future) ^ mBy should contain @ if cross-site
  cid: { // category.cid
    type: String,
    required: true,
  },
  ftn: { // This is the owner's self-vote for the content flag (flagtype.ftn)
    type: Number,
    required: true,
  },
  pln: { // privacylevel.pln
    type: Number,
    required: true,
  },
  parent: String, // if top-tier post then null; if reply then pid of parent
  // TODO: (future) ^ use parent for making polls (upvote a special one-line subpost)
  likes: Number, // cache (of Vote table "like" entries)
  spams: Number, // cache (of Vote table "spam" entries)
  offends: Number, // cache (of Vote table "offensive" entries)
  adult: Number, // #of Flag table "adult" entries; overrides audience
  thumb: String, // relative url to public (thumbnail of art or post)
  full: String, // relative url to image (artwork)
  body: String, // the full post or the image description
  color: String, // for preview during high-load scenarios or censored content
  note: String, // reserved for system use
}));
// There are types such as Date, Boolean; put the type in brackets to require an array
// (*Mongoose v5.10.15: SchemaTypes*, n.d.).

module.exports = Post;
