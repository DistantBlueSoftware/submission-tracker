import React from 'react';
import styled from 'styled-components';

const SocialContainer = styled.div`
  height: 60px;
  width: 300px;
  padding: 10px;
  display: block;
  border-radius: 5px;
  border: 1px solid #c0c0c0;
`

const SocialIcon = styled.i`
  display: inline-block;
  margin-right: 10px;
  font-size: 24px;
`

export const SocialCard = ({link, facebook, twitter}) => (
  <SocialContainer>
    {link && <a href={link} target='_blank'><SocialIcon className='fas fa-link' style={{color: '#449d44'}} />{link}</a>}
    {facebook && <a href={facebook} target='_blank'><SocialIcon className='fab fa-facebook' style={{color: '#356795'}} /></a>}
    {twitter && <a href={twitter} target='_blank'><SocialIcon className='fab fa-twitter' style={{color: '#4e8abe'}} /></a>}
  </SocialContainer>
)
