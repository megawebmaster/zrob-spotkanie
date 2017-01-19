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
    isDisabled: React.PropTypes.bool.isRequired,
  };

  render(){
    let { hour, responses, currentResponse, onResponseChange, isDisabled } = this.props;
    let attendance = [];
    let value = hour.format('HH:mm');
    let isGoodForMeeting = Object.keys(responses).length > 0;
    let isConditionalForMeeting = isGoodForMeeting;
    for (let name in responses) {
      if (responses.hasOwnProperty(name)){
        isGoodForMeeting = isGoodForMeeting && responses[name] === 'yes';
        isConditionalForMeeting = isConditionalForMeeting && (responses[name] === 'yes' || responses[name] === 'maybe');
        attendance.push(
          <td key={value + name}>
            <ParticipantAttendance attendance={responses[name]} />
          </td>
        );
      }
    }
    return (
      <tr className="DayRow">
        <td className="hour">
          { isGoodForMeeting && <i className="fa fa-fw fa-check"></i> }
          { !isGoodForMeeting && isConditionalForMeeting && <i className="fa fa-fw fa-question"></i> }
          {value}
        </td>
        <td className="attendance">
          <AttendanceSelector isDisabled={isDisabled} value={currentResponse} onChange={onResponseChange} />
        </td>
        {attendance}
      </tr>
    );
  }
}
export default DayRow;
