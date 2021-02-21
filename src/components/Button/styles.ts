import styled from 'styled-components';
import { darken } from 'polished';

import _Loading from '../Loading';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  border-radius: 5px;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.blue};
  transition: all 0.2s ease-out;
  cursor: pointer;

  &:hover:not(:disabled) {
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }
`;

export const Loading = styled(_Loading)`
  border-color: ${({ theme }) => darken(0.2, theme.colors.white)};
  border-top-color: ${({ theme }) => theme.colors.white};
`;
