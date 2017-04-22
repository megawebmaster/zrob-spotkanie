import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import {Provider} from 'react-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import {addLocaleData, IntlProvider} from 'react-intl';
// import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';
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

addLocaleData([...pl]);

const store = createStore(reducers, applyMiddleware(
  routerMiddleware(browserHistory),
  thunk
));
const history = syncHistoryWithStore(browserHistory, store);
moment.locale('pl');
// TODO: Move messages to separate files (so everything will be properly formatted)
const messages = {
  'app.name': 'ZróbSpotkanie.pl',
  'links.newMeeting': 'Nowe spotkanie',
  'links.howItWorks': 'Jak to działa?',
  'createMeeting.title': 'Utwórz nowe spotkanie',
  'createMeeting.button': 'Utwórz spotkanie',
  'createMeeting.name': 'Podaj nazwę',
  'createMeeting.namePlaceholder': 'np. Podsumowanie sprzedaży Q3',
  'createMeeting.days': 'Wybierz dni',
  'createMeeting.resolution': 'Czas',
  'createMeeting.resolutionSuffix': 'do wyboru',
  'createMeeting.resolutionOption60': 'co godzinę',
  'createMeeting.resolutionOption30': 'co pół godziny',
  'createMeeting.resolutionOption15': 'co 15 minut',
  'createMeeting.schedule': 'Przedziały godzin',
  'createMeeting.scheduleDays': 'Wybierz dni dla spotkania',
  'createMeeting.scheduleDaysAllSmall': 'Wszystkie',
  'createMeeting.scheduleDaysAll': 'Zastosuj do wszystkich',
  'createMeeting.scheduleEntryStart': 'np. 10 lub 8:30',
  'createMeeting.scheduleEntryEnd': 'np. 16 lub 18:45',
  'createMeeting.scheduleEntryRemoveSmall': 'Usuń',
  'createMeeting.scheduleEntryRemove': 'Usuń ten dzień',
};

ReactGA.initialize('UA-91765101-1');

function renderApp(routes) {
  // TODO: Remember to update BOTH locale and key to properly re-render App
  ReactDOM.render(
    <IntlProvider key="pl" locale="pl" messages={messages}>
      <AppContainer>
        <Provider store={store}>
          <Root routes={routes} history={history} />
        </Provider>
      </AppContainer>
    </IntlProvider>,
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
