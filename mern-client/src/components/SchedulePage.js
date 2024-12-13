import React, { useState, useEffect } from 'react'; // Importing 
import { fetchTodos } from '../services/todoService'; // Importing 


const SchedulePage = () => {
  // State to store the list of todos fetched from the server
  const [todos, setTodos] = useState([]);

  
  // useEffect hook to fetch todos when the component is mounted ensures only used once//
   
  useEffect(() => {
    // Function to fetch todos from the server
    const getTodos = async () => {
      try {
        // Fetching todos using the fetchTodos function
        const todosFromServer = await fetchTodos();
        // Updating the state with the fetched todos
        setTodos(todosFromServer);
      } catch (error) {
        // error catching
        console.error('Error fetching todos:', error);
      }
    };

    getTodos(); // Calling the function to fetch todos
  }, []); // ensures it only works once

  return (
    <div>
      {}
      <h1>Todo Schedule</h1>

      {}
      <table border="1">
        {}
        <thead>
          <tr>
            <th>Todo</th> {}
            <th>Due Date</th> {}
          </tr>
        </thead>
        {}
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}> {}
              <td>{todo.title}</td> {}
              <td>{todo.dueDate || 'No Due Date'}</td> {}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulePage;
