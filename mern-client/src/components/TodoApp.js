import React, { useState, useEffect } from 'react';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../services/todoService';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(null); // Track which todo is being edited
  const [editTitle, setEditTitle] = useState(''); // Track updated title

  // Fetch todos on load
  useEffect(() => {
    const getTodos = async () => {
      try {
        const todosFromServer = await fetchTodos();
        setTodos(todosFromServer);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    getTodos();
  }, []);

  // Add a new todo
  const handleAddTodo = async () => {
    if (!newTodo) return;
    try {
      const addedTodo = await addTodo(newTodo);
      setTodos([...todos, addedTodo]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Mark a todo as completed
  const handleUpdateTodo = async (id) => {
    try {
      const updatedTodo = await updateTodo(id, { completed: true });
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Save the updated title
  const handleSaveEdit = async (id) => {
    if (!editTitle) return;
    try {
      const updatedTodo = await updateTodo(id, { title: editTitle });
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      setEditMode(null); // Exit edit mode
      setEditTitle(''); // Clear the input
    } catch (error) {
      console.error('Error saving updated todo:', error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {editMode === todo._id ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
              </span>
            )}
            {editMode === todo._id ? (
              <>
                <button onClick={() => handleSaveEdit(todo._id)}>Save</button>
                <button onClick={() => setEditMode(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => setEditMode(todo._id)}>Edit</button>
                <button onClick={() => handleUpdateTodo(todo._id)}>Mark as Completed</button>
                <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
