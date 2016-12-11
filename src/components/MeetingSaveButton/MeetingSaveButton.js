import React from 'react';

class MeetingSaveButton extends React.PureComponent {
  static propTypes = {
    enabled: React.PropTypes.bool.isRequired,
    label: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  };

  render() {
    let { enabled, label, onClick } = this.props;
    return (
      <div className="MeetingSaveButton form-group pt-1">
        <button className="btn btn-success btn-block" disabled={!enabled} onClick={() => onClick()}>{label}</button>
      </div>
    );
  }
}

export default MeetingSaveButton;
