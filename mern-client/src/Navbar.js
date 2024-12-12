import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Todos</Link></li>
        <li><Link to="/completed">Completed Todos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
