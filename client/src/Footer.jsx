import React from 'react';
import moment from 'moment'

const footerStyle = {
  width: '100vw',
  background: '#d0d0d0',
  padding: '20px 10px',
  fontSize: '12px'
}

const year = moment().format('YYYY')

export const Footer = () => (
  <div style={footerStyle}>Copyright &copy; {year} PHRASE Magazine. Built by <a href='https://distantbluesoftware.com'>distantbluesoftware</a></div>
)