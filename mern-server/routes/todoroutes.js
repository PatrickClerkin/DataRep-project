const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Add a comment to a todo
router.post('/:id/comments', async (req, res) => {
  try {
    const { text } = req.body;
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ msg: 'Todo not found' });

    todo.comments.push({ text });
    await todo.save();
    res.json(todo.comments);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send('Server Error');
  }
});

// Get all comments for a todo
router.get('/:id/comments', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ msg: 'Todo not found' });

    res.json(todo.comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Server Error');
  }
});

// Delete a comment
router.delete('/:id/comments/:commentId', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ msg: 'Todo not found' });

    todo.comments = todo.comments.filter(
      (comment) => comment._id.toString() !== req.params.commentId
    );
    await todo.save();
    res.json(todo.comments);
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
