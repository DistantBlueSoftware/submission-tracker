import React, { Component } from 'react';
import { history } from './store';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import { Footer } from './Footer';
import { NotFound } from './NotFound';
import ViewPublication from './ViewPublication'
import Home from './Home';
import About from './About';
import Dashboard from './Dashboard';
import PublicationDetail from './PublicationDetail';
import Login from './Login';
import Register from './Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import "react-table/react-table.css";
import * as actions from './actions'

const mapStateToProps = state => {
  return {...state};
}

class App extends Component {
  componentDidMount() {
    this.props.getPublications();
    this.props.getSubmissions();
    if (!this.props.submissions.all.length) this.props.getSubmissions();
    if (this.props.user.username && !this.props.pieces.all.length) this.props.getUserPieces(this.props.user);
  }
  render() {
    return (
      <div>
        <ConnectedRouter history={history}>
          <React.Fragment>
            <Navigation />
            <div>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/publications/new' component={PublicationDetail} />
                <Route exact path='/publications/:slug' component={ViewPublication} />
                <Route exact path='/publications/:slug/edit' component={PublicationDetail} />
                <Route path='*' component={NotFound} />
              </Switch>
              <ToastContainer autoClose={2000} />
            </div>
            <Footer />
          </React.Fragment>
        </ConnectedRouter>
      </div>
    );
  }
}

export default connect (mapStateToProps, actions)(App);
