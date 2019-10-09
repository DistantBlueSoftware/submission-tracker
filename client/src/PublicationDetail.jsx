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
    const {num, parentState, handleChange} = this.props;
    return (
      <React.Fragment>
        <div className='col-md-2'>
          <div className='form-group'>
            <label htmlFor={`dateOpenMonth${num}`}>Open Date</label>
            <select className='form-control' name={`dateOpenMonth${num}`} value={parentState[`dateOpenMonth${num}`]} onChange={handleChange}>
              {months}
            </select>
            <select className='form-control' name={`dateOpenDay${num}`} value={parentState[`dateOpenDay${num}`]} onChange={handleChange}>
              {days}
            </select>
          </div>
        </div>
        <div className='col-md-2'>
          <div className='form-group'>
            <label htmlFor={`dateCloseMonth${num}`}>Close Date</label>
            <select className='form-control' name={`dateCloseMonth${num}`} value={parentState[`dateCloseMonth${num}`]} onChange={handleChange}>
              {months}
            </select>
            <select className='form-control' name={`dateCloseDay${num}`} value={parentState[`dateCloseDay${num}`]} onChange={handleChange}>
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
      num: 1,
      dateRanges: [1],
      alwaysOpen: false,
      dateOpenMonth1: '01',
      dateOpenDay1: 1,
      dateCloseMonth1: '01',
      dateCloseDay1: 1,
      payType: 'work',
      genre: [],
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
    let openDates = [];
    for (let i = 1; i <= this.state.num; i++) {
      if (this.state[`dateOpenMonth${i}`]) openDates.push({
        openMonth: this.state[`dateOpenMonth${i}`],
        openDay: +this.state[`dateOpenDay${i}`],
        closeMonth: this.state[`dateCloseMonth${i}`],
        closeDay: +this.state[`dateCloseDay${i}`]
      })
    }
    this.setState({
      lastUpdatedBy: this.props.user ? this.props.user.username : '',
      lastUpdatedDate: new Date(),
      openDates
    })
    if (match && match.params && match.params.slug) {
      let pub = this.state;
      console.log(pub)
      pub = {
        ...pub, 
        lastUpdatedBy: this.props.user ? this.props.user.username : '',
        lastUpdatedDate: new Date(),
        openDates
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
    const newNum = this.state.num + 1;
    if (newNum < 7) {
      let result = this.state.dateRanges;
      for (let i = result.length; i < newNum; i++) {
        result.push(i);
      }
      this.setState({
        num: newNum,
        dateRanges: result
      })
    }
  }
  
  transposeDateInfo = (pub) => {
    let transposedDates = {};
    if (pub && pub.openDates) {
      for (let i in pub.openDates) {
        transposedDates[`dateOpenMonth${i+1}`] = pub.openDates[i].openMonth;
        transposedDates[`dateOpenDay${i+1}`] = pub.openDates[i].openDay;
        transposedDates[`dateCloseMonth${i+1}`] = pub.openDates[i].closeMonth;
        transposedDates[`dateCloseDay${i+1}`] = pub.openDates[i].closeDay;
      }
      this.setState({
        ...transposedDates,
        num: pub.openDates.length
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
        num
      })
      this.transposeDateInfo(current);
    }
  }
  render() {
    // console.log(this.state)
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
                {this.state.dateRanges.map((item, index) => <DateRange num={index+1} parentState={this.state} handleChange={this.handleChange} />)}
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
