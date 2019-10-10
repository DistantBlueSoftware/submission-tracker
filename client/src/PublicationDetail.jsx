import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import GenreAutosuggest from './GenreAutosuggest';
import moment from 'moment';
import { AddNewButton } from './AddNewButton';
import { Button } from './framework';
import { pad, slugify, iterator } from './lib';
import * as actions from './actions';
import { toast } from 'react-toastify';

const mapStateToProps = state => {
  return {...state};
}

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'].map((month, index) => <option key={index} value={pad(index+1, 2)}>{month}</option>)
const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((day, index) => <option key={index} value={day}>{day}</option>)

let currentNum = 1;

class DateRange extends Component {
  render() {
    const {date, index, handleChange} = this.props;
    return (
      <React.Fragment>
        <div className='col-md-2'>
          <div className='form-group'>
            <label htmlFor={`date.openMonth${index}`}>Open Date</label>
            <select className='form-control' name={`date.openMonth${index}`} value={date.openMonth} onChange={handleChange}>
              {months}
            </select>
            <select className='form-control' name={`date.openDay${index}`} value={date.openDay} onChange={handleChange}>
              {days}
            </select>
          </div>
        </div>
        <div className='col-md-2'>
          <div className='form-group'>
            <label htmlFor={`date.closeMonth${index}`}>Close Date</label>
            <select className='form-control' name={`date.closeMonth${index}`} value={date.closeMonth} onChange={handleChange}>
              {months}
            </select>
            <select className='form-control' name={`date.closeDay${index}`} value={date.closeDay} onChange={handleChange}>
              {days}
            </select>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

class PublicationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRanges: [1],
      alwaysOpen: false,
      payType: 'work',
      genre: [],
      openDates: [{openDay: 1, openMonth: 1, closeMonth: 2, closeDay: 1}],
      lastUpdatedBy: this.props.user ? this.props.user.username : ''
    }
  }
  
  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name.slice(0, 5) === 'date.') {
      const index = name.slice(-1);
      const key = name.slice(5, name.length - 1);
      const newDate = this.state.openDates[index];
      newDate[key] = value;
      let openDates = this.state.openDates.slice(0,index);
      openDates.push(newDate);
      openDates = openDates.concat(this.state.openDates.slice(index+1))
      this.setState({
        openDates
      })
    } else this.setState({
      [name]: value
    });
  }
  
  handleSuggestion = suggestion => {
    let { genre } = this.state;
    genre.push(suggestion);
    this.setState({
      genre
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { match } = this.props;
    if (match && match.params && match.params.slug) {
      let pub = this.state;
      pub = {
        ...pub, 
        lastUpdatedBy: this.props.user ? this.props.user.username : '',
        lastUpdatedDate: new Date(),
      }
      console.log(pub)
      this.props.updatePublication(pub, () => toast.success('Publication updated!'));
    } else {
      let pub = this.state;
      //generate slug; if identical slug exists, append a number
      pub.slug = slugify(pub.name);
      const num = iterator(this.props.publications.all, 'slug', pub.slug);
      if (num !== 0) pub.slug = pub.slug + '-' + num;

      this.props.newPublication(pub, () => toast.success(`${pub.name} created!`));
    }
  }
  
  addNewDateRange = () => {
    if (this.state.openDates.length + 1 < 7) {
      let result = this.state.openDates;
      result.push({openMonth: 1, openDay: 1, closeMonth: 1, closeDay: 1});
      this.setState({
        openDates: result
      })
    }
  }

  componentDidMount = async () => {
    const { match, publications } = this.props;
    const isNew = match.params && !match.params.slug;
    let current;
    if (!isNew) {
      if (!publications.current.name) {
        current = await this.props.findPublication(match.params.slug);
      } else current = publications.current;
      const num = current && current.openDates ? current.openDates.length + 1 : 1;
      this.setState({
        ...current,
        num,
      })
    }
  }
  render() {
    const {match, user, removePublication} = this.props;
    const genres = ['Fiction', 'Nonfiction', 'Poetry', 'Flash Fiction', 'Reviews', 'Translation', 'Art', 'Sound', 'Comics', 'Dance', 'Hybrid']
    const isNew = match.params && match.params.slug ? false : true;
    const pageTitle = this.state.name || 'New Publication';
    const genreInfo = this.state.genre || null;
    return (
    <div className='container-fluid'>
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
          <div className='col-md-12' style={{display: 'flex', flexFlow: 'row wrap', alignItems: 'center', padding: '10px', border: '1px solid #0E5582', borderRadius: '5px'}}>
            <h4>Reading Periods</h4>
            {!this.state.alwaysOpen && 
              <React.Fragment>
                {this.state.openDates.map((date, index) => <DateRange date={date} index={index} handleChange={this.handleChange} />)}
                <AddNewButton action={this.addNewDateRange} />
              </React.Fragment>
            }
            <div className='form-check'>
              <input className='form-check-input' type='checkbox' id='alwaysOpen' name='alwaysOpen' checked={this.state.alwaysOpen} onChange={this.handleChange}/>
              <label className='form-check-label' htmlFor='alwaysOpen'>
                Always Open
              </label>
            </div>
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
                  <option value='word'>per word</option>
                </select>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
              <GenreAutosuggest genres={genres} value={genreInfo.join(', ')} handleChange={this.handleChange} handleSuggestion={this.handleSuggestion} />
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
