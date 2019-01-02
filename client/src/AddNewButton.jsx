import React from 'react';

const buttonStyle = {
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  width: '30px', 
  height: '30px', 
  margin: '10px',
  borderRadius: '100%', 
  background: 'green', 
  color: 'white', 
  cursor: 'pointer'};

export const AddNewButton = ({action}) => (
  <div style={buttonStyle} onClick={action}><i className='fas fa-plus'></i></div>
)