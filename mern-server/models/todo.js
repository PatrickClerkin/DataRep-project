const mongoose = require('mongoose'); // Import Mongoose 

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
});

// Export the model 
module.exports = mongoose.model('Todo', TodoSchema);
