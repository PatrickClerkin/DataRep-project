import axios from 'axios';

const API_URL = 'http://localhost:4000/api/todos';

// fetch all todos
export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add todo
export const addTodo = async (title) => {
  const response = await axios.post(API_URL, { title });
  return response.data;
};

// update todo
export const updateTodo = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// delete todo
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
