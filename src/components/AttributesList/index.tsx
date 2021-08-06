import React, { OlHTMLAttributes } from 'react';

import { Container } from './styles';

const AttributesList: React.FC<OlHTMLAttributes<HTMLOListElement>> = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

export default AttributesList;
