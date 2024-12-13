import axios from 'axios';

const API_URL = 'http://localhost:4000/api/todos';

// Fetch all todos
export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch completed todos
export const fetchCompletedTodos = async () => {
  const response = await axios.get(`${API_URL}/completed`);
  return response.data;
};

// Add a new todo
export const addTodo = async (title, dueDate) => {
  const response = await axios.post(API_URL, { title, dueDate });
  return response.data;
};

// Update a todo
export const updateTodo = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
