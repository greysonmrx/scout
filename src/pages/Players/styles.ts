import styled, { css } from 'styled-components';
import { rgba } from 'polished';

type FilterProps = {
  isActive: boolean;
};

type RecommendationFieldProps = {
  color: string;
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

export const PlayerAvatar = styled.div`
  display: flex;
  justify-content: center;
  width: 35px;
  height: 35px;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const ClubField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    max-width: 35px;
    max-height: 35px;
    margin-right: 15px;
  }
`;

export const RecommendationField = styled.div<RecommendationFieldProps>`
  display: flex;
  justify-content: center;
  width: 80px;

  span {
    ${({ color }) => css`
      background: ${rgba(color, 0.075)};
      color: ${color};
    `}
    text-align: center;
    text-transform: uppercase;
    padding: 9px 21px;
    border-radius: 2px;
    font-size: 16px;
    font-weight: 600;
    width: 100px;
  }
`;

export const Modal = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 20;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 50px;

  > div {
    width: 100%;
    max-width: 800px;
    padding: 30px;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 10px;

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
      form {
        div.inputs-container {
          display: grid;
          grid-template-rows: 1fr;
          grid-template-columns: 0.7fr 1fr 1fr;
          column-gap: 20px;

          div.date {
            display: flex;
            align-items: flex-end;
            justify-content: center;

            p {
              padding: 0px 10px 20px;
            }
          }
        }

        div.attributes-container {
          header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 0 5px;

            button {
              background: none;
              border: none;
              cursor: pointer;

              &:hover {
                text-decoration: underline;
              }
            }
          }
          div.inputs {
            div.input {
              display: grid;
              grid-template-columns: 0.75fr 0.75fr 0.75fr 0.75fr 0.2fr;
              grid-template-rows: 1fr;
              column-gap: 20px;

              button {
                background: none;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }
        }

        > button {
          margin-top: 30px;
          width: 100%;
        }
      }
    }
  }
`;
