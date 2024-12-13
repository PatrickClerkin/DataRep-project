import React, { useState, useEffect } from 'react';
import { fetchTodos } from '../services/todoService'; 

// used to display a list of todos marked as completed
const CompletedTodos = () => {
  // State to hold the completed todos fetched from the backend
  const [completedTodos, setCompletedTodos] = useState([]);

  // useEffect hook to fetch and filter the completed todos when the component is mounted
  useEffect(() => {
    const getCompletedTodos = async () => {
      // Fetch all todos from the backend using the fetchTodos function
      const todos = await fetchTodos();

      // Filter out only the todos that are marked as completed and update the state
      setCompletedTodos(todos.filter((todo) => todo.completed));
    };

    getCompletedTodos(); 
  }, []); 

  return (
    <div>
      {}
      <h1>Completed Todos</h1>

      {}
      <ul>
        {completedTodos.map((todo) => (
        
          <li key={todo._id}>
            {todo.title} - {}
            Due: {new Date(todo.dueDate).toLocaleString() }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTodos;
