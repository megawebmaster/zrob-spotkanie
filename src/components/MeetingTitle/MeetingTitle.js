import React from 'react';

class MeetingTitle extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired
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
