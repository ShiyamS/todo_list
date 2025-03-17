const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TodoList', todoListSchema);
