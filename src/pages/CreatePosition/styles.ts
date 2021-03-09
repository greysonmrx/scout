import styled from 'styled-components';

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
  max-width: 1200px;
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

  div {
    display: flex;

    button {
      &:first-child {
        background-color: ${({ theme }) => theme.colors.darkGrey};
        margin-right: 20px;
      }
    }
  }
`;

export const FormContainer = styled.div`
  fieldset {
    border: none;

    & + fieldset {
      margin-top: 50px;
    }

    legend {
      color: ${({ theme }) => theme.colors.black};
      font-size: 25px;
      font-weight: 600;
      margin-bottom: 20px;
    }
  }
`;

export const InputRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
`;
