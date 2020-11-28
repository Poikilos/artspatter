const mongoose = require('mongoose');

// create schema for todo
const TodoSchema = new mongoose.Schema({
  action: {
    type: String,
    required: [true, 'The todo text field is required'],
  },
});

// create model for todo
const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;
