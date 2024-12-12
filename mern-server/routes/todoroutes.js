// Import modules
const express = require('express'); 
const router = express.Router(); 
const Todo = require('../models/todo'); 

// Get All Todos
router.get('/todos', async (req, res) => {
  console.log('GET /todos endpoint was hit'); // verify point being hit
  try {
    // Use Mongoose to fetch all from the todos
    const todos = await Todo.find();
    console.log('Fetched todos:', todos); 
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).send('Server Error'); 
  }
});

// Add New Todo (POST)
router.post('/todos', async (req, res) => {
  console.log('POST /todos endpoint was hit'); // verify point being hit
  const { title } = req.body; 
  try {
    // Create a new Todo 
    const newTodo = new Todo({
      title,
    });
    const savedTodo = await newTodo.save(); 
    console.log('Saved new todo:', savedTodo); // debugging
    res.json(savedTodo); 
  } catch (err) {
    console.error('Error saving new todo:', err); 
    res.status(500).send('Server Error'); 
  }
});

// Update a Todo (PUT)
router.put('/todos/:id', async (req, res) => {
  console.log('PUT /todos/:id endpoint was hit'); // verify point being hit
  const { title, completed } = req.body; 
  try {
    // Find a document by ID and update it with new data
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, completed }, 
      { new: true } 
    );
    console.log('Updated todo:', updatedTodo); // log the updated document for debugging
    res.json(updatedTodo); 
  } catch (err) {
    console.error('Error updating todo:', err); 
    res.status(500).send('Server Error'); 
  }
});

// Delete a Todo (DELETE)
router.delete('/todos/:id', async (req, res) => {
  console.log('DELETE /todos/:id endpoint was hit'); // verify point being hit
  try {
    
    await Todo.findByIdAndDelete(req.params.id);
    console.log('Deleted todo with id:', req.params.id); 
    res.json({ msg: 'Todo deleted' }); 
  } catch (err) {
    console.error('Error deleting todo:', err); 
    res.status(500).send('Server Error'); 
  }
});

// export the router to be used in index.js
module.exports = router; 
