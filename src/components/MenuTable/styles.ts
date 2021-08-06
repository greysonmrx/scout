import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 60px;
  background: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
  margin-bottom: 30px;

  div {
    display: flex;
    align-items: center;

    button {
      svg {
        margin-right: 7px;
      }
    }

    input {
      width: 250px;
      border: none;
      background: none;
      padding: 15px 15px;
      border-radius: 6px;

      &::placeholder {
        color: ${({ theme }) => darken(0.2, theme.colors.lightGrey)};
      }
    }

    svg {
      color: ${({ theme }) => theme.colors.grey};
      font-size: 25px;
    }
  }

  ul {
    display: flex;
    height: 100%;

    li {
      & + li {
        margin-left: 20px;
      }

      button {
        height: 100%;
        background: none;
        align-items: center;
        padding: 0 20px;
        font-size: 17px;
        font-weight: 600;

        &:hover {
          color: ${({ theme }) => theme.colors.blue};
          border-bottom-color: ${({ theme }) => theme.colors.blue};
        }
      }
    }
  }
`;
