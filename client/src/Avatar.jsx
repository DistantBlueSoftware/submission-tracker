import React from 'react';

export const Avatar = user => {
  let avatarUrl = '/avatar.png';
  let avatarStyle = {background: 'no-repeat center center', backgroundSize: 'cover', backgroundImage: `url(${avatarUrl})`, height: '30px', width: '30px', border: '1px solid #717171', borderRadius: '100%'};
  return (
    <div style={avatarStyle} ></div>
  )
}
