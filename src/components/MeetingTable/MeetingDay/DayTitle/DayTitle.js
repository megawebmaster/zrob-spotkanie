import React from 'react';
import moment from 'moment';
import { AttendanceSelector } from '../AttendanceSelector';
import { DayVisibilitySelector } from '../DayVisibilitySelector';
import './DayTitle.scss';

class DayTitle extends React.Component {
  static propTypes = {
    day: React.PropTypes.object.isRequired,
    isFolded: React.PropTypes.bool.isRequired,
    onFoldChange: React.PropTypes.func.isRequired,
  };

  render(){
    let {day, isFolded, onFoldChange} = this.props;
    return (
      <div className="DayTitle">
        <span className="whole-day">Cały dzień:</span>
        <AttendanceSelector value="" />
        <span className="day">{moment(day).format('dddd, YYYY.MM.DD')}</span>
        <DayVisibilitySelector isFolded={isFolded} onChange={onFoldChange} />
      </div>
    );
  }
}
export default DayTitle;
