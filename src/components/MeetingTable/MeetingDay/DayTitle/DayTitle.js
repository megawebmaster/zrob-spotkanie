import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, FormattedDate} from 'react-intl';
import { AttendanceSelector } from '../AttendanceSelector';
import { DayVisibilitySelector } from '../DayVisibilitySelector';
import './DayTitle.scss';

class DayTitle extends React.PureComponent {
  static propTypes = {
    event: PropTypes.object.isRequired,
    participants: PropTypes.array.isRequired,
    isFolded: PropTypes.bool.isRequired,
    currentResponse: PropTypes.string.isRequired,
    showForm: PropTypes.bool.isRequired,
    onFoldChange: PropTypes.func.isRequired,
    onResponseChange: PropTypes.func.isRequired,
  };

  render(){
    let {event, participants, isFolded, currentResponse, showForm, onFoldChange, onResponseChange} = this.props;

    return (
      <tr className="DayTitle">
        <td className="whole-day">
          <DayVisibilitySelector isFolded={isFolded} onChange={onFoldChange} />
          {showForm && <FormattedMessage id="viewMeeting.wholeDay" defaultMessage="Cały dzień:" />}
        </td>
        {showForm && <td className="attendance">
          <AttendanceSelector value={currentResponse} onChange={onResponseChange} />
        </td>}
        <td colSpan={participants.length} className="day">
          <div className="d-sm-none">{event.day.format('dddd')}</div>
          <div className="d-none d-sm-block">{event.day.format('dddd, ')}</div>
          <FormattedDate value={event.day} year="numeric" month="numeric" day="numeric" />
        </td>
      </tr>
    );
  }
}
export default DayTitle;
