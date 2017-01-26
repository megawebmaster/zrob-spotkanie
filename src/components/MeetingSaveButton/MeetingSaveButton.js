import React from 'react';

class MeetingSaveButton extends React.PureComponent {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  };

  render() {
    let { label, onClick } = this.props;
    return (
      <div className="MeetingSaveButton form-group pt-1">
        <button className="btn btn-success btn-block" onClick={onClick}>{label}</button>
      </div>
    );
  }
}

export default MeetingSaveButton;
