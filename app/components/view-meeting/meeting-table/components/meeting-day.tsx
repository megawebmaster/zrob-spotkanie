import { useEffect, useState } from 'react';
import { all, equals, head, pipe, propOr, values } from 'ramda';

import type { AttendanceResponse, MeetingDay as MeetingDayType } from '~/components/view-meeting/types';
import { hasDailyResponseErrors, RESPONSE_NONE } from '~/components/view-meeting/meeting-table/helpers';
import { DayHeader } from './day-header/day-header';
import { DayRow } from './day-row/day-row';

const getFullDayResponse = (responses: Record<string, AttendanceResponse>): AttendanceResponse => {
  const firstResponse = pipe(values, head)(responses) as AttendanceResponse;
  const allResponsesTheSame = pipe(values, all(equals(firstResponse)))(responses);

  return allResponsesTheSame ? firstResponse : RESPONSE_NONE;
}

type MeetingDayProps = {
  day: MeetingDayType;
  errors: Record<string, string>;
  onResponseChange: (day: string, hour: string, response: AttendanceResponse) => void;
  participantCount: number;
  resolution: number;
  responses: Record<string, AttendanceResponse>;
  showForm: boolean;
};

export const MeetingDay = ({ day, errors, onResponseChange, participantCount, resolution, responses, showForm }: MeetingDayProps) => {
  const [isFolded, setFolded] = useState(false);
  const updateFolding = (fold: boolean) => setFolded(fold);
  const updateDayResponse = (response: AttendanceResponse) => {
    day.hours.forEach(hour => {
      onResponseChange(day.day, hour.hour, response);
    });
    setFolded(true);
  };

  useEffect(() => {
    setFolded(false);
  }, [participantCount]);

  useEffect(() => {
    setFolded((folded) => folded && !hasDailyResponseErrors(errors));
  }, [errors]);

  return (
    <>
      <DayHeader
        day={new Date(day.day)}
        isFolded={isFolded}
        resolution={resolution}
        response={getFullDayResponse(responses)}
        showForm={showForm}
        participantCount={participantCount}
        onFoldChange={updateFolding}
        onResponseChange={updateDayResponse}
      />
      {!isFolded && day.hours.map(hour => {
        const updateHourResponse = (response: AttendanceResponse) => onResponseChange(day.day, hour.hour, response);

        return (
          <DayRow
            key={hour.hour}
            error={propOr('', hour.hour, errors)}
            hour={hour}
            response={responses[hour.hour]}
            onResponseChange={updateHourResponse}
            showForm={showForm}
          />
        );
      })}
    </>
  );
};
