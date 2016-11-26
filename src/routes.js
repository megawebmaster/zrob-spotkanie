import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from './containers/App';
import { CreateMeeting } from './views/CreateMeeting';
import { About } from './views/About';

const routes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={CreateMeeting} />
    <Route path="about" component={About} />
  </Route>
);

export default routes;

