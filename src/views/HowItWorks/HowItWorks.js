import React from 'react';
import Helmet from 'react-helmet';

class HowItWorks extends React.PureComponent {
  render() {
    return (
      <div className="HowItWorks">
        <Helmet title="Jak to działa?" />
        <h1>Jak to działa?</h1>
      </div>
    );
  }
}

export default HowItWorks;
