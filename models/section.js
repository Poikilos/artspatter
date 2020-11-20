const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = mongoose.model('Section', new mongoose.Schema({
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
  site: String // for future multi-site support
}));

// entries:
// ("art": "Browse" or "forum": "Discuss"
// title: "Browse" or "Discuss"

module.exports = Section;

// SectionID,Integer,Unique
// SectionFunction,String,Unique
// SectionName,String,Unique
