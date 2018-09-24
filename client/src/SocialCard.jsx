import React from 'react';

const socialStyle = {
  height: '60px',
  width: '300px',
  padding: '10px',
  display: 'block',
  border: '1px solid black'
}

const buttonStyle = {
  display: 'inline-block',
  marginRight: '10px',
  fontSize: '24px'
}

export const SocialCard = ({link, facebook, twitter}) => (
  <div style={socialStyle}>
    {link && <a href={link}><i className='fas fa-link' style={{color: '#449d44', ...buttonStyle}} />{link}</a>}
    {facebook && <a href={facebook}><i className='fab fa-facebook' style={{color: '#356795', ...buttonStyle}} /></a>}
    {twitter && <a href={twitter}><i className='fab fa-twitter' style={{color: '#4e8abe', ...buttonStyle}} /></a>}
  </div>
)
