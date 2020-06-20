import React from 'react';
import PropTypes from 'prop-types';

class MeetingTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="MeetingTitle form-group">
        <h2>{this.props.title}</h2>
      </div>
    );
  }
}

export default MeetingTitle;
