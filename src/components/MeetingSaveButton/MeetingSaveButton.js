import React from 'react';
import PropTypes from 'prop-types';

class MeetingSaveButton extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    let { onClick, children } = this.props;
    return (
      <div className="MeetingSaveButton form-group pt-1">
        <button className="btn btn-success btn-block" onClick={onClick}>
          {children}
        </button>
      </div>
    );
  }
}

export default MeetingSaveButton;
