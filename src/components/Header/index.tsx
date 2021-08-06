import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Container, Wrapper, Item } from './styles';

const Header: React.FC = () => {
  const location = useLocation();

  const [pathName, setPathName] = useState('players');

  useEffect(() => {
    setPathName(location.pathname.split('/')[1]);
  }, [location]);

  return (
    <Container>
      <Wrapper>
        <ul>
          <li>
            <Link to="/players">
              <Item isActive={pathName === 'players'}>Jogadores</Item>
            </Link>
          </li>
          <li>
            <Link to="/clubs">
              <Item isActive={pathName === 'clubs'}>Times</Item>
            </Link>
          </li>
          <li>
            <Link to="/positions">
              <Item isActive={pathName === 'positions'}>Posições</Item>
            </Link>
          </li>
          <li>
            <Link to="/reports">
              <Item isActive={pathName === 'reports'}>Relatórios</Item>
            </Link>
          </li>
          <li>
            <Link to="/lists">
              <Item isActive={pathName === 'lists'}>Listas</Item>
            </Link>
          </li>
          <li>
            <Link to="/tasks">
              <Item isActive={pathName === 'tasks'}>Tarefas</Item>
            </Link>
          </li>
          <li>
            <Link to="/comparison">
              <Item isActive={pathName === 'comparison'}>Comparação</Item>
            </Link>
          </li>
        </ul>
      </Wrapper>
    </Container>
  );
};

export default Header;
