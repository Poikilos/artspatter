const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = mongoose.model('Category', new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  caption: {
    type: String,
    unique: true,
    required: true
  },
  section_name: {
    type: String,
    required: false  // if null, then hidden
  },
  parent_name: {
    type: String,
    required: false  // if null, then is a top-level category
  },
  site: String  // for future multi-site support
}));

// entries:
// ("art": "Browse" or "forum": "Discuss"
// title: "Browse" or "Discuss"

module.exports = Category;

/*
CategoryID,Integer,Unique
CategorySectionID,Integer,ID exists in section table
CategoryParent,Integer,Null or existing entry in this table
* /
