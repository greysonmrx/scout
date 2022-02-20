import styled, { css } from 'styled-components';

import { Slider as MUISlider } from '@mui/material';

import { fadeIn, fadeOut, slideIn, slideOut } from './animations';

type BackdropProps = {
  visible: boolean;
  isHidden: boolean;
};

type ContainerProps = {
  visible: boolean;
};

export const Backdrop = styled.div<BackdropProps>`
  display: flex;
  bottom: 0;
  right: 0;
  z-index: 20;
  justify-content: flex-end;
  position: fixed;
  width: 100vw;
  height: 100vh;
  transition: all ease 1s;

  ${({ isHidden }) =>
    isHidden &&
    css`
      display: none;
    `}

  ${({ visible }) =>
    visible &&
    css`
      animation: ${fadeIn} 0.2s;
      background-color: rgba(0, 0, 0, 0.5);
    `}

  ${({ visible }) =>
    !visible &&
    css`
      animation: ${fadeOut} 0.2s;
      background-color: rgba(0, 0, 0, 0);
    `}
`;

export const Container = styled.div<ContainerProps>`
  width: 400px;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  ${({ visible }) =>
    visible &&
    css`
      transform: translateX(0px);
      animation: ${slideIn} 0.2s;
    `}

  ${({ visible }) =>
    !visible &&
    css`
      transform: translateX(400px);
      animation: ${slideOut} 0.2s;
    `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px;

  h3 {
    font-size: 26px;
    color: ${({ theme }) => theme.colors.black};
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }
`;

export const Main = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  padding: 0px 32px 0px;
`;

export const Filter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    display: block;
    line-height: 24px;
    touch-action: manipulation;
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.black};
  }

  & > div.top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      line-height: 24px;
      touch-action: manipulation;
      font-size: 16px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.black};
    }

    button {
      cursor: pointer;
      border: none;
      background: none;
      color: ${({ theme }) => theme.colors.blue};
      text-decoration: underline;
    }
  }

  & > div.attribute {
    padding: 15px 0;

    & + div {
      border-top: 1px solid rgba(124, 141, 181, 0.25);
    }
  }

  & + div {
    margin-top: 20px;
  }
`;

export const Slider = styled(MUISlider)`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.blue};
`;

export const Footer = styled.div`
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  padding: 16px 24px;
  width: 100%;
  box-sizing: border-box;

  & > button.text {
    cursor: pointer;
    border: 0px;
    border-radius: 6px;
    padding: 4px;
    font-size: 18px;
    line-height: 32px;
    color: rgb(234, 29, 44);
    background-color: transparent;
    text-decoration: underline;
    font-weight: normal;
  }

  & > button.filled {
    border: 0px;
    font-weight: normal;
    border-radius: 6px;
    padding: 12px 24px;
    font-size: 18px;
    line-height: 24px;
    color: rgb(255, 255, 255);
    background-color: rgb(234, 29, 44);
    margin-left: 16px;
  }
`;
