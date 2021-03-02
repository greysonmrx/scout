import styled from 'styled-components';
import { darken } from 'polished';

type ContainerProps = {
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;

  label {
    font-weight: 600;
    color: ${({ theme, isFocused }) => (isFocused ? darken(0.2, theme.colors.grey) : theme.colors.grey)};
  }

  > div {
    margin-top: 8px;
  }
`;
