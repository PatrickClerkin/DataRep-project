import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoApp from './components/TodoApp';
import CompletedTodos from './components/CompletedTodos';
import CommentsPage from './components/CommentsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoApp />} />
        <Route path="/completed" element={<CompletedTodos />} />
        <Route path="/comments/:todoId" element={<CommentsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
