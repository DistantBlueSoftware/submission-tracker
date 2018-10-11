import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {...state};
}

const ViewProfile = ({profile}) => (
  <div>
    <h1>profile for {profile.name}</h1>
    <img src={profile.avatar || '/avatar.png'} width='100px'/>
    <p><em>{profile.username}</em></p>
  </div>
)

export default connect(mapStateToProps)(ViewProfile);
