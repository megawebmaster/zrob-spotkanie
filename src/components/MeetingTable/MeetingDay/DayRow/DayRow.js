import React from 'react';
import { AttendanceSelector } from '../AttendanceSelector';
import { ParticipantAttendance } from '../ParticipantAttendance';
import './DayRow.scss';

class DayRow extends React.PureComponent {
  static propTypes = {
    hour: React.PropTypes.object.isRequired,
    responses: React.PropTypes.object.isRequired,
    currentResponse: React.PropTypes.string.isRequired,
    onResponseChange: React.PropTypes.func.isRequired,
  };

  render(){
    let { hour, responses, currentResponse, onResponseChange } = this.props;
    let attendance = [];
    let value = hour.format('HH:mm');
    for (let name in responses) {
      if (responses.hasOwnProperty(name)){
        attendance.push(<ParticipantAttendance key={value + name} attendance={responses[name]} />);
      }
    }
    return (
      <div className="DayRow">
        <div className="hour">{value}</div>
        <AttendanceSelector value={currentResponse} onChange={onResponseChange} />
        {attendance}
      </div>
    );
  }
}
export default DayRow;
