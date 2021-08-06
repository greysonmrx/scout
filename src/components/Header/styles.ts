import styled, { css } from 'styled-components';

type ItemListProps = {
  isActive: boolean;
};

export const Container = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100px;
  padding: 0 30px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
`;

export const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 1366px;

  ul {
    display: flex;
    height: 100%;
    list-style: none;

    li {
      & + li {
        margin-left: 25px;
      }

      a {
        text-decoration: none;
      }
    }
  }
`;

export const Item = styled.span<ItemListProps>`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  font-size: 17px;
  font-weight: 600;
  border-bottom: 3px solid transparent;

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
    border-bottom-color: ${({ theme }) => theme.colors.blue};
  }

  ${({ isActive, theme }) => {
    if (isActive) {
      return css`
        color: ${theme.colors.blue};
        border-color: ${theme.colors.blue};
      `;
    }

    return css`
      color: ${theme.colors.grey};
      border-color: transparent;
    `;
  }}
`;
