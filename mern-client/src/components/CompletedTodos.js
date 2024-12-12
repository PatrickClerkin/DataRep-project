import React, { useState, useEffect } from 'react';
import { fetchTodos } from '../services/todoService';

const CompletedTodos = () => {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const getCompletedTodos = async () => {
      const todosFromServer = await fetchTodos();
      setCompletedTodos(todosFromServer.filter((todo) => todo.completed)); // Only fetch completed todos
    };
    getCompletedTodos();
  }, []);

  return (
    <div>
      <h1>Completed Todos</h1>
      <ul>
        {completedTodos.map((todo) => (
          <li key={todo._id}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTodos;
