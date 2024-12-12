import React, { useState, useEffect } from 'react'; // Import React and hooks for state and lifecycle
import { fetchCompletedTodos } from '../services/todoService'; // Import the service function to fetch completed todos

const CompletedTodos = () => {
  // State to store the list of completed todos
  const [completedTodos, setCompletedTodos] = useState([]);

  // useEffect to fetch completed todos when the component mounts
  useEffect(() => {
    const getCompletedTodos = async () => {
      try {
        // Call the API to fetch completed todos
        const todos = await fetchCompletedTodos();
        setCompletedTodos(todos); // Update state with the fetched completed todos
      } catch (error) {
        console.error('Error fetching completed todos:', error); // Log any errors
      }
    };
    getCompletedTodos(); // Trigger fetching of completed todos
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>Completed Todos</h1>
      <ul>
        {/* Map over the completedTodos array to display each completed todo */}
        {completedTodos.map((todo) => (
          <li key={todo._id}>
            {/* Display the title of the completed todo */}
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTodos; // Export the component
