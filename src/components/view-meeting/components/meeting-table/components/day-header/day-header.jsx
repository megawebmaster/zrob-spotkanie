import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';

import { VisibilityToggle } from '../visibility-toggle/visibility-toggle';
import { AttendanceSelector } from '../attendance-selector/attendance-selector';
import { WHOLE_DAY } from '../../../../../create-meeting/components/resolution/resolution';

import './day-header.scss';

export const DayHeader = ({ day, isFolded, participantCount, resolution, response, showForm, onFoldChange, onResponseChange }) => {
  return (
    <tr className="day-header">
      <td className="whole-day">
        {resolution !== WHOLE_DAY ? (
          <>
            <VisibilityToggle visible={!isFolded} onChange={onFoldChange} />
            {showForm && <FormattedMessage id="viewMeeting.wholeDay" />}
          </>
        ) : (
          <FormattedMessage id="viewMeeting.dayOfWeek" />
        )}
      </td>
      {resolution !== WHOLE_DAY && showForm && (
        <td className="attendance">
          <AttendanceSelector value={response} onChange={onResponseChange} />
        </td>
      )}
      <td colSpan={participantCount + (resolution === WHOLE_DAY ? 1 : 0)} className="day">
        <div className="d-sm-none">
          <FormattedDate value={day} weekday="long" />
        </div>
        <div className="d-none d-sm-block">
          <FormattedDate value={day} weekday="long" />
          {resolution !== WHOLE_DAY && ','}
        </div>
        {resolution !== WHOLE_DAY && (
          <FormattedDate value={day} year="numeric" month="numeric" day="numeric" />
        )}
      </td>
    </tr>
  );
};
