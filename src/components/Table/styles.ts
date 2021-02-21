import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;

  thead {
    th {
      font-weight: 500;
      color: #acb3be;
      text-align: left;
      padding: 20px 15px;

      &:first-child {
        padding-left: 30px;
      }

      &:last-child {
        text-align: center;
      }
    }
  }

  tbody {
    tr {
      background-color: #ffffff;
      border: 2px solid #e3e4e8;

      & + tr {
        padding-bottom: 1em;
      }

      td {
        padding: 20px 25px;
        color: #271b16;
        font-weight: 500;
        font-size: 16px;
        height: 35px;

        &:last-child {
          text-align: center;
        }
      }
    }
  }
`;
