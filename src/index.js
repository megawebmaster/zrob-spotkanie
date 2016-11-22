import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import routes from './routes';
import './index.css';

function renderApp(routes) {
  ReactDOM.render(
    <AppContainer>
      <Root routes={routes} history={browserHistory} />
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
