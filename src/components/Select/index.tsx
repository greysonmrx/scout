import React, { useState, useCallback } from 'react';
import Select, { OptionsType, GroupedOptionsType } from 'react-select';
import { useTheme } from 'styled-components';
import { darken } from 'polished';

import { Container } from './styles';

type SelectComponentProps = {
  name: string;
  options:
    OptionsType<Record<string, unknown>> | GroupedOptionsType<Record<string, unknown>> | undefined;
  onChange(value: any): void;
  defaultValue?: any;
  label: string;
  placeholder: string;
  isDisabled?: boolean;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  placeholder,
  name,
  options,
  onChange,
  defaultValue,
  isDisabled,
}: SelectComponentProps) => {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const customStyles = {
    control: () => ({
      display: 'flex',
      border: '2px solid transparent',
      borderRadius: 5,
      height: 56,
      fontWeight: 500,
      width: '100%',
      padding: '0 7px',
      color: darken(0.2, theme.colors.grey),
      borderColor: isFocused ? theme.colors.blue : darken(0.1, theme.colors.lightGrey),
      transition: 'border 0.2s',
    }),
    option: (provided: Record<string, unknown>) => ({
      ...provided,
      color: darken(0.2, theme.colors.grey),
      padding: 10,
    }),
    singleValue: (provided: Record<string, unknown>) => {
      const color = darken(0.2, theme.colors.grey);
      return { ...provided, color };
    },
  };

  return (
    <Container isFocused={isFocused}>
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        name={name}
        isSearchable
        styles={customStyles}
        options={options}
        onChange={(value) => onChange(value)}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isDisabled={isDisabled}
      />
    </Container>
  );
};

export default SelectComponent;
