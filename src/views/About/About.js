import React from 'react';
import Helmet from 'react-helmet';

class About extends React.PureComponent {
  render() {
    return (
      <div className="About">
        <Helmet title="O nas" />
        <h1>O nas</h1>
      </div>
    );
  }
}

export default About;
