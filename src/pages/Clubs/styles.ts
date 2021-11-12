import styled, { css } from 'styled-components';

type FilterProps = {
  isActive: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 70px 25px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1366px;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 70px;

  h1 {
    color: ${({ theme }) => theme.colors.black};
    font-size: 35px;
    font-weight: 600;
  }

  button {
    min-width: 150px;
  }
`;

export const Filter = styled.button<FilterProps>`
  border: none;
  color: ${({ theme }) => theme.colors.grey};
  border-bottom: 3px solid transparent;

  ${({ isActive }) => {
    if (isActive) {
      return css`
        color: ${({ theme }) => theme.colors.blue};
        border-bottom-color: ${({ theme }) => theme.colors.blue};
      `;
    }

    return null;
  }};
`;

export const ClubShield = styled.div`
  display: flex;
  justify-content: center;
  width: 35px;
  height: 35px;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const Modal = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 20;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 50px;

  > div {
    width: 100%;
    max-width: 500px;
    padding: 30px;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 10px;
    overflow-y: auto;
    max-height: 90vh;

    > header {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding-bottom: 30px;

      h3 {
        color: ${({ theme }) => theme.colors.black};
      }

      button {
        cursor: pointer;
        position: absolute;
        right: 0;
        border: none;
        background: none;
      }
    }

    main {
      div {
        display: flex;
        align-items: center;
        padding: 10px 0;
        
        img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }

        a {
          font-size: 16px;
          color: ${({ theme }) => theme.colors.black};

          &:hover {
            text-decoration: underline;
          }
        }

        & + div {
          border-top: 1px solid ${({ theme }) => theme.colors.lightGrey};
        }
      }
    }
  }
`;
