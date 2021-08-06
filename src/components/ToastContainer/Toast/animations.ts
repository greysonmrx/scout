import { keyframes } from 'styled-components';

export const openToastAnimation = keyframes`
  0% {
    right: -300px;
    opacity: 0;
  }

  100% {
    right: 0px;
    opacity: 1;
  }
`;

export const closeToastAnimation = keyframes`
  0% {
    right: 0px;
    opacity: 1;
  }

  100% {
    right: -300px;
    opacity: 0;
  }
`;
