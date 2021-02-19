import React from 'react';
import { Link } from 'react-router-dom';

const Players: React.FC = () => (
  <div>
    <h1>Players</h1>
    <Link to="/clubs">Clubs</Link>
  </div>
);

export default Players;
