import styled, { css } from 'styled-components';

import _AttributesList from '../../components/AttributesList';

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

  h1 {
    color: ${({ theme }) => theme.colors.black};
    font-size: 35px;
    font-weight: 600;
  }

  h3 {
    color: ${({ theme }) => theme.colors.black};
    font-size: 25px;
    font-weight: 600;
  }

  h5 {
    color: ${({ theme }) => theme.colors.grey};
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
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

export const Informations = styled.div``;

export const TopInformations = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  div {
    &:first-child {
      display: flex;
    }

    &:last-child {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      img {
        height: 200px;
      }
    }
  }
`;

export const AttributesList = styled(_AttributesList)`
  li {
    padding: 12px 0;

    strong {
      width: 100px;
      color: ${({ theme }) => theme.colors.blue};
      font-size: 13px;
      margin-right: 80px;
    }

    span {
      font-size: 13px;
    }
  }
`;

export const Observations = styled.div`
  h3 {
    margin-bottom: 15px;
  }

  p {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.darkGrey};
    line-height: 23px;
    text-align: justify
  }
`;

export const Avatar = styled.div`
  margin-right: 20px;

  img {
    width: 180px;

    &.club-shield {
      position: absolute;
      opacity: 0.1;
      z-index: 1;
    }

    &.player-avatar {
      position: relative;
      z-index: 2;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const Details = styled.div``;

export const Attributes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;

  > div {
    width: fit-content;
    margin: 20px 0 30px;
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

export const Reports = styled.div`
  padding-top: 50px;

  h1 {
    padding-bottom: 40px;
  }
`;
