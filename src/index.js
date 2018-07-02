import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import WebFontLoader from 'webfontloader';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { store } from './store/store';

import LoginForm from './pages/login';
import UserProfile from './pages/user-profile/UserProfile';
import Songs from './pages/songs/Songs';

export const history = createBrowserHistory();

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route exact={true} path="/login" component={LoginForm} />
          <Route exact={true} path="/user-profile" component={UserProfile} />
          <Route exact={true} path="/songs" component={Songs} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
