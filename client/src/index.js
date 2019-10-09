import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {StripeProvider} from 'react-stripe-elements';
import './index.css';
import { store, persistor } from './store';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {navigator.onLine ? 
        <StripeProvider apiKey='pk_live_ZDHZB0wIpTKrUfSHBZfhHu0o'>
        <App />
      </StripeProvider>
      :
      <App />
    }
    </PersistGate>
  </Provider>, document.getElementById('root'));
// registerServiceWorker();
