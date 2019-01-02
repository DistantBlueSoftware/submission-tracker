import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Elements} from 'react-stripe-elements';
import StripePaymentForm from './StripePaymentForm';
import './About.css';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentSectionVisible: false
    }
  }
  
  togglePaymentSection = () => {
    const {paymentSectionVisible} = this.state;
    this.setState({
      paymentSectionVisible: !paymentSectionVisible
    })
  }
  
  render() {
    const { paymentSectionVisible } = this.state;
    const showPaymentSection = paymentSectionVisible ? {opacity: 1} : {opacity: 0};
    return (
      <div>
        <Helmet>
        <meta charSet='utf-8' />
        <title>Submission Manager - About</title>
        <link rel='canonical' href='https://submissionmanager.phrasemagazine.com/about' />
        </Helmet>
        <div className='container-fluid' style={{minHeight: '75vh'}}>
          <h1>About</h1>
          <p>This tool was developed by writers and artists and submitters who felt that 
            the process of finding markets and then submitting to them was getting byzantine. We would 
            be cross-referencing spreadsheets trying to remember if we sent this piece to this or that journal, 
            if enough time had elapsed that we could send another, if this was one of the paying 
            or non-paying markets, what the word count limit was for this or that journal, etc. etc.</p>
          <p>We decided to build a tool to help track all that. There are good submission and market-tracking 
            options already out there, but they tend to cost money, and we wanted one that didn't. So we thought 
            we'd crowdsource it. Which means we all depend on each other here. Create an account, tell us about 
            your submissions, and contribute to the public dataset.</p>
          <p>There is never a fee for being a member or using this site. If you like what we do and feel moved to donate:</p>
          <div className='donate-section'>
            <ul className='donate-container'>
              {/*<a href='#' className='underline--magical'><li><i className='fab fa-patreon' /> Patreon</li></a>*/}
              <a href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=37K9HUKED3K28&source=url'><li><i className='fab fa-paypal' /> Paypal</li></a>
              <a href='#' onClick={this.togglePaymentSection}><li><i className='fas fa-credit-card' /> Direct</li></a>
            </ul>
            <div className='payment-container' style={showPaymentSection}>
              <Elements>
                  <StripePaymentForm />
                </Elements>
            </div>
          </div>
        </div>
      </div>
    )
  }
}