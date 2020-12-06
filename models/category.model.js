const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  active: Boolean,
  cid: { // TODO: (future) contains "@" if cross-site
    type: String,
    unique: true,
    required: true,
  },
  caption: {
    type: String,
    unique: true,
    required: true,
  },
  sid: {
    type: String,
    required: false, // if null, then hidden
  },
  display: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    required: false, // if top-level category then null; else cid
  },
  uid: {
    type: String,
    required: true,
  },
  pln: { // privacy level
    type: Number,
    required: true,
  },
});

const Category = mongoose.model(
  'Category',
  CategorySchema,
);

module.exports = Category;
