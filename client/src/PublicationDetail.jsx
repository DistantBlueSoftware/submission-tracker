import React, { Component } from 'react';
import { connect } from 'react-redux';
// import GenreAutosuggest from './GenreAutosuggest';
import moment from 'moment';
import { pad, slugify, iterator } from './lib';
import * as actions from './actions';

const mapStateToProps = state => {
  return {...state};
}

class PublicationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
    if (this.props.match.params && this.props.match.params.slug) {
      this.props.updatePublication(this.state);
    } else {
      let pub = this.state;
      //generate slug; if identical slug exists, append a number
      pub.slug = slugify(pub.name);
      const num = iterator(this.props.publications, 'slug', pub.slug);
      if (num !== 0) pub.slug = pub.slug + '-' + num;

      this.props.newPublication(pub);
    }
  }
  render () {
    const {match, publications, user, removePublication} = this.props;
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'].map((month, index) => <option key={index} value={pad(index+1, 2)}>{month}</option>)
    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((day, index) => <option key={index} value={day}>{day}</option>)
    const genres = ['Fiction', 'Nonfiction', 'Poetry', 'Flash Fiction', 'Reviews', 'Translation', 'Art', 'Sound', 'Comics', 'Dance', 'Hybrid']
    const isNew = match.params && match.params.slug ? false : true;
    const publication = isNew ? {} : publications.current;
    return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <div className='row'>
          <div className='col-md-12 col-md-offset-8'>
            {/*!isNew && <Button bsStyle='primary' onClick={addToUserPubs}>Add to My Publications</Button> */}
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Publication Name</label>
          <input className='form-control' type='text' name='name' id='name' placeholder='Enter name' value={publication.name} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea className='form-control' name='description' value={publication.description} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='website'>Website</label>
          <input className='form-control' type='text' name='website' value={publication.website} onChange={this.handleChange} />
        </div>
        <div className='row'>
          <div className='col-md-1'>
            <div className='form-group'>
              <label htmlFor='wordCount'>Word Count Maximum</label>
              <input className='form-control' type='number' name='wordCount' value={publication.wordCount} onChange={this.handleChange} />
            </div>
          </div>
          <div className='col-md-1'>
            <div className='form-group'>
              <label htmlFor='fee'>Fee</label>
              <input className='form-control' type='number' name='fee' value={publication.fee} onChange={this.handleChange} />
            </div>
          </div>
          <div className='col-md-1'>
            <div className='form-group'>
              <label htmlFor='dateOpenMonth1'>Open Date</label>
              <select className='form-control' name='dateOpenMonth1' value={publication.dateOpenMonth1} onChange={this.handleChange}>
                {months}
              </select>
              <select className='form-control' name='dateOpenDay1' value={publication.dateOpenDay1} onChange={this.handleChange}>
                {days}
              </select>
            </div>
          </div>
          <div className='col-md-1'>
            <div className='form-group'>
              <label htmlFor='dateCloseMonth1'>Close Date</label>
              <select className='form-control' name='dateCloseMonth1' value={publication.dateCloseMonth1} onChange={this.handleChange}>
                {months}
              </select>
              <select className='form-control' name='dateCloseDay1' value={publication.dateCloseDay1} onChange={this.handleChange}>
                {days}
              </select>
            </div>
          </div>
          <div className='col-md-1'>
            <div className='form-group'>
              <label htmlFor='pay'>Payment Amount</label>
              <input className='form-control' type='number' name='pay' value={publication.pay} onChange={this.handleChange} />
            </div>
          </div>
          <div className='col-md-1'>
            <div className='form-group'>
              <label htmlFor='payType'>Payment Type</label>
                <select className='form-control' name='payType' value={publication.payType} onChange={this.handleChange}>
                  <option value='per work'>per work</option>
                  <option value='per page'>per page</option>
                </select>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
              {/*<GenreAutosuggest genres={genres} value={publication.genre} onChange={this.handleChange} />*/}
          </div>
        </div>
        <button className='btn btn-success' type='submit'>{isNew ? 'Add New' : 'Update'}</button>
      </form>
      {!isNew &&
        <p style={{fontSize: '10px', marginTop: '10px'}}>last updated: {moment(publication.lastUpdatedDate).format('dddd, MMMM Do YYYY, h:mm:ss A')} by {publication.lastUpdatedBy}</p>
        }
      {user && user.authenticated && user.type === 'admin' &&
        <div style={{marginBottom: '10px'}}>

          <hr />
          <p style={{fontSize: '12px'}}>This action cannot be undone. Be certain it's what you want.</p>
          <button className='btn btn-danger' onClick={removePublication}>Delete Publication</button>
        </div>
      }
      </div>
    )
  }
}



export default connect(mapStateToProps, actions)(PublicationDetail);
