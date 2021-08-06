import React, {
  useEffect,
  useRef,
  useState,
  InputHTMLAttributes,
  useCallback,
} from 'react';
import { useField } from '@unform/core';

import {
  Container, InputContainer, TextInput, TextError,
} from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  style?: React.CSSProperties;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  style,
  type = 'text',
  ...rest
}) => {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);

  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container style={style} isFocused={isFocused} isErrored={!!error}>
      {label && <label htmlFor={name}>{label}</label>}
      <InputContainer isFocused={isFocused} isErrored={!!error}>
        <TextInput
          defaultValue={defaultValue}
          ref={inputRef}
          type={type}
          id={name}
          {...rest}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </InputContainer>
      {!!error && <TextError>{error}</TextError>}
    </Container>
  );
};

export default Input;
