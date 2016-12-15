import React from 'react';
import { Link } from 'react-router';
import NavLink from './../../components/NavLink';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-light">
          <Link className="navbar-brand" to="/">ZróbSpotkanie.pl</Link>
          <ul className="nav navbar-nav float-xs-right">
            <NavLink to="/">Nowe spotkanie</NavLink>
            <NavLink to="/how-it-works">Jak to działa?</NavLink>
            <NavLink to="/about">O nas</NavLink>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default App;
