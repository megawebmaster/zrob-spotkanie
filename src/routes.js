import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App/App';
import CreateMeeting from './components/CreateMeeting';
import AboutContainer from './containers/AboutContainer';

const routes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={CreateMeeting} />
    <Route path="about" component={AboutContainer} />
  </Route>
);

export default routes;

