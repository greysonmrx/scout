import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { SideNoteType } from '.';

type ContainerProps = {
  type: SideNoteType;
};

export const Container = styled.aside<ContainerProps>`
  position: relative;
  border-left: 3px solid transparent;
  border-radius: 6px 6px 6px 3px;
  padding: 24px 32px;
  margin: 30px 0;

  ${({ type, theme }) => {
    if (type === SideNoteType.EXCELLENT) {
      return css`
        border-left-color: ${theme.colors.green};
        background: ${rgba(theme.colors.green, 0.07)};
      `;
    }

    if (type === SideNoteType.GOOD) {
      return css`
        border-left-color: ${theme.colors.orange};
        background: ${rgba(theme.colors.orange, 0.07)};
      `;
    }

    return css`
      border-left-color: ${theme.colors.red.error};
      background: ${rgba(theme.colors.red.error, 0.07)};
    `;
  }}

  div.content {
    div.icon-container {
      padding: 8px;
      position: absolute;
      top: 0px;
      left: 0px;
      transform: translate(-50%, -50%);
      border-radius: ${({ type }) => (type === SideNoteType.BAD ? 25 : 50)}%;
      background: ${({ theme }) => theme.colors.white};

      svg {
        display: block;
      }
    }

    strong {
      color: ${({ theme }) => theme.colors.black};
      font-size: 17px;
    }

    p {
      color: ${({ theme }) => theme.colors.black};
      font-size: 17px;
      margin-top: 8px;
    }
  }

  div.children {
    margin-top: 25px;
  }
`;
