import React from 'react';
import moment from 'moment';
import { AttendanceSelector } from '../AttendanceSelector';
import { DayVisibilitySelector } from '../DayVisibilitySelector';
import './DayTitle.scss';

class DayTitle extends React.PureComponent {
  static propTypes = {
    day: React.PropTypes.string.isRequired,
    participants: React.PropTypes.array.isRequired,
    isFolded: React.PropTypes.bool.isRequired,
    isDisabled: React.PropTypes.bool.isRequired,
    currentResponse: React.PropTypes.string.isRequired,
    onFoldChange: React.PropTypes.func.isRequired,
    onResponseChange: React.PropTypes.func.isRequired,
  };

  render(){
    let {day, participants, isFolded, isDisabled, currentResponse, onFoldChange, onResponseChange} = this.props;
    return (
      <tr className="DayTitle">
        <td className="whole-day">
          <DayVisibilitySelector isFolded={isFolded} onChange={onFoldChange} />
          <span>Cały dzień:</span>
        </td>
        <td className="attendance">
          <AttendanceSelector isDisabled={isDisabled} value={currentResponse} onChange={onResponseChange} />
        </td>
        <td colSpan={participants.length} className="day">{moment(day, 'YYYY-MM-DD').format('dddd, YYYY.MM.DD')}</td>
      </tr>
    );
  }
}
export default DayTitle;
