import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

const mapStateToProps = state => {
  return {...state};
}

const Dashboard = ({user}) => (
  <div>
    <h1>dashboard</h1>
    <h3>{user.name}</h3>
    <img src={user.avatar || '/avatar.png'} width='100px'/>
    <p><em>{user.username}</em></p>
  </div>
)

export default connect(mapStateToProps, actions)(Dashboard);
