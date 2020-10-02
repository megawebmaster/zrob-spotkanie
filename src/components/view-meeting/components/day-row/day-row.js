import React from 'react';
import { all, equals, map, none, prop } from 'ramda';

import {
  AttendanceSelector,
  RESPONSE_MAYBE,
  RESPONSE_NO,
  RESPONSE_YES
} from '../attendance-selector/attendance-selector';

import './day-row.scss';

const AttendanceIcon = ({ answer }) => (
  <div className="participant-attendance">
    {answer === RESPONSE_YES && <i className="fa fa-fw fa-check" />}
    {answer === RESPONSE_MAYBE && <i className="fa fa-fw fa-question" />}
    {answer === RESPONSE_NO && <i className="fa fa-fw fa-times" />}
  </div>
);

export const DayRow = ({ hour, response, onResponseChange, showForm }) => {
  const answers = map(prop('answer'), hour.answers);
  const isGoodForMeeting = all(equals(RESPONSE_YES))(answers);
  const isConditionalForMeeting = none(equals(RESPONSE_NO))(answers);
  console.log('answers', answers, isGoodForMeeting, isConditionalForMeeting);

  return (
    <tr className="day-row">
      <td className="hour">
        {answers.length > 0 && isGoodForMeeting && <i className="fa fa-fw fa-check" />}
        {answers.length > 0 && !isGoodForMeeting && isConditionalForMeeting && <i className="fa fa-fw fa-question" />}
        {hour.hour}
      </td>
      {showForm && (
        <td className="attendance">
          <AttendanceSelector value={response} onChange={onResponseChange} />
        </td>
      )}
      {hour.answers.map(({ name, answer }) => (
        <td key={`${hour}-${name}`} className="response">
          <AttendanceIcon answer={answer} />
        </td>
      ))}
      {hour.answers.length === 0 && <td className="empty" />}
    </tr>
  );
};
