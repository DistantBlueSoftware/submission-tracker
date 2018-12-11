import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requireLogin from './requireLogin';
import * as actions from './actions';
import SubmissionsList from './SubmissionsList';

const mapStateToProps = state => {
  return {...state};
}

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.submissions.all.length) this.props.getSubmissions();
    if (!this.props.pieces.all.length) this.props.getUserPieces();
  }
  render() {
    const {submissions, publications, user, pieces} = this.props;
    const userSubs = submissions.all.filter(sub => sub.user === user.username);
    const getNameForFave = fave => {
      let href;
      const result = publications && publications.all ? publications.all.find(pub => pub._id === fave || pub.slug === fave) : null;
      if (result) href = `/publications/${result.slug}`;
      if (result && href) return <Link to={href}><li>{result.name}</li></Link>
    }
    return (
      <div>
        <Helmet>
        <meta charSet='utf-8' />
        <title>Submission Manager - User Dashboard</title>
        <link rel='canonical' href='https://submissionmanager.phrasemagazine.com/dashboard' />
        </Helmet>
        <h1>dashboard - {user.name}</h1>
        <h2>My Pieces</h2>
        {pieces.all.length > 0 ?
          pieces.all.map(piece => <p>{piece.title}</p>) : 
          <p>No Pieces Tracked Yet -- why not make one?</p>
        }
        <h2>Submissions</h2>
        {userSubs.length > 0 ? <SubmissionsList subs={userSubs} /> : 'No submissions yet. Get going!'}
        <h2>Favorite Publications</h2>
        {user.favorites && user.favorites.length > 0 ? 
          <ul>
            {user.favorites.filter(fave => !!fave).map(fave => getNameForFave(fave))}
          </ul> : 'No faves yet. Why not find some?' 
        }
        {/*<h2>My Pieces</h2>*/}
        
      </div>
    )
  }
  
}

export default connect(mapStateToProps, actions)(requireLogin(Dashboard));
