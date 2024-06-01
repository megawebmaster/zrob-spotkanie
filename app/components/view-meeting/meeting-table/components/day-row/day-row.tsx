import { all, equals, map, none, prop } from 'ramda';

import type { AttendanceResponse, MeetingHour } from '~/components/view-meeting/types';
import { RESPONSE_MAYBE, RESPONSE_NO, RESPONSE_YES } from '~/components/view-meeting/meeting-table/helpers';

import { AttendanceSelector } from '../attendance-selector/attendance-selector';

import './day-row.scss';

type AttendanceIconProps = {
  answer: AttendanceResponse;
};

const AttendanceIcon = ({ answer }: AttendanceIconProps) => (
  <div className="participant-attendance">
    {answer === RESPONSE_YES && <i className="fa-solid fa-fw fa-check"/>}
    {answer === RESPONSE_MAYBE && <i className="fa-solid fa-fw fa-question"/>}
    {answer === RESPONSE_NO && <i className="fa-solid fa-fw fa-times"/>}
  </div>
);

type DayRowProps = {
  error?: string;
  hour: MeetingHour;
  onResponseChange: (answer: AttendanceResponse) => void;
  response: AttendanceResponse;
  showForm: boolean;
};

export const DayRow = ({ error, hour, onResponseChange, response, showForm }: DayRowProps) => {
  const answers = map(prop('answer'), hour.answers);
  const isGoodForMeeting = all(equals(RESPONSE_YES))(answers);
  const isConditionalForMeeting = none(equals(RESPONSE_NO))(answers);

  return (
    <tr className="day-row">
      <td className="hour">
        {answers.length > 0 && isGoodForMeeting && <i className="fa-solid fa-fw fa-check"/>}
        {answers.length > 0 && !isGoodForMeeting && isConditionalForMeeting &&
          <i className="fa-solid fa-fw fa-question"/>}
        {hour.hour}
      </td>
      {showForm && (
        <td className="attendance">
          <AttendanceSelector error={error} onChange={onResponseChange} value={response}/>
        </td>
      )}
      {hour.answers.map(({ name, answer }) => (
        <td key={`${hour}-${name}`} className="response">
          <AttendanceIcon answer={answer}/>
        </td>
      ))}
      {hour.answers.length === 0 && <td className="empty"/>}
    </tr>
  );
};
