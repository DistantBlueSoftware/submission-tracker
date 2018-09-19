import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as actions from './actions';
import PublicationsList from './PublicationsList';

const mapStateToProps = state => {
  return {...state};
}

class Home extends Component {
  componentDidMount() {
    this.props.getPublications();
    this.props.getSubmissions();
  }
  render() {
    const { submissions, publications, history } = this.props;
    const submissionCount = submissions.all && submissions.all.length ? submissions.all.length : 0;
    const publicationCount = publications.all && publications.all.length ? publications.all.length : 0;
    return (
      <React.Fragment>
        <Helmet>
        <meta charSet='utf-8' />
        <title>Submission Manager - Home</title>
        <link rel='canonical' href='https://submissionmanager.phrasemagazine.com/' />
        </Helmet>
        <header>
          <h1>submission manager 1.0</h1>
          <h3>tracking <span style={{color: 'green'}}>{submissionCount}</span> submissions and <span style={{color: 'green'}}>{publicationCount}</span> publications</h3>
        </header>
        <PublicationsList />
        <button className='btn btn-primary' onClick={() => history.push('/publications/new')}>New Publication</button>
        <button className='btn btn-success' onClick={() => history.push('/submissions/new')}>New Submission</button>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, actions)(Home);
