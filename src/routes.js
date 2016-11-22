import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App/App';
import CreateMeetingContainer from './containers/CreateMeetingContainer';
import AboutContainer from './containers/AboutContainer';

const routes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={CreateMeetingContainer} />
    <Route path="about" component={AboutContainer} />
  </Route>
);

export default routes;

