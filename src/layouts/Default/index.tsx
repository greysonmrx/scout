import React from 'react';

import Header from '../../components/Header';

import { Container, Content } from './styles';

const DefaultLayout: React.FC = ({ children }) => (
  <Container>
    <Header />
    <Content>{children}</Content>
  </Container>
);

export default DefaultLayout;
