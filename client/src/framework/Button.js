import styled, { css } from 'styled-components';

export const Button = styled.button`
  border-radius: 13px;
  padding: 0.4em 1.2em;
  margin: 1em;
  background: transparent;
  transition: all 0.4s;
  &:hover {
      cursor: pointer;
  }

  ${props => props.blue && css`
    border: 2px solid #1172b0;
    color: #1172b0;
    &:hover {
      background: #0e5582;
      color: white;
    }
  `};
  ${props => props.green && css`
    border: 2px solid #5fb760;
    color: #5fb760;
    &:hover {
      background: #478947;
      color: white;
    }
  `};
  ${props => props.red && css`
    border: 2px solid #d33b3e;
    color: #d33b3e;
    &:hover {
      background: #a02b2d;
      color: white;
    }
  `};
`;
