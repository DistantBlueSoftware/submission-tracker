import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Skeleton from 'react-skeleton-loader';
import * as actions from './actions';
import PublicationsList from './PublicationsList';
import SubmissionModal from './SubmissionModal';
import { Button } from './framework'

const mapStateToProps = state => {
  return {...state};
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }
  componentDidMount() {
  
  }
  render() {
    if (!this.props.publications.all.length) {
      return (
        <div style={{padding: '20px'}}>
          <Skeleton width={'400px'} height={'50px'} />
          <Skeleton width={'95vw'} height={'500px'} />
        </div>  
      )
    } else {
      const { user, submissions, publications, history } = this.props;
      const { showModal } = this.state;
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
            <h1>submission manager 1.1</h1>
            <h3>tracking <span style={{color: 'green'}}>{submissionCount}</span> submissions and <span style={{color: 'green'}}>{publicationCount}</span> publications</h3>
          </header>
          {user.authenticated &&
            <React.Fragment>
              <Button blue onClick={() => history.push('/publications/new')}>New Publication</Button>
              <Button green data-toggle='modal' data-target='#submission-modal' isNew={true}>New Submission</Button>
            </React.Fragment>
          }
          <PublicationsList />
          <SubmissionModal show={showModal} />
        </React.Fragment>
      )
    }
  }
}

export default connect(mapStateToProps, actions)(Home);
