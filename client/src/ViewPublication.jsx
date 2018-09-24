import React from 'react';
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

const ViewPublication = ({match, publications, submissions, user, findPublication}) => {
  const { current } = publications;
  // if (!current.length) current = findPublication(match.props.slug);
  const { all: allSubmissions } = submissions;
  const userSubs = [];
  const averageResponseTime = (publication) => {
    let time = 0;
    let responses = 0;
    const allSubs = allSubmissions.filter(sub => sub.publication === publication);
    allSubs.forEach(sub => {
      if (sub.dateHeard) {
        time += (moment(sub.dateHeard).diff(moment(sub.dateSubmitted), 'days'));
        responses++;
      }
    })
    return time / responses + ' days';
  };
  const userSubsToPub = userSubs.filter(sub => sub.publication === current.name).map((sub, index) => <tr key={index}><td>{sub.title}</td><td>{moment(sub.dateSubmitted).format('MM/DD/YYYY')}</td><td>{sub.status}</td></tr>)
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{current.name} - Submission Manager - Home</title>
        <link rel='canonical' href={`https://submissionmanager.phrasemagazine.com/${current.slug}`} />
      </Helmet>
      {user.authenticated &&
        <Link to={'/publications/' + `${current.slug}` + '/edit'}>
          <Button blue>Edit Publication Details</Button>
        </Link>
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
        Payment Amount: {current.pay ? `$${current.pay} ${current.payType}` : 'no info'}<br />
        Dates Open: {current.dateOpenMonth1 ? month[current.dateOpenMonth1-1] + ' ' + current.dateOpenDay1 + '—' + month[current.dateCloseMonth1-1] + ' ' + current.dateCloseDay1 : 'no info'}<br />
        Average Response Time: {averageResponseTime(current.name) !== 'NaN days' ? averageResponseTime(current.name) : 'no info'}<br />
      </div>
      <div className='col-md-6'>
        Genres: {current.genre || 'no info'}<br />
      </div>
      <div className='col-md-6'>
        <SocialCard link={current.website} />
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

export default connect(mapStateToProps, actions)(ViewPublication);
