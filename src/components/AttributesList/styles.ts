import styled from 'styled-components';

export const Container = styled.ul`
  li {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};

    strong {
      font-weight: 800;
      text-transform: uppercase;
    }

    span {
      color: ${({ theme }) => theme.colors.darkGrey};
    }
  }
`;
