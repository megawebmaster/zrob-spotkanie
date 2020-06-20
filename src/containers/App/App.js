import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import {injectIntl} from 'react-intl';
import NavLink from './../../components/NavLink';
import './App.scss';

class App extends React.Component {
  static propTypes = {
    intl: PropTypes.object.isRequired
  };

  render() {
    let format = (id, message) => this.props.intl.formatMessage({id, defaultMessage: message});

    return (
      <div className="container navbar-expand">
        <Helmet titleTemplate={"%s - " + format('app.name', 'ZróbSpotkanie.pl')}
                defaultTitle={format('app.name', 'ZróbSpotkanie.pl')} />
        <nav className="navbar navbar-light bg-light">
          <Link className="navbar-brand" to="/" onlyActiveOnIndex={false}>
            <span className="d-none d-sm-block">
              {format('app.name', 'ZróbSpotkanie.pl')}
            </span>
            <i className="fa fa-calendar d-sm-none" />
          </Link>
          <ul className="navbar-nav">
            <NavLink to="/">{format('links.newMeeting', 'Nowe spotkanie')}</NavLink>
            <NavLink to="/how-it-works">{format('links.howItWorks', 'Jak to działa?')}</NavLink>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default injectIntl(App);
