import styled from 'styled-components';

type InputRowProps = {
  columns: number;
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

export const InputsContainer = styled.div`
  display: grid;
  column-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  row-gap: 25px;
`;

export const InputRow = styled.div<InputRowProps>`
  display: grid;
  column-gap: 20px;
  grid-template-columns: ${({ columns }) => Array(columns).fill('1fr').join(' ')};

  & + div {
    margin-top: 25px;
  }
`;

export const FileInputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 30px;
`;
