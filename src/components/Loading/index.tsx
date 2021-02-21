import React from 'react';

import { Container } from './styles';

type LoadingProps = {
  color: string;
  background: string;
};

const Loading: React.FC<LoadingProps> = ({ background, color }) => (
  <Container background={background} color={color} />
);

export default Loading;
