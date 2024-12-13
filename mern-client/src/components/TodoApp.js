import React, { useState, useEffect } from 'react'; 
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../services/todoService'; // Imports
import { Link } from 'react-router-dom'; 
import '../App.css'; 


 //Handles the main functionality of adding, displaying, and managing todos
 
const TodoApp = () => {
  // State variables
  const [todos, setTodos] = useState([]); // Stores the list of todos
  const [newTodo, setNewTodo] = useState(''); // Stores the title of the new todo
  const [dueDate, setDueDate] = useState(''); // Stores the due date of the new todo

  
   // Fetches todos from the server when the component mounts.
   
   
  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos(); // Fetch todos from the server
      setTodos(todosFromServer.filter((todo) => !todo.completed)); // Filter out completed todos
    };
    getTodos();
  }, []); 

 // handles adding a new todo
  const handleAddTodo = async () => {
    if (!newTodo || !dueDate) return; // Ensure both fields are filled
    const addedTodo = await addTodo(newTodo, dueDate); // Call the service to add the todo
    setTodos([...todos, addedTodo]); // Update the state with the new todo
    setNewTodo(''); // Clear the input field
    setDueDate(''); // Clear the due date field
  };

  /**
   * Handles deleting a todo.
   * Removes the todo from the server and updates the state.
   * @param {string} id - The ID of the todo to delete.
   */
  const handleDeleteTodo = async (id) => {
    await deleteTodo(id); // Call the service to delete the todo
    setTodos(todos.filter((todo) => todo._id !== id)); // Remove the todo from the state
  };

  /**
   * Handles marking a todo as completed.
   * Updates the todo on the server and removes it from the list.
   * @param {string} id - The ID of the todo to mark as completed.
   */
  const handleUpdateTodo = async (id) => {
    const updatedTodo = await updateTodo(id, { completed: true }); // Call the service to update the todo
    setTodos(todos.filter((todo) => todo._id !== id)); // Remove the completed todo from the state
  };

  return (
    <div className="container">
      {}
      <h1>Todo List</h1>

      {}
      <div>
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
        <button onClick={handleAddTodo}>Add Todo</button> {}
      </div>

      {}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {}
            <span>
              {todo.title} - Due: {new Date(todo.dueDate).toLocaleString()} -{' '}
              {todo.completed ? 'Completed' : 'Pending'}
            </span>
            {}
            <button onClick={() => handleUpdateTodo(todo._id)}>Mark as Completed</button>
            {}
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            {}
            <Link to={`/comments/${todo._id}`}>Comments</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
