import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import {injectIntl} from 'react-intl';
import NavLink from './../../components/NavLink';
import './App.scss';

class App extends React.Component {
  static propTypes = {
    intl: React.PropTypes.object.isRequired
  };

  render() {
    let {intl} = this.props;

    return (
      <div className="container">
        <Helmet titleTemplate={"%s - " + intl.formatMessage({id: 'app.name'})}
                defaultTitle={intl.formatMessage({id: 'app.name'})} />
        <nav className="navbar navbar-light">
          <Link className="navbar-brand" to="/">
            <span className="hidden-xs-down">{intl.formatMessage({id: 'app.name'})}</span>
            <i className="fa fa-calendar hidden-sm-up"></i>
          </Link>
          <ul className="nav navbar-nav float-xs-right">
            <NavLink to="/">{intl.formatMessage({id: 'links.newMeeting'})}</NavLink>
            <NavLink to="/how-it-works">{intl.formatMessage({id: 'links.howItWorks'})}</NavLink>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default injectIntl(App);
