import styled from 'styled-components';
import { darken } from 'polished';

interface ActionListProps {
  visible: boolean;
}

export const Container = styled.div`
  position: relative;

  > button {
    border: 0;
    background: none;

    svg {
      color: #c6c6c6;
      transition: color 200ms;
    }

    &:hover {
      svg {
        color: ${darken(0.3, '#C6C6C6')};
      }
    }
  }
`;

export const ActionList = styled.div<ActionListProps>`
  position: absolute;
  width: 150px;
  left: calc(50% - 75px);
  top: calc(100% + 5px);
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  display: ${props => (props.visible ? 'block' : 'none')};
  padding: 5px 0px;
  z-index: 2;

  button {
    display: flex;
    flex-direction: row;
    font-size: 16px;
    font-weight: 500;
    align-items: center;
    padding: 15px 20px;
    text-decoration: none;
    border: 0;
    background: none;
    width: 100%;
    color: #071633;
    text-align: left;

    &:hover {
      background-color: #eeeeee;
    }

    &:last-child {
      border-top: 1px solid #ddd;
      color: #e12021;
    }
  }
`;
