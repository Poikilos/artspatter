const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Role = require('./role');

const Post = mongoose.model('Post', new mongoose.Schema({
    active: Boolean,
    title: {
        type: String,
        required: true
    },
    publish: {
        type: Number,  // 0 or 1, other values are for future use
        required: true
    },
    site: String, // for future multi-site support  
    userN: {  // (n or n+"@"+site)
        type: Number,
        required: true
    },
    /*
    user_id: { // (*Mongoose relationships tutorial*, n.d.)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    */
    m: Date, // modified date
    mBy: String, // last change by what user number (n or n+"@"+site)
    category: {
        type: String,
        required: true
    },
    audience: { // owner-specified entry from Flag table
        type: Number,
        required: true
    },
    parent: String, // if null, it is a top-tier post (not a reply)
    likes: Number, // cache (of Vote table "like" entries)
    spams: Number, // cache (of Vote table "spam" entries)
    offends: Number, // cache (of Vote table "offensive" entries)
    adult: Number, // #of Flag table "adult" entries; overrides audience
    thumb: String, // relative url to public (thumbnail of art or post)
    full: String, // relative url to image (artwork)
    body: String, // the full post or the image description
    color: String, // for preview during high-load scenarios or censored content
    note: String // reserved for system use
}));
// There are types such as Date, Boolean; put the type in brackets to require an array
// (*Mongoose v5.10.15: SchemaTypes*, n.d.).

module.exports = Post;
