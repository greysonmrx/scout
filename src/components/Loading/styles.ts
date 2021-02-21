import styled, { keyframes } from 'styled-components';

type ContainerProps = {
  background: string;
  color: string;
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div<ContainerProps>`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ background }) => background};
  border-top-color: ${({ color }) => color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
