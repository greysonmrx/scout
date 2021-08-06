import styled from 'styled-components';

type ContainerProps = {
  margin: number;
  size: number;
};

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: ${({ size }) => Array(5).fill('').map(() => `${size}px`).join(' ')};
  column-gap: ${({ margin }) => margin}px;

  svg {
    display: block;
  }
`;
