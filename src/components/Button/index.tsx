import React, { ButtonHTMLAttributes } from 'react';
import { useTheme } from 'styled-components';
import { darken } from 'polished';

import Loading from '../Loading';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: 'default' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  loading = false,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Container disabled={disabled || loading} {...rest}>
      {loading ? (
        <Loading
          color={theme.colors.white}
          background={darken(0.3, theme.colors.white)}
        />
      ) : (
        children
      )}
    </Container>
  );
};

export default Button;
