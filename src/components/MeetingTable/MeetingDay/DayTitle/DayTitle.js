import React from 'react';
import { AttendanceSelector } from '../AttendanceSelector';
import { DayVisibilitySelector } from '../DayVisibilitySelector';
import './DayTitle.scss';

class DayTitle extends React.PureComponent {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    participants: React.PropTypes.array.isRequired,
    isFolded: React.PropTypes.bool.isRequired,
    currentResponse: React.PropTypes.string.isRequired,
    showForm: React.PropTypes.bool.isRequired,
    onFoldChange: React.PropTypes.func.isRequired,
    onResponseChange: React.PropTypes.func.isRequired,
  };

  render(){
    let {event, participants, isFolded, currentResponse, showForm, onFoldChange, onResponseChange} = this.props;

    return (
      <tr className="DayTitle">
        <td className="whole-day">
          <DayVisibilitySelector isFolded={isFolded} onChange={onFoldChange} />
          {showForm && <span>Cały dzień:</span>}
        </td>
        {showForm && <td className="attendance">
          <AttendanceSelector value={currentResponse} onChange={onResponseChange} />
        </td>}
        <td colSpan={participants.length} className="day">{event.day.format('dddd, YYYY.MM.DD')}</td>
      </tr>
    );
  }
}
export default DayTitle;
