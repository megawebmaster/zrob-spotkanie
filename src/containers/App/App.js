import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import NavLink from './../../components/NavLink';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Helmet titleTemplate="%s - ZróbSpotkanie.pl" defaultTitle="ZróbSpotkanie.pl" />
        <nav className="navbar navbar-light">
          <Link className="navbar-brand" to="/">
            <span className="hidden-xs-down">ZróbSpotkanie.pl</span>
            <i className="fa fa-calendar hidden-sm-up"></i>
          </Link>
          <ul className="nav navbar-nav float-xs-right">
            <NavLink to="/">Nowe spotkanie</NavLink>
            <NavLink to="/how-it-works">Jak to działa?</NavLink>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default App;
