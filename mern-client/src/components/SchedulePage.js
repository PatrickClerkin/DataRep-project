import React, { useState, useEffect } from 'react';
import { fetchTodos } from '../services/todoService';

const SchedulePage = () => {
  const [todos, setTodos] = useState([]);

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

  return (
    <div>
      <h1>Todo Schedule</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Todo</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <td>{todo.title}</td>
              <td>{todo.dueDate || 'No Due Date'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulePage;
