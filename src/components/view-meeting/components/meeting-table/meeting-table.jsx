import React, { useCallback, useMemo, useState } from 'react';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import { all, equals, fromPairs, lensPath, map, omit, pathOr, pipe, prop, set, values } from 'ramda';

import { SaveButton } from '../../../save-button/save-button';
import { Participants } from './components/participants/participants';
import { MeetingDay } from './components/meeting-day';
import { Spinner } from '../../../spinner/spinner';
import { RESPONSE_NONE } from './components/attendance-selector/attendance-selector';

import './meeting-table.scss';

const mapHoursTo = (response) => pipe(
  map(({ hour }) => [hour, response]),
  fromPairs,
);
const mapDaysTo = (response) => pipe(
  map(({ day, hours }) => [day.valueOf(), mapHoursTo(response)(hours)]),
  fromPairs,
);

const getParticipants = pipe(
  pathOr([], [0, 'hours', 0, 'answers']),
  map(prop('name')),
);

const buildEmptyResponse = mapDaysTo(RESPONSE_NONE);

// TODO: Block saving responses before everything is set up
export const MeetingTable = ({ days, loading, onSaveResponse }) => {
  const [showForm, setShowForm] = useState(true);
  const participants = useMemo(() => getParticipants(days), [days]);

  const [name, setName] = useState('');
  const [responses, setResponses] = useState(buildEmptyResponse(days));

  const updateResponse = useCallback((day, hour, response) => {
    setResponses(responses => {
      const wholeDayResponse = pipe(
        values(omit([hour, 'full'])),
        all(equals(response))
      )(responses[day]);

      return pipe(
        set(lensPath([day, hour]), response),
        set(lensPath(['full', day]), wholeDayResponse ? response : RESPONSE_NONE),
      )(responses);
    });
  }, []);

  const saveResponses = () => {
    onSaveResponse(name, responses);
    setResponses(buildEmptyResponse(days));
    setName('');
    setShowForm(false);
  };

  return (
    <>
      <div className={cx('meeting-table', { 'no-form': !showForm })}>
        <table className="table">
          <thead>
          <Participants name={name} onNameChange={setName} participants={participants} showForm={showForm} />
          </thead>
          <tbody>
          {days.map((event) => (
            <MeetingDay
              key={event.day}
              event={event}
              onResponseChange={updateResponse}
              participantCount={participants.length}
              responses={responses[event.day]}
              showForm={showForm}
            />
          ))}
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
