import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../services/todoService';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos();
      setTodos(todosFromServer.filter((todo) => !todo.completed)); // Only fetch incomplete todos
    };
    getTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodo) return;
    const addedTodo = await addTodo(newTodo);
    setTodos([...todos, addedTodo]);
    setNewTodo('');
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleUpdateTodo = async (id) => {
    const updatedTodo = await updateTodo(id, { completed: true });
    setTodos(todos.filter((todo) => todo._id !== updatedTodo._id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <Link to="/completed">View Completed Todos</Link>
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
            {todo.title}
            <Link to={`/comments/${todo._id}`}>Comments</Link>
            <button onClick={() => handleUpdateTodo(todo._id)}>Mark as Completed</button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
