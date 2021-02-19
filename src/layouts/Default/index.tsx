import React from 'react';

import { Container, Content } from './styles';

const DefaultLayout: React.FC = ({ children }) => (
  <Container>
    <Content>{children}</Content>
  </Container>
);

export default DefaultLayout;
