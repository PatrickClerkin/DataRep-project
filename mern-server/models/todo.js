const mongoose = require('mongoose');

// TODO model schema
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  comments: [
    {
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

// Export the model
module.exports = mongoose.model('Todo', TodoSchema);
