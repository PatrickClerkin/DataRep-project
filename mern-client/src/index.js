import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoApp from './components/TodoApp';
import CompletedTodos from './components/CompletedTodos';
import CommentsPage from './components/CommentsPage';
import SchedulePage from './components/SchedulePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
          <a href="/" style={{ margin: '0 15px' }}>Todos</a>
          <a href="/completed-todos" style={{ margin: '0 15px' }}>Completed Todos</a>
          <a href="/schedule" style={{ margin: '0 15px' }}>Schedule</a>
        </nav>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/completed-todos" element={<CompletedTodos />} />
          <Route path="/comments/:todoId" element={<CommentsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
