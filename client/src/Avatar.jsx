import React from 'react';

export const Avatar = user => {
  const r = Math.floor(Math.random() * (1 - 0 + 1) );
  let border;
  let avatarUrl = `/avatar_${r}.png`;
  if (r === 0) border = {border: '1px solid #717171'};
  let avatarStyle = {
    background: 'no-repeat center center',
    backgroundSize: 'cover',
    backgroundImage: `url(${avatarUrl})`,
    height: '30px',
    width: '30px',
    ...border,
    borderRadius: '100%'
  };
  return (
    <div style={avatarStyle} ></div>
  )
}
