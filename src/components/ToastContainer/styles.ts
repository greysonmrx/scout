import styled, { css } from 'styled-components';

type ContainerProps = {
  hasMessages: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: none;
  flex-direction: column;
  position: fixed;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;
  align-items: flex-end;
  z-index: 99999999;
  ${({ hasMessages }) => hasMessages && css`
    display: flex;
  `}
`;
