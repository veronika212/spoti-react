import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import WebFontLoader from 'webfontloader';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { store, persistor } from './store/store';

import LoginForm from './pages/login';
import UserProfile from './pages/user-profile/UserProfile';
import Songs from './pages/songs/Songs';
import PlaylistDetail from './pages/playlist-detail/PlaylistDetail';
import Artists from './pages/artists/Artists';

export const history = createBrowserHistory();

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<h2>Loading...</h2>} persistor={persistor}>
      <Router history={history}>
        <App>
          <Switch>
            <Route exact={true} path="/login" component={LoginForm} />
            <Route exact={true} path="/user-profile" component={UserProfile} />
            <Route exact={true} path="/songs" component={Songs} />
            <Route exact={true} path="/playlists/:id" component={PlaylistDetail} />
            <Route exact={true} path="/artists" component={Artists} />
          </Switch>
        </App>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
