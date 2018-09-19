import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import { NotFound } from './NotFound';
import {ViewPublication} from './ViewPublication'
import Home from './Home';
import Dashboard from './Dashboard';
import PublicationDetail from './PublicationDetail';
import Login from './Login';
import Register from './Register';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div>
        <ConnectedRouter history={history}>
          <React.Fragment>
            <Navigation />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/publications/new' component={PublicationDetail} />
              <Route exact path='/publications/:slug' component={ViewPublication} />
              <Route path='*' component={NotFound} />
            </Switch>
          </React.Fragment>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
