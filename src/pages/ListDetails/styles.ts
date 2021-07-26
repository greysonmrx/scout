import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 70px 25px;
  background-color: ${({ theme }) => theme.colors.background};

  h1 {
    color: ${({ theme }) => theme.colors.black};
    font-size: 35px;
    font-weight: 600;
  }

  h3 {
    color: ${({ theme }) => theme.colors.black};
    font-size: 25px;
    font-weight: 600;
    margin: 40px 0 25px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;

  div.player-details {
    border: 2px solid ${({ theme }) => theme.colors.lightGrey};
    border-radius: 5px;
    padding: 0 25px;
    background-color: ${({ theme }) => theme.colors.white};
    height: 77px;
    width: 100%;
    color: ${({ theme }) => theme.colors.black};

    main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 0;

      div.avatar {
        display: flex;
        align-items: center;
        margin-right: 30px;

        img {
          width: 35px;
          height: 35px;
          margin-right: 15px;
        }

        a {
          font-size: 16px;
          color: ${({ theme }) => theme.colors.black};

          &:hover {
            text-decoration: underline;
          }
        }
      }

      div.right-side {
        display: flex;
        align-items: center;

        div {
          display: flex;
          align-items: center;

          span {
            margin-right: 5px;
          }

          & + div {
            margin-left: 30px;
          }
        }
      }
    }

    & + div {
      margin-top: 15px;
    }
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 70px;

  button {
    min-width: 150px;
    background-color: ${({ theme }) => theme.colors.darkGrey};
  }
`;
