import React from 'react';
import { Link } from 'react-router';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-faded">
          <Link className="navbar-brand" to="/">ZróbSpotkanie.pl</Link>
          <ul className="nav navbar-nav float-xs-right">
            <li className="nav-item">
              <Link className="nav-link" to="/">Nowe spotkanie <span className="sr-only">(obecna)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">O nas</Link>
            </li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default App;
