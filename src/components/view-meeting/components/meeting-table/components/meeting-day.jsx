import React, { useEffect, useState } from 'react';
import { propOr } from 'ramda';

import { RESPONSE_NONE } from './attendance-selector/attendance-selector';
import { DayHeader } from './day-header/day-header';
import { DayRow } from './day-row/day-row';

export const MeetingDay = ({ event, onResponseChange, participantCount, responses, showForm }) => {
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
        response={propOr(RESPONSE_NONE, event.day, responses.full)}
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
            hour={hour}
            response={responses[hour.hour]}
            onResponseChange={updateHourResponse}
            showForm={showForm}
          />
        );
      })}
    </>
  );
}
