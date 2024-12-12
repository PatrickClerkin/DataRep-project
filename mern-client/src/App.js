import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodoApp from './components/TodoApp';
import CompletedTodos from './components/CompletedTodos';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/completed">Completed Todos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TodoApp />} />
        <Route path="/completed" element={<CompletedTodos />} />
      </Routes>
    </Router>
  );
};

export default App;
