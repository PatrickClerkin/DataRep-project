import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoApp from './components/TodoApp';
import CompletedTodos from './components/CompletedTodos';
import CommentsPage from './components/CommentsPage';
import SchedulePage from './components/SchedulePage';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Todos</Link> | <Link to="/completed">Completed Todos</Link> |{' '}
          <Link to="/schedule">Schedule</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/completed" element={<CompletedTodos />} />
          <Route path="/comments/:todoId" element={<CommentsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
