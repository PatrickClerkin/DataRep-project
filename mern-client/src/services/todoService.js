import axios from 'axios';
const API_URL = 'http://localhost:4000/api/todos';

// Fetch all todos
export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a todo
export const addTodo = async (title) => {
  const response = await axios.post(API_URL, { title });
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

// Fetch completed todos
export const fetchCompletedTodos = async () => {
  const response = await axios.get(`${API_URL}?completed=true`);
  return response.data;
};
