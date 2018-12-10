import styled, { css } from 'styled-components';

const theme = {
  blue: '#1172b0',
  darkblue: '#0e5582',
  green: '#5fb760',
  darkgreen: '#478947',
  red: '#d33b3e',
  darkred: '#a02b2d'
}

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
    border: 2px solid ${theme.blue};
    color: ${theme.blue};
    &:hover {
      background: ${theme.darkblue};
      color: white;
    }
  `};
  ${props => props.green && css`
    border: 2px solid ${theme.green};
    color: ${theme.green};
    &:hover {
      background: ${theme.darkgreen};
      color: white;
    }
  `};
  ${props => props.red && css`
    border: 2px solid ${theme.red};
    color: ${theme.red};
    &:hover {
      background: ${theme.darkred};
      color: white;
    }
  `};
  ${props => props.blue && props.active && css`
    background: ${theme.darkblue};
    color: white;
  `};
  ${props => props.green && props.active && css`
    background: ${theme.darkgreen};
    color: white;
  `};
  ${props => props.red && props.active && css`
    background: ${theme.darkred};
    color: white;
  `};
`;
