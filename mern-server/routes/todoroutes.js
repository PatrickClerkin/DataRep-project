const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Get all todos or filter completed
router.get('/todos', async (req, res) => {
  try {
    const { completed } = req.query;
    const query = completed ? { completed: completed === 'true' } : {};
    const todos = await Todo.find(query);
    res.json(todos);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add new todo
router.post('/todos', async (req, res) => {
  const { title } = req.body;
  try {
    const newTodo = new Todo({
      title,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update a todo
router.put('/todos/:id', async (req, res) => {
  const { title, completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a todo
router.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Todo deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
