import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {Button} from './framework';
import * as actions from './actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleChange = (e) => {
    const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
    }
    this.props.doLogin(user, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const {errorMessage} = this.props;
    return (
      <div className='Login container-fluid'>
        <Helmet>
        <meta charSet='utf-8' />
        <title>Login - Submission Manager</title>
        <link rel='canonical' href='https://submissionmanager.phrasemagazine.com/login' />
        </Helmet>
        <form onSubmit={this.handleSubmit}>
          {errorMessage && <div style={{fontSize: '20px', color: 'red'}}>{errorMessage}</div>}
          <div className='form-group'>
            <label htmlFor='usernameOrEmail'>Username / Email: </label>
            <input className='form-control' type='text' name='usernameOrEmail' id='usernameOrEmail' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password: </label>
            <input className='form-control' type='password' name='password' id='password' onChange={this.handleChange} />
          </div>
          <Button blue type='submit'>Login</Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.user.errorMessage };
}

export default connect(mapStateToProps, actions)(Login);
