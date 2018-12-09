import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SocialCard } from './SocialCard';
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
  }
  
  isFavorite = pub => {
    return ~this.props.user.favorites.indexOf(pub._id) && ~this.props.user.favorites.indexOf(pub.slug) ? false : true;
  }
  
  componentDidMount = async () => {
    const {slug} = this.props.match.params;
    const current = await this.props.findPublication(slug);
  }
  
  render() {
    const {match, publications, submissions, user, addToUserPubs} = this.props;
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
    const AddButton = user && user.favorites && !this.isFavorite(current) ? <Button green onClick={e => addToUserPubs(user, current)}>Add to My Publications</Button> : <Button disabled green>Added to Favorites</Button>
    return (
      <div>
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
        <div className='col-md-6'>
          Word Count (maximum): {current.wordCount || 'no info'}<br />
          Submission Fee: {current.fee ? `$${current.fee}` : 'no info'}<br />
          Payment Amount: {current.pay ? `$${current.pay}/${current.payType}` : 'no info'}<br />
          Dates Open: {current.alwaysOpen ? 'Always Open' : current.dateOpenMonth1 ? month[current.dateOpenMonth1-1] + ' ' + current.dateOpenDay1 + '—' + month[current.dateCloseMonth1-1] + ' ' + current.dateCloseDay1 : 'no info'}<br />
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
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(ViewPublication);
