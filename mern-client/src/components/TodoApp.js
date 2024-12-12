import React, { useState, useEffect } from 'react'; 
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../services/todoService'; // import service functtions for api interaction

const TodoApp = () => {
  // State for storing the list of todos
  const [todos, setTodos] = useState([]);
  // State for storing the new todo input
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from the server when the component mounts
  useEffect(() => {
    const getTodos = async () => {
      try {
        const todosFromServer = await fetchTodos(); // Call API to fetch todos
        setTodos(todosFromServer); // Update state with fetched todos
      } catch (error) {
        console.error('Error fetching todos:', error); // Handle any errors
      }
    };
    getTodos(); // Trigger fetching of todos
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to handle adding a new todo
  const handleAddTodo = async () => {
    if (!newTodo) return; // Prevent adding empty todos
    try {
      const addedTodo = await addTodo(newTodo); // Call API to add a todo
      setTodos([...todos, addedTodo]); // Update state with the new todo
      setNewTodo(''); // Clear the input field
    } catch (error) {
      console.error('Error adding todo:', error); // Handle any errors
    }
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id); // Call API to delete the todo
      setTodos(todos.filter((todo) => todo._id !== id)); // Remove the deleted todo from state
    } catch (error) {
      console.error('Error deleting todo:', error); // Handle any errors
    }
  };

  // Function to handle marking a todo as completed
  const handleUpdateTodo = async (id) => {
    try {
      const updatedTodo = await updateTodo(id, { completed: true }); // Call API to update the todo
      setTodos(
        todos.map((todo) => (todo._id === id ? updatedTodo : todo)) // Update state with the modified todo
      );
    } catch (error) {
      console.error('Error updating todo:', error); // Handle any errors
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      {/* Input for adding a new todo */}
      <input
        type="text"
        placeholder="Add a new todo"
        value={newTodo} // Bind input value to state
        onChange={(e) => setNewTodo(e.target.value)} // Update state on input change
      />
      <button onClick={handleAddTodo}>Add Todo</button> {/* Button to trigger adding a todo */}
      
      {/* List of todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {/* Display the title and completion status */}
            {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
            <button onClick={() => handleUpdateTodo(todo._id)}>Mark as Completed</button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp; // Export the component
