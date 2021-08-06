import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { FiChevronDown } from 'react-icons/fi';

type ContainerProps = {
  height: number;
};

type RecommendationFieldProps = {
  color: string;
};

type ArrowProps = {
  opened: string;
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  overflow: hidden;
  height: ${({ height }) => height}px;
  border: 2px solid ${({ theme }) => theme.colors.lightGrey};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 0 25px;
  transition: height 0.4s cubic-bezier(0.01, 0.54, 0.48, 1.05);

  & + div {
    margin-top: 10px;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;

    div.profile {
      display: flex;
      align-items: center;

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
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

      p {
        margin-right: 15px;
      }

      button {
        border: none;
        background: none;
      }
    }
  }

  main {
    border-top: 1px solid ${({ theme }) => theme.colors.lightGrey};
    padding: 20px;

    div.note {
      h3 {
        padding-bottom: 12px;
        font-size: 18px;
        color: ${({ theme }) => theme.colors.black};
        font-weight: 600;
      }

      p {
        font-size: 15px;
        color: ${({ theme }) => theme.colors.darkGrey};
        line-height: 23px;
        text-align: justify;
      }
    }

    div.pros-cons-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      column-gap: 50px;

      div {
        padding: 15px 0;

        h5 {
          font-size: 18px;
          font-weight: bold;
        }

        p {
          padding: 10px 0;
        }

        ul {
          li {
            padding: 10px 0;
            border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
          }
        }

        &.pros {
          border-top: 5px solid ${({ theme }) => theme.colors.blue};

          h5 {
            color: ${({ theme }) => theme.colors.blue};
          }
        }

        &.cons {
          border-top: 5px solid ${({ theme }) => theme.colors.red.enemy};

          h5 {
            color: ${({ theme }) => theme.colors.red.enemy};
          }
        }
      }
    }
  }
`;

export const RecommendationField = styled.div<RecommendationFieldProps>`
  display: flex;
  justify-content: center;
  width: 80px;
  margin-right: 30px;

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

export const Arrow = styled(FiChevronDown)<ArrowProps>`
  ${({ opened }) => (opened ? css`
    transform: rotate(180deg);
  ` : css`
    transform: rotate(0);
  `)};

  transition: transform 0.2s ease-out;
`;

export const SideNoteContent = styled.div`
  display: flex;
  align-items: center;

  > div {
    display: flex;
    align-items: center;

    strong {
      color: ${({ theme }) => theme.colors.black};
      font-size: 16px;
      margin-right: 5px;
      font-weight: 600;
    }

    & + div {
      margin-left: 30px;
    }
  }
`;
