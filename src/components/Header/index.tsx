import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Container, Wrapper, Item } from './styles';

const Header: React.FC = () => {
  const location = useLocation();

  const [pathName, setPathName] = useState('');

  useEffect(() => {
    setPathName(location.pathname.split('/')[1]);
  }, [location]);

  return (
    <Container>
      <Wrapper>
        <ul>
          <li>
            <Link to="/">
              <Item isActive={pathName === ''}>Jogadores</Item>
            </Link>
          </li>
          <li>
            <Link to="/clubs">
              <Item isActive={pathName === 'clubs'}>Times</Item>
            </Link>
          </li>
        </ul>
      </Wrapper>
    </Container>
  );
};

export default Header;
