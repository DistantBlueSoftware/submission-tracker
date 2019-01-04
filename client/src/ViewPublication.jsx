import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SocialCard } from './SocialCard';
import SubmissionModal from './SubmissionModal';
import { Button } from './framework';
import Helmet from 'react-helmet';
import moment from 'moment';
import * as actions from './actions';

const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const mapStateToProps = state => {
  return {...state};
}

class ViewPublication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addButton: 'Add to My Publications',
      showModal: false
    }
  }
  
  isFavorite = pub => {
    const { user } = this.props;
    if (user && user.favorites && user.favorites.length)
      return ~user.favorites.indexOf(pub._id) || ~user.favorites.indexOf(pub.slug);
  }
  
  addFavorite = (user, pub) => {
    this.props.addToUserPubs(user, pub);
    this.setState({addButton: 'Added!'})
  }
  
  getDateInfo = () => {
    const { current } = this.props.publications;
    let result = 'no info';
    if (current.openDates && current.openDates.length) {
      result = current.openDates.map(d => <p>{d.openMonth}</p>)
    }
    // else if (current.dateOpenMonth1) result = month[current.dateOpenMonth1-1] + ' ' + current.dateOpenDay1 + '—' + month[current.dateCloseMonth1-1] + ' ' + current.dateCloseDay1;
    return result;
  }
  
  componentDidMount = async () => {
    const {slug} = this.props.match.params;
    const current = await this.props.findPublication(slug);
  }
  
  render() {
    const {match, publications, submissions, user} = this.props;
    const { showModal } = this.state;
    const { all: allSubmissions } = submissions;
    const userSubs = allSubmissions.filter(sub => sub.user === user.username);
    const { current } = publications;
    const pubSubs = allSubmissions.filter(sub => sub.publication === current.name);
    const averageResponseTime = () => {
      let time = 0;
      let responses = 0;
      pubSubs.forEach(sub => {
        if (sub.dateHeard) {
          time += (moment(sub.dateHeard).diff(moment(sub.dateSubmitted), 'days'));
          responses++;
        }
      })
      return Math.ceil(time / responses) + ' days';
    };
    const acceptanceRate = () => {
      let count = pubSubs.length;
      let acceptances = pubSubs.filter(sub => sub.status === 'Accepted').length;
      return ((acceptances / count) * 100).toFixed(2) + '%' + ` (${acceptances}/${count})`;
    }
    const userSubsToPub = userSubs.filter(sub => sub.publication === current.name).map((sub, index) => <tr key={index}><td>{sub.title}</td><td>{moment(sub.dateSubmitted).format('MM/DD/YYYY')}</td><td>{sub.status}</td></tr>)
    const AddButton = this.isFavorite(current) ? <Button disabled green>Added to Favorites</Button> : <Button green onClick={e => this.addFavorite(user, current)}>{this.state.addButton}</Button>
    return (
      <div className='container-fluid'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>{current.name || 'Publication'} - Submission Manager - Home</title>
          <link rel='canonical' href={`https://submissionmanager.phrasemagazine.com/${current.slug}`} />
        </Helmet>
        {user.authenticated &&
          <React.Fragment>
            <Link to={`/publications/${current.slug}/edit`}>
              <Button blue>Edit Publication Details</Button>
            </Link>
            {AddButton}
          </React.Fragment>
        }
      <div>
        <div className='col-md-12'>
          <h1>{current.name || 'publication name'}</h1>
        </div>
        <div className='col-md-6'>
          <h4>{current.description || 'no description'}</h4>
        </div>
        <Button blue data-toggle='modal' data-target='#submission-modal'>Submit Here</Button>
        <div className='col-md-6'>
          Word Count (maximum): {current.wordCount || 'no info'}<br />
          Submission Fee: {current.fee ? `$${current.fee}` : 'no info'}<br />
          Payment Amount: {current.pay ? `$${current.pay}/${current.payType}` : 'no info'}<br />
          Dates Open: {current.alwaysOpen ? 'Always Open' : this.getDateInfo()}<br />
          Average Response Time: {averageResponseTime() !== 'NaN days' ? averageResponseTime() : 'insufficient info'}<br />
          Acceptance Rate: {acceptanceRate() !== 'NaN% (0/0)' ? acceptanceRate() : 'insufficient info'}<br />
        </div>
        <div className='col-md-6'>
          Genres: {current.genre || 'no info'}<br />
        </div>
        <div className='col-md-6'>
          {current.website && <SocialCard link={current.website} />}
          {user.authenticated && userSubsToPub.length > 0 &&
            <div>
            <h3>Your Submissions to {current.name}</h3>
            <table className='table table-striped table-bordered table-responsive'><tbody><tr><th>Title</th><th>Date</th><th>Status</th></tr>{userSubsToPub}</tbody></table>
            </div>
          }

        </div>
        <div className='col-md-12'>
          <p style={{fontSize: '10px'}}>last updated: {moment(current.lastUpdatedDate).format('dddd, MMMM Do YYYY, h:mm:ss A')} by {current.lastUpdatedBy}</p>
        </div>
      </div>
      <SubmissionModal show={showModal} fromPubPage={true} />
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(ViewPublication);
