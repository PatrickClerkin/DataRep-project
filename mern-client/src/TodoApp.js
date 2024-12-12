import React, { useState, useEffect } from "react";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./services/todoService";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // fetch todos
  useEffect(() => {
    const getTodos = async () => {
      try {
        const todosFromServer = await fetchTodos();
        setTodos(todosFromServer);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    getTodos();
  }, []);

  // adding a new todo
  const handleAddTodo = async () => {
    if (!newTodo) return;
    try {
      const addedTodo = await addTodo(newTodo);
      setTodos([...todos, addedTodo]); // Update state with the new todo
      setNewTodo(""); // Clear the input field
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // deleting a todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id)); // Remove from state
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // updating a todo
  const handleUpdateTodo = async (id) => {
    try {
      const updatedTodo = await updateTodo(id, { completed: true });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => handleUpdateTodo(todo._id)}>Complete</button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
