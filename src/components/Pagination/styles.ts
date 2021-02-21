import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0px;

  p {
    strong {
      font-weight: 600;
    }
  }

  div {
    display: flex;
    align-items: center;
    flex-direction: row;

    span {
      margin: 0 10px 2px;
    }

    p {
      margin-right: 20px;
    }

    button {
      display: flex;
      border: none;
      background-color: ${({ theme }) => theme.colors.blue};
      width: 22px;
      height: 22px;
      border-radius: 50%;
      align-items: center;
      justify-content: center;

      svg {
        font-size: 18px;
        color: ${({ theme }) => theme.colors.white};
      }

      &:disabled {
        background-color: ${({ theme }) => theme.colors.grey};
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
`;
