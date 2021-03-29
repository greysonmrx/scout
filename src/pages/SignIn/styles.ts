import styled from 'styled-components';

import { appearFromLeft } from './animations';

import signInBackgroundImg from '../../assets/images/auth-background.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30px;
  overflow-x: auto;
  width: 100%;
  max-width: 700px;

  > span {
    text-align: center;
    font-size: 13px;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;

export const Wrapper = styled.div`
  max-width: 500px;
  width: 80%;
  padding-top: 80px;
  animation: ${appearFromLeft} 0.8s ease-out;

  img {
    height: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 50px 0;
    width: 100%;

    button {
      height: 56px;
      margin-top: 40px;
      border: none;
      border-radius: 5px;
      color: ${({ theme }) => theme.colors.white};
      font-weight: 500;
      background-color: ${({ theme }) => theme.colors.blue};
    }

    div + div {
      margin-top: 25px;
    }

    > p {
      margin-top: 20px;
      text-align: center;
      font-weight: 600;

      a {
        color: ${({ theme }) => theme.colors.blue};
        word-break: unset;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export const Top = styled.div`
  margin-top: 60px;

  h1 {
    font-size: 36px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 10px;
  }

  p {
    font-size: 17px;
  }
`;
