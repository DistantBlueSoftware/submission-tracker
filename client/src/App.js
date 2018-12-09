import React, { Component } from 'react';
import { history } from './store';
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

class App extends Component {
  render() {
    return (
      <div>
        <ConnectedRouter history={history}>
          <React.Fragment>
            <Navigation />
            <div className='container-fluid'>
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

export default App;
