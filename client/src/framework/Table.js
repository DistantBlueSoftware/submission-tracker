import styled, { css } from 'styled-components';

export const Table = styled.table`
  min-width: 60%;
  thead {
    background: #f8f8f8;
  }
  tr {
    height: 40px;
    transition: all 0.3s;
  }
  td {
    padding: 0.4em;
  }
  th {
    padding: 0.4em;
    font-size: 18px;
    font-weight: bold;
  }

  ${props => props.striped && css`
    tbody > tr:nth-of-type(even) {
      background: #f8f8f8;
    }
  `};
  ${props => props.hover && css`
    tbody > tr:hover {
      cursor: pointer;
      background: #e0ffe3;
    }
  `};
  ${props => props.bordered && css`
    border: 1px solid rgb(60, 60, 60);
    tbody, th, td {
      border: 1px solid rgb(60, 60, 60);
    }
  `};
`;
