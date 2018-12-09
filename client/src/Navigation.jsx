import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Button } from './framework';
import { Avatar } from './Avatar';
import * as actions from './actions';

const mapStateToProps = state => {
  return {...state};
}

const Navigation = ({user, history, doLogout}) => (
  <nav className='navbar navbar-expand-lg navbar-light bg-light'>
    <NavLink className='navbar-brand' to='/'><img src='/vegvisir.png' width={'64px'} alt='subtrack' /></NavLink>
    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
    <span className='navbar-toggler-icon'></span>
  </button>
  <div className='collapse navbar-collapse' id='navbarSupportedContent'>
    <ul className='navbar-nav mr-auto'>
      <NavLink className='nav-link' to='/'><li className='nav-item'>Home</li></NavLink>
      <NavLink className='nav-link' to='/about'><li className='nav-item'>About</li></NavLink>
      {user.authenticated &&
        <NavLink className='nav-link' to='/dashboard'><li className='nav-item'>Dashboard</li></NavLink>
      }
    </ul>
    {user.authenticated ?
      <React.Fragment>
        <span className='navbar-text' style={{marginRight: '20px'}}>Welcome, {user.username}</span>
        <Avatar user={user} />
        <Button green type='button' onClick={() => doLogout(() => history.push('/'))}>Logout</Button>
      </React.Fragment> :
      <React.Fragment>
        <NavLink className='nav-link' to='/login'><span>Login</span></NavLink>
        <NavLink className='nav-link' to='/register'><span>Register</span></NavLink>
      </React.Fragment>
    }
  </div>
  </nav>
)

export default connect(mapStateToProps, actions)(withRouter(Navigation));
