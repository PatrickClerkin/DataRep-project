import React, { useState, useEffect } from 'react';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../services/todoService';
import { Link } from 'react-router-dom';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos();
      setTodos(todosFromServer.filter((todo) => !todo.completed)); // Show only uncompleted todos
    };
    getTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodo || !dueDate) return;
    const addedTodo = await addTodo(newTodo, dueDate);
    setTodos([...todos, addedTodo]);
    setNewTodo('');
    setDueDate('');
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleUpdateTodo = async (id) => {
    const updatedTodo = await updateTodo(id, { completed: true });
    setTodos(todos.filter((todo) => todo._id !== id)); // Remove completed todos from the list
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
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title} - Due: {new Date(todo.dueDate).toLocaleString()} -{' '}
            {todo.completed ? 'Completed' : 'Pending'}
            <button onClick={() => handleUpdateTodo(todo._id)}>Mark as Completed</button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            <Link to={`/comments/${todo._id}`}>Comments</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
