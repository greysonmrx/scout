import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface TostProps {
  type?: 'success' | 'error' | 'warn' | 'info';
}

const colors = {
  info: '#007bc2',
  warn: '#f0a92e',
  success: '#21a67a',
  error: '#d80026',
};

export const Container = styled(animated.div)<TostProps>`
  max-width: 360px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 15px 15px 15px 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.colors.white};
  border-left: 5px solid ${({ type }) => colors[type || 'success']};

  & + div {
    margin-top: 8px;
  }

  > div {
    display: flex;
    align-items: center;

    ${({ type }) => css`
      span {
        background-color: ${colors[type || 'success']};
      }

      > svg {
        color: ${colors[type || 'success']};
      }
    `};

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      border: none;
      outline: none;
      margin-left: 15px;

      svg {
        font-size: 20px;
        color: ${({ theme }) => theme.colors.grey};
      }
    }

    > svg {
      font-size: 26px;
      margin: 0 15px 0 8px;
    }

    div {
      flex: 1;

      strong {
        color: ${({ theme }) => theme.colors.black};
        font-weight: 600;
      }
      p {
        color: ${({ theme }) => theme.colors.lightGrey};
        font-size: 15px;
      }
    }
  }
`;
