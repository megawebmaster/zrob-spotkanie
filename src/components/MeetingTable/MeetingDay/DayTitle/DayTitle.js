import React from 'react';
import moment from 'moment';
import { AttendanceSelector } from '../AttendanceSelector';
import { DayVisibilitySelector } from '../DayVisibilitySelector';
import './DayTitle.scss';

class DayTitle extends React.PureComponent {
  static propTypes = {
    day: React.PropTypes.string.isRequired,
    isFolded: React.PropTypes.bool.isRequired,
    isDisabled: React.PropTypes.bool.isRequired,
    currentResponse: React.PropTypes.string.isRequired,
    onFoldChange: React.PropTypes.func.isRequired,
    onResponseChange: React.PropTypes.func.isRequired,
  };

  render(){
    let {day, isFolded, isDisabled, currentResponse, onFoldChange, onResponseChange} = this.props;
    return (
      <div className="DayTitle">
        <span className="whole-day">
          <DayVisibilitySelector isFolded={isFolded} onChange={onFoldChange} />
          Cały dzień:
        </span>
        <AttendanceSelector isDisabled={isDisabled} value={currentResponse} onChange={onResponseChange} />
        <span className="day">{moment(day, 'YYYY-MM-DD').format('dddd, YYYY.MM.DD')}</span>
      </div>
    );
  }
}
export default DayTitle;
