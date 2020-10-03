import React, { useEffect, useState } from 'react';
import { all, equals, head, pipe, propOr, values } from 'ramda';

import { RESPONSE_NONE } from './attendance-selector/attendance-selector';
import { DayHeader } from './day-header/day-header';
import { DayRow } from './day-row/day-row';

const getFullDayResponse = (responses) => {
  const firstResponse = pipe(values, head)(responses);
  const allResponsesTheSame = pipe(values, all(equals(firstResponse)))(responses);

  return allResponsesTheSame ? firstResponse : RESPONSE_NONE;
}

export const MeetingDay = ({ errors, event, onResponseChange, participantCount, responses, showForm }) => {
  const [isFolded, setFolded] = useState(false);
  const updateFolding = (fold) => setFolded(fold);
  const updateDayResponse = (response) => {
    event.hours.forEach(hour => {
      onResponseChange(event.day, hour.hour, response);
    });
    setFolded(true);
  };

  useEffect(() => {
    setFolded(false);
  }, [participantCount]);

  return (
    <>
      <DayHeader
        day={event.day}
        isFolded={isFolded}
        response={getFullDayResponse(responses)}
        showForm={showForm}
        participantCount={participantCount}
        onFoldChange={updateFolding}
        onResponseChange={updateDayResponse}
      />
      {!isFolded && event.hours.map(hour => {
        const updateHourResponse = (response) => onResponseChange(event.day, hour.hour, response);

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
