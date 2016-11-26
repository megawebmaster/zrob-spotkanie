import React from 'react';
import { Router } from 'react-router';

export default class Root extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
  };

  /* istanbul ignore next */
  render() {
    const { routes, history } = this.props;
    return (
      <Router history={history} routes={routes()} />
    );
  }
}

