import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as actions from './actions';
import {Button} from './framework';

class Register extends Component {
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
    this.props.doRegister(this.state, () => {
      this.props.history.push('/');
    });
  }
  render() {
    const {errorMessage} = this.props;
    return (
      <div className='container-fluid'>
        <Helmet>
        <meta charSet='utf-8' />
        <title>Register - Submission Manager</title>
        <link rel='canonical' href='https://submissionmanager.phrasemagazine.com/register' />
        </Helmet>
        <form onSubmit={this.handleSubmit}>
          {errorMessage && <div style={{fontSize: '20px', color: 'red'}}>{errorMessage}</div>}
          <div className='form-group'>
            <label htmlFor='email'>Email: </label>
            <input className='form-control' type='email' name='email' id='email' placeholder='email@address.com' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Username: </label>
            <input className='form-control' type='text' name='username' id='username' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Name: </label>
            <input className='form-control' type='text' name='name' id='name' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password: </label>
            <input className='form-control' type='password' name='password' id='password' onChange={this.handleChange} />
          </div>
          <Button blue type='submit'>Register</Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.user.errorMessage };
}

export default connect(mapStateToProps, actions)(Register);
