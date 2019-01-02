import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Skeleton from 'react-skeleton-loader';
import * as actions from './actions';
import PublicationsList from './PublicationsList';
import SubmissionModal from './SubmissionModal';
import { Button } from './framework'
import './Home.css';

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
    //logged-in
    if (this.props.user.authenticated) {
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
          <div className='container-fluid'>
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
          </div>
        )
      }
    } else {
      //logged out
      return (
        <div className='text-center' style={{margin: '0'}}>
          <Helmet>
          <meta charSet='utf-8' />
          <title>Submission Manager - Manage your creative submissions</title>
          <link rel='canonical' href='https://submissionmanager.phrasemagazine.com/' />
          </Helmet>
          <div 
            className='hero' 
            style={{
              color: 'white',
              width: '100vw', 
              height: '100vh', 
              margin: '0', 
              padding: '50px',
              background: 'no-repeat center center fixed', 
              background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url("https://picsum.photos/1600/1200")'
            }}>
            <div className='Home-loggedout'>
              <h1>We track your creative submissions for you.</h1>
              <p>Spend more time on your art, less time on managing it.</p>
              <Link to='/register'><Button white style={{fontSize: '24px'}}>Start Now</Button></Link>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, actions)(Home);
