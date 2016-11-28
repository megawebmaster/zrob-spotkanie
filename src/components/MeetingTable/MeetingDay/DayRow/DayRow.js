import React from 'react';
import { AttendanceSelector } from '../AttendanceSelector';
import { ParticipantAttendance } from '../ParticipantAttendance';
import './DayRow.scss';

class DayRow extends React.Component {
  static propTypes = {
    hour: React.PropTypes.object.isRequired,
    responses: React.PropTypes.object.isRequired,
  };

  render(){
    let { hour, responses } = this.props;
    let attendance = [];
    for (let name in responses) {
      if (responses.hasOwnProperty(name)){
        attendance.push(<ParticipantAttendance key={hour.format('HH:mm') + name} attendance={responses[name]} />);
      }
    }
    return (
      <div className="DayRow">
        <div className="hour">{hour.format('HH:mm')}</div>
        <AttendanceSelector value="" />
        {attendance}
      </div>
    );
  }
}
export default DayRow;
