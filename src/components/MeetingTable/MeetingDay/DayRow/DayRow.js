import React from 'react';
import PropTypes from 'prop-types';
import {FormattedTime} from 'react-intl';
import { AttendanceSelector } from '../AttendanceSelector';
import { ParticipantAttendance } from '../ParticipantAttendance';
import './DayRow.scss';

class DayRow extends React.PureComponent {
  static propTypes = {
    hour: PropTypes.object.isRequired,
    responses: PropTypes.object.isRequired,
    currentResponse: PropTypes.string.isRequired,
    error: PropTypes.string,
    showForm: PropTypes.bool.isRequired,
    onResponseChange: PropTypes.func.isRequired,
  };

  render(){
    let { hour, responses, currentResponse, error, showForm, onResponseChange } = this.props;
    let attendance = [];
    let value = hour.format('HH:mm');
    let isGoodForMeeting = Object.keys(responses).length > 0;
    let isConditionalForMeeting = isGoodForMeeting;
    for (let name in responses) {
      if (responses.hasOwnProperty(name)){
        isGoodForMeeting = isGoodForMeeting && responses[name] === 'yes';
        isConditionalForMeeting = isConditionalForMeeting && (responses[name] === 'yes' || responses[name] === 'maybe');
        attendance.push(
          <td key={value + name} className="response">
            <ParticipantAttendance attendance={responses[name]} />
          </td>
        );
      }
    }
    if (attendance.length === 0) {
      attendance.push(<td key={"no-attendance-" + value} className="empty"></td>);
    }

    return (
      <tr className="DayRow">
        <td className="hour">
          { isGoodForMeeting && <i className="fa fa-fw fa-check"></i> }
          { !isGoodForMeeting && isConditionalForMeeting && <i className="fa fa-fw fa-question"></i> }
          <FormattedTime value={hour}></FormattedTime>
        </td>
        {showForm && <td className="attendance">
          <AttendanceSelector error={error} value={currentResponse} onChange={onResponseChange} />
        </td>}
        {attendance}
      </tr>
    );
  }
}
export default DayRow;
