import styled from 'styled-components';
import { darken } from 'polished';

type ContainerProps = {
  isFocused: boolean;
  isErrored: boolean;
}

type InputContainerProps = {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  & + div {
    margin-top: 25px;
  }

  label {
    font-weight: 600;
    color: ${({ theme, isFocused }) => (isFocused ? darken(0.2, theme.colors.grey) : theme.colors.lightGrey)};
    color: ${({ theme, isErrored }) => (isErrored ? theme.colors.red.error : null)};
    transition: all 0.2s;
  }
`;

export const InputContainer = styled.div<InputContainerProps>`
  width: 100%;
  height: 100%;
  border: 2px solid ${({ theme, isFocused }) => (isFocused ? theme.colors.blue : darken(0.1, theme.colors.lightGrey))};
  border-radius: 5px;
  background-color: ${({ theme, isErrored }) => (isErrored ? darken(0.1, theme.colors.white) : theme.colors.white)};
  transition: all 0.2s;
  border-color: ${({ theme, isErrored }) => (isErrored ? theme.colors.red.error : null)};
  margin-top: 8px;

  textarea {
    color: ${({ theme, isErrored }) => (isErrored ? theme.colors.red.error : darken(0.2, theme.colors.grey))};

    &::placeholder {
      color: ${({ theme, isErrored }) => (isErrored ? theme.colors.red.error : theme.colors.lightGrey)};
    }
  }
`;

export const TextInput = styled.textarea`
  width: 100%;
  height: 150px;
  -webkit-appearance: none;
  padding: 15px;
  font-weight: 500;
  border: none;
  background: transparent;
  resize: none;
  transition: all 0.2s;
`;

export const TextError = styled.p`
  margin: 8px 0 0 !important;
  font-weight: 500 !important;
`;
