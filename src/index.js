import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import {Provider} from 'react-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import moment from 'moment';
import Root from './containers/Root';
import routes from './routes';
import reducers from './reducers';

import 'font-awesome/fonts/fontawesome-webfont.eot';
import 'font-awesome/fonts/fontawesome-webfont.svg';
import 'font-awesome/fonts/fontawesome-webfont.ttf';
import 'font-awesome/fonts/fontawesome-webfont.woff';
import 'font-awesome/fonts/fontawesome-webfont.woff2';
import './index.scss';

const store = createStore(reducers, applyMiddleware(
  routerMiddleware(browserHistory),
  thunk
));
const history = syncHistoryWithStore(browserHistory, store);
moment.locale('pl');

ReactGA.initialize('UA-91765101-1');

function renderApp(routes) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Root routes={routes} history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp(routes);

// Hot Module Replacement API
if (module.hot) {
  // Removing weird router errors
  const orgError = console.error; // eslint-disable-line no-console
  console.error = (...args) => { // eslint-disable-line no-console
    if (!(args && args.length === 1 && args[0].indexOf('You cannot change <Router routes>;') > -1)) {
      // Log the error as normally
      orgError.apply(console, args);
    }
  };

  module.hot.accept('./routes', () => {
    renderApp(require('./routes').default);
  });
}
