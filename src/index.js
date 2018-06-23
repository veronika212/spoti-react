import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { store } from './store/store';

import LoginForm from './pages/login';
import UserProfile from './pages/user-profile/UserProfile';

export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route exact={true} path="/login" component={LoginForm} />
          <Route exact={true} path="/user-profile" component={UserProfile} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
