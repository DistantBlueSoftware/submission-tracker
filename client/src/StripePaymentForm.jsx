import React, { Component } from 'react';
import {injectStripe, CardElement} from 'react-stripe-elements';
import { connect } from 'react-redux';
import './StripePaymentForm.css';
import { Button } from './framework';
import * as actions from './actions';
import { toast } from 'react-toastify';

const mapStateToProps = state => {
  return {...state};
}

class StripePaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      loading: false
    }
  }
  
  handleChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const {stripe, user, processPayment} = this.props;
    const {amount} = this.state;
    this.setState({
      loading: true
    })
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    stripe.createToken({name: user.username, email: user.email})
      .then(({token}) => processPayment(token, user, amount, () => {
        toast.success(`Thank you for your donation of $${amount}!!`);
        this.setState({ 
          amount: 0,
          loading: false
         });
      }));
    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', owner: {
    //   name: 'Jenny Rosen'
    // }});
  };
  render() {
    const { user } = this.props;
    const { loading } = this.state;
    const buttonText = loading ? <i className='fas fa-spinner fa-spin' /> : 'Donate';
    return (
      <form className='payment-form' onSubmit={this.handleSubmit}>
        <label>Amount:</label>
        <input className='amount-input' type='number' step='.01' min='1' id='amount' name='amount' onChange={this.handleChange} />
        <label>
          Card details
          <CardElement style={{base: {fontSize: '18px'}}} />
        </label>
        <Button blue onClick={e => this.handleSubmit(e)}>{buttonText}</Button>
      </form>
    )
  }
}

export default connect(mapStateToProps, actions)(injectStripe(StripePaymentForm));