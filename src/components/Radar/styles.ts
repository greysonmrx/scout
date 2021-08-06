import styled, { css } from 'styled-components';

type AttributeTypeProps = {
  isActive: boolean;
};

export const Container = styled.div`

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
