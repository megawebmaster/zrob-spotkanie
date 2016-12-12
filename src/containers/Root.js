import React from 'react';
import { Router } from 'react-router';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

export default class Root extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
  };

  /* istanbul ignore next */
  render() {
    const { routes, history } = this.props;
    return (
      <div>
        <Router history={history} routes={routes()} />
        <Alert stack={{limit: 3}} effect="stackslide" position="top-right" timeout={4000} />
      </div>
    );
  }
}

