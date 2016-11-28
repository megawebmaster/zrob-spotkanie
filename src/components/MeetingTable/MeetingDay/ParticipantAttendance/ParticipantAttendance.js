import React from 'react';
import './ParticipantAttendance.scss';

class ParticipantAttendance extends React.Component {
  static propTypes = {
    attendance: React.PropTypes.string.isRequired,
  };

  render(){
    let { attendance } = this.props;
    return (
      <div className="ParticipantAttendance">
        {attendance === 'yes' && <i className="fa fa-fw fa-check"></i>}
        {attendance === 'maybe' && <i className="fa fa-fw fa-question"></i>}
        {attendance === 'no' && <i className="fa fa-fw fa-times"></i>}
      </div>
    );
  }
}
export default ParticipantAttendance;
