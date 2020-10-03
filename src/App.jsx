import React, { lazy, Suspense } from 'react';
import Helmet from 'react-helmet';
import Alert from 'react-s-alert';
import { FormattedMessage, useIntl } from 'react-intl';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import { NavbarLink } from './components/navbar-link';
import { Spinner } from './components/spinner/spinner';

import './App.scss';

const CreateMeeting = lazy(() => import('./components/create-meeting/create-meeting'));
const HowItWorks = lazy(() => import('./components/how-it-works/how-it-works'));
const ViewMeeting = lazy(() => import('./components/view-meeting/view-meeting'));

const Navbar = () => (
  <nav className="navbar navbar-light bg-light">
    <Link className="navbar-brand" to="/">
      <span className="d-none d-sm-block">
        <FormattedMessage id="app.name" />
      </span>
      <i className="fa fa-calendar d-sm-none" />
    </Link>
    <ul className="navbar-nav">
      <NavbarLink to="/" exact>
        <FormattedMessage id="links.newMeeting" />
      </NavbarLink>
      <NavbarLink to="/how-it-works">
        <FormattedMessage id="links.howItWorks" />
      </NavbarLink>
    </ul>
  </nav>
);

const App = () => {
  const intl = useIntl();
  const format = (id) => intl.formatMessage({ id });

  return (
    <div className="container navbar-expand">
      <Helmet titleTemplate={`%s - ${format('app.name')}`} defaultTitle={format('app.name')} />
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route path="/" exact component={CreateMeeting} />
            <Route path="/how-it-works" component={HowItWorks} />
            <Route path="/view/:hash" component={ViewMeeting} />
          </Suspense>
        </Switch>
      </BrowserRouter>
      <Alert stack={{ limit: 3 }} effect="stackslide" position="top-right" timeout={4000} />
    </div>
  );
};

export default App;
