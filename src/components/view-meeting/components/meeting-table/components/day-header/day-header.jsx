import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';

import { VisibilityToggle } from '../visibility-toggle/visibility-toggle';
import { AttendanceSelector } from '../attendance-selector/attendance-selector';

import './day-header.scss';

export const DayHeader = ({ day, isFolded, participantCount, response, showForm, onFoldChange, onResponseChange }) => {
  return (
    <tr className="day-header">
      <td className="whole-day">
        <VisibilityToggle visible={!isFolded} onChange={onFoldChange} />
        {showForm && <FormattedMessage id="viewMeeting.wholeDay" />}
      </td>
      {showForm && (
        <td className="attendance">
          <AttendanceSelector value={response} onChange={onResponseChange} />
        </td>
      )}
      <td colSpan={participantCount} className="day">
        <div className="d-sm-none">
          <FormattedDate value={day} weekday="long" />
        </div>
        <div className="d-none d-sm-block">
          <FormattedDate value={day} weekday="long" />,
        </div>
        <FormattedDate value={day} year="numeric" month="numeric" day="numeric" />
      </td>
    </tr>
  );
};
