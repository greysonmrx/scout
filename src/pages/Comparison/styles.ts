import styled, { css } from 'styled-components';

type AttributeTypeProps = {
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
  max-width: 1300px;

  h1 {
    color: ${({ theme }) => theme.colors.black};
    font-size: 35px;
    font-weight: 600;
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 70px;

  > div {
    display: flex;
    align-items: center;
    width: calc(50% - 32.5px);

    &:first-child {
      text-align: left;
      justify-content: flex-start;
    }

    &:last-child {
      text-align: right;
      justify-content: flex-end;
    }
  }

  h3 {
    color: ${({ theme }) => theme.colors.grey};
    font-size: 20px;
    font-weight: 600;
    margin-top: 5px;
  }

  strong {
    color: ${({ theme }) => theme.colors.black};
    font-size: 48px;
    font-weight: 900;
  }
`;

export const Avatar = styled.div`
  img {
    width: 150px;
    height: 150px;

    &:first-child {
      position: absolute;
      opacity: 0.2;
      z-index: 1;
    }

    &:last-child {
      position: relative;
      z-index: 2;
    }
  }

  &:first-child {
    margin-right: 20px;
  }

  &:last-child {
    margin-left: 20px;
  }
`;

export const Informations = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 35px;
  }

  ul {
    li {
      padding: 15px 0;
      font-size: 16px;

      strong {
        width: 110px;
        margin-right: 150px;
      }
    }
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    div {
      &:first-child {
        padding-right: 20px;

        ul {
          li {
            strong {
              color: ${({ theme }) => theme.colors.green};
            }

            span {
              color: ${({ theme }) => theme.colors.darkGrey};
            }
          }
        }
      }

      &:last-child {
        ul {
          li {
            strong {
              color: ${({ theme }) => theme.colors.red.enemy};
            }

            span {
              color: ${({ theme }) => theme.colors.darkGrey};
            }
          }
        }
      }
    }
  }
`;

export const Attributes = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1100px;

    div {
      width: fit-content;
      margin: 20px 0 30px;
    }
  }
`;

export const AttributeType = styled.button<AttributeTypeProps>`
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
