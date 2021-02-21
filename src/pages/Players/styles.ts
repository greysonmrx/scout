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
  flex-direction: row;
  align-items: center;

  img {
    width: 35px;
    height: 35px;
  }
`;

export const ClubField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 35px;
    height: 35px;
    margin-right: 15px;
  }
`;

export const RecommendationField = styled.div<RecommendationFieldProps>`
  width: 80px;

  span {
    ${({ color }) => css`
      background: ${rgba(color, 0.075)};
      color: ${color};
    `}
    text-transform: uppercase;
    padding: 9px 21px;
    border-radius: 2px;
    font-size: 16px;
    font-weight: 600;
    min-width: 100px;
  }
`;
