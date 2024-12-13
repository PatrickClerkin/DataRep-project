import React, { useState, useEffect } from 'react';
import { fetchTodos } from '../services/todoService';

const CompletedTodos = () => {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const getCompletedTodos = async () => {
      const todos = await fetchTodos();
      setCompletedTodos(todos.filter((todo) => todo.completed));
    };
    getCompletedTodos();
  }, []);

  return (
    <div>
      <h1>Completed Todos</h1>
      <ul>
        {completedTodos.map((todo) => (
          <li key={todo._id}>
            {todo.title} - Due: {new Date(todo.dueDate).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTodos;
