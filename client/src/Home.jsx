import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
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
    this.props.getPublications();
    this.props.getSubmissions();
  }
  render() {
    const { submissions, publications, history } = this.props;
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
          <h1>submission manager 1.0</h1>
          <h3>tracking <span style={{color: 'green'}}>{submissionCount}</span> submissions and <span style={{color: 'green'}}>{publicationCount}</span> publications</h3>
        </header>
        <PublicationsList />
        <Button blue onClick={() => history.push('/publications/new')}>New Publication</Button>
        <Button green data-toggle='modal' data-target='#submission-modal'>New Submission</Button>
        <SubmissionModal show={showModal} />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, actions)(Home);
