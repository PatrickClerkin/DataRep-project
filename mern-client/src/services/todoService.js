import axios from 'axios';
const API_URL = 'http://localhost:4000/api/todos';

export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTodo = async (title) => {
  const response = await axios.post(API_URL, { title });
  return response.data;
};

export const updateTodo = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchComments = async (todoId) => {
  const response = await axios.get(`${API_URL}/${todoId}/comments`);
  return response.data;
};

export const addComment = async (todoId, text) => {
  const response = await axios.post(`${API_URL}/${todoId}/comments`, { text });
  return response.data;
};

export const deleteComment = async (todoId, commentId) => {
  const response = await axios.delete(`${API_URL}/${todoId}/comments/${commentId}`);
  return response.data;
};
