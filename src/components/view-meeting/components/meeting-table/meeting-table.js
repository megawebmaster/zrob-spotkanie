import React, { Fragment, useCallback, useMemo, useState } from 'react';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import { all, complement, equals, filter, fromPairs, map, omit, pathOr, pipe, prop, propOr, values } from 'ramda';

import { SaveButton } from '../../../save-button/save-button';
import { Participants } from '../participants/participants';
import { DayHeader } from '../day-header/day-header';
import { DayRow } from '../day-row/day-row';
import { Spinner } from '../../../spinner/spinner';
import { RESPONSE_NONE } from '../attendance-selector/attendance-selector';

import './meeting-table.scss';

const mapHoursTo = (response) => pipe(
  map(({ hour }) => [hour, response]),
  fromPairs,
);
const mapDaysTo = (response) => pipe(
  map(({ day, hours }) => [day.valueOf(), mapHoursTo(response)(hours)]),
  fromPairs,
);

// TODO: There must be a way to clean it up a bit, right?
// TODO: Block saving responses before everything is set up
export const MeetingTable = ({ days, loading, onSaveResponse }) => {
  const [foldedDays, setFoldedDays] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const participants = useMemo(() => map(prop('name'))(pathOr([], [0, 'hours', 0, 'answers'], days)), [days]);

  const [name, setName] = useState('');
  const [responses, setResponses] = useState(mapDaysTo(RESPONSE_NONE)(days));

  const updateResponse = useCallback((day, hour, response) => {
    setResponses(responses => {
      const wholeDayResponse = all(equals(response), values(omit([hour, 'full'], responses[day])));

      return {
        ...responses,
        [day]: {
          ...responses[day],
          [hour]: response,
        },
        full: {
          ...responses.full,
          [day]: wholeDayResponse ? response : RESPONSE_NONE,
        }
      };
    });
  }, []);

  const saveResponses = () => {
    onSaveResponse(name, responses);
    setResponses(mapDaysTo(RESPONSE_NONE)(days));
    setName('');
    setShowForm(false);
    setFoldedDays([]);
  };

  return (
    <>
      <div className={cx('meeting-table', { 'no-form': !showForm })}>
        <table className="table">
          <thead>
          <Participants name={name} onNameChange={setName} participants={participants} showForm={showForm} />
          </thead>
          <tbody>
          {days.map((event) => {
            const isFolded = foldedDays.includes(event.day);
            const updateFolding = (fold) => setFoldedDays(foldedDays =>
              fold ? [...foldedDays, event.day] : filter(complement(equals(event.day)))(foldedDays)
            );
            const updateDayResponse = (response) => {
              event.hours.forEach(hour => {
                updateResponse(event.day, hour.hour, response);
              });
              updateFolding(true);
            };

            return (
              <Fragment key={event.day}>
                <DayHeader
                  day={event.day}
                  isFolded={isFolded}
                  response={propOr(RESPONSE_NONE, event.day, responses.full)}
                  showForm={showForm}
                  participantCount={participants.length}
                  onFoldChange={updateFolding}
                  onResponseChange={updateDayResponse}
                />
                {!isFolded && event.hours.map(hour => {
                  const updateHourResponse = (response) => updateResponse(event.day, hour.hour, response);

                  return (
                    <DayRow
                      key={`${event.day}-${hour.hour}`}
                      hour={hour}
                      response={responses[event.day][hour.hour]}
                      onResponseChange={updateHourResponse}
                      showForm={showForm}
                    />
                  );
                })}
              </Fragment>
            );
          })}
          </tbody>
        </table>
      </div>
      <SaveButton onClick={showForm ? saveResponses : () => setShowForm(true)} disabled={loading}>
        {loading
          ? <Spinner />
          : <FormattedMessage id={showForm ? 'viewMeeting.saveAnswers' : 'viewMeeting.newAnswer'} />}
      </SaveButton>
    </>
  );
};
