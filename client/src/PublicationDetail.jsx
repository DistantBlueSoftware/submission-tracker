import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import GenreAutosuggest from './GenreAutosuggest';
import moment from 'moment';
import { Button } from './framework';
import { pad, slugify, iterator } from './lib';
import * as actions from './actions';
import { toast } from 'react-toastify';

const mapStateToProps = state => {
  return {...state};
}

class PublicationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alwaysOpen: false,
      dateOpenMonth1: '01',
      dateOpenDay1: 1,
      dateCloseMonth1: '01',
      dateCloseDay1: 1,
      payType: 'work',
      lastUpdatedBy: this.props.user ? this.props.user.username : ''
    }
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
    const { match } = this.props;
    this.setState({
      lastUpdatedBy: this.props.user ? this.props.user.username : '',
      lastUpdatedDate: new Date()
    })
    if (match && match.params && match.params.slug) {
      this.props.updatePublication(this.state, () => toast.success('Publication updated!'));
    } else {
      let pub = this.state;
      //generate slug; if identical slug exists, append a number
      pub.slug = slugify(pub.name);
      const num = iterator(this.props.publications.all, 'slug', pub.slug);
      if (num !== 0) pub.slug = pub.slug + '-' + num;

      this.props.newPublication(pub, () => toast.success(`${pub.name} created!`));
    }
  }

  componentDidMount() {
    const { match, publications } = this.props;
    const isNew = match.params && match.params.slug ? false : true;
    if (!isNew) {
      this.setState({
        ...publications.current
      })
    }
  }
  render() {
    console.log(this.state)
    const {match, user, removePublication} = this.props;
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'].map((month, index) => <option key={index} value={pad(index+1, 2)}>{month}</option>)
    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((day, index) => <option key={index} value={day}>{day}</option>)
    const genres = ['Fiction', 'Nonfiction', 'Poetry', 'Flash Fiction', 'Reviews', 'Translation', 'Art', 'Sound', 'Comics', 'Dance', 'Hybrid']
    const isNew = match.params && match.params.slug ? false : true;
    const pageTitle = this.state.name ? this.state.name : 'New Publication';
    return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`${pageTitle} - Submission Manager - Home`}</title>
        <link rel='canonical' href={`https://submissionmanager.phrasemagazine.com/${this.state.slug}`} />
      </Helmet>
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Publication Name</label>
          <input className='form-control' type='text' name='name' id='name' value={this.state.name} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea className='form-control' name='description' value={this.state.description} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='website'>Website</label>
          <input className='form-control' type='text' name='website' value={this.state.website} onChange={this.handleChange} />
        </div>
        <div className='row'>
          <div className='col-md-2'>
            <div className='form-group'>
              <label htmlFor='wordCount'>Word Count Maximum</label>
              <input className='form-control' type='number' name='wordCount' value={this.state.wordCount} onChange={this.handleChange} />
            </div>
          </div>
          <div className='col-md-2'>
            <div className='form-group'>
              <label htmlFor='fee'>Fee</label>
              <input className='form-control' type='number' name='fee' value={this.state.fee} onChange={this.handleChange} />
            </div>
          </div>
          {!this.state.alwaysOpen && 
            <React.Fragment>
          <div className='col-md-2'>
            <div className='form-group'>
              <label htmlFor='dateOpenMonth1'>Open Date</label>
              <select className='form-control' name='dateOpenMonth1' value={this.state.dateOpenMonth1} onChange={this.handleChange}>
                {months}
              </select>
              <select className='form-control' name='dateOpenDay1' value={this.state.dateOpenDay1} onChange={this.handleChange}>
                {days}
              </select>
            </div>
          </div>
          <div className='col-md-2'>
            <div className='form-group'>
              <label htmlFor='dateCloseMonth1'>Close Date</label>
              <select className='form-control' name='dateCloseMonth1' value={this.state.dateCloseMonth1} onChange={this.handleChange}>
                {months}
              </select>
              <select className='form-control' name='dateCloseDay1' value={this.state.dateCloseDay1} onChange={this.handleChange}>
                {days}
              </select>
            </div>
          </div>
          </React.Fragment>
          }
          <div className='form-check'>
            <input className='form-check-input' type='checkbox' id='alwaysOpen' name='alwaysOpen' checked={this.state.alwaysOpen} onChange={this.handleChange}/>
            <label className='form-check-label' htmlFor='alwaysOpen'>
              Always Open
            </label>
          </div>
  
          <div className='col-md-2'>
            <div className='form-group'>
              <label htmlFor='pay'>Payment Amount</label>
              <input className='form-control' type='number' name='pay' value={this.state.pay} onChange={this.handleChange} />
            </div>
          </div>
          <div className='col-md-2'>
            <div className='form-group'>
              <label htmlFor='payType'>Payment Type</label>
                <select className='form-control' name='payType' id='payType' value={this.state.payType} onChange={this.handleChange}>
                  <option value='work'>per work</option>
                  <option value='page'>per page</option>
                </select>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
              {/*<GenreAutosuggest genres={genres} value={this.state.genre} onChange={this.handleChange} />*/}
          </div>
        </div>
        <Button green type='submit'>{isNew ? 'Add New' : 'Update'}</Button>
      </form>
      {!isNew &&
        <p style={{fontSize: '10px', marginTop: '10px'}}>last updated: {moment(this.state.lastUpdatedDate).format('dddd, MMMM Do YYYY, h:mm:ss A')} by {this.state.lastUpdatedBy}</p>
        }
      {!isNew && user && user.authenticated && user.role === 1 &&
        <div style={{marginBottom: '10px'}}>

          <hr />
          <p style={{fontSize: '12px'}}>This action cannot be undone. Be certain it's what you want.</p>
          <Button red onClick={removePublication}>Delete Publication</Button>
        </div>
      }
      </div>
    )
  }
}



export default connect(mapStateToProps, actions)(PublicationDetail);
