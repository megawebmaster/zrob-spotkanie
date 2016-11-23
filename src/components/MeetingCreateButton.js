import React, { Component } from 'react';

class MeetingCreateButton extends Component {
  render() {
    return (
      <div className="MeetingCreateButton form-group pt-1">
        <button className="btn btn-success btn-block" disabled={!this.props.enabled}>Utwórz nowe spotkanie</button>
      </div>
    );
  }
}

export default MeetingCreateButton;
