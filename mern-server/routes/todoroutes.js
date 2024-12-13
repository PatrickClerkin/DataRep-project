const express = require('express');
const router = express.Router();
const Todo = require('../models/todo'); // Import the Todo model

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find(); // Fetch all todos from the database
    res.json(todos); // Send todos as JSON
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).send('Server Error'); // Handle server error
  }
});

// GET completed todos
router.get('/completed', async (req, res) => {
  try {
    const todos = await Todo.find({ completed: true }); // Fetch completed todos
    res.json(todos);
  } catch (error) {
    console.error('Error fetching completed todos:', error);
    res.status(500).send('Server Error');
  }
});

// POST a new todo
router.post('/', async (req, res) => {
  const { title, dueDate } = req.body;
  try {
    const newTodo = new Todo({ title, dueDate });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    console.error('Error saving todo:', error);
    res.status(500).send('Server Error');
  }
});

// PUT to update a todo
router.put('/:id', async (req, res) => {
  const { title, completed, dueDate } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, completed, dueDate },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).send('Server Error');
  }
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Todo deleted' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
