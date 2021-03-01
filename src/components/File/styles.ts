import styled, { css } from 'styled-components';
import { lighten } from 'polished';

type ContainerProps = {
  width: number;
  height: number;
}

type ContentProps = {
  placeholder: string;
}

export const Container = styled.label<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
  `};

  input {
    display: none;
  }
`;

export const Content = styled.div<ContentProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 2px dashed ${({ theme }) => theme.colors.blue};
  background-color: ${({ theme }) => lighten(0.05, theme.colors.lightGrey)};
  width: 100%;
  height: 100%;

  svg {
    color: ${({ theme }) => theme.colors.blue};
  }

  span {
    position: absolute;
    top: calc(50% + 25px);
    text-align: center;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;
