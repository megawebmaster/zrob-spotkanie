import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { IntlProvider } from 'react-intl';

import App from './App';
import * as serviceWorker from './serviceWorker';
import messages from './translations/pl.json';

import './index.scss';

ReactGA.initialize('UA-91765101-1');

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider key="pl" locale="pl" messages={messages}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
