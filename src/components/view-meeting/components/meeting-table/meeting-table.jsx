import React, { useCallback, useMemo, useState } from 'react';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import { all, equals, flatten, fromPairs, lensPath, map, omit, pathOr, pipe, prop, propOr, set, values } from 'ramda';

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

const buildErrors = (name, responses) => {
  const errors = {};

  if (name === '') {
    errors.name = 'errors.view-meeting.name.missing';
  }

  errors.responses = pipe(
    omit(['full']),
    map(map(v => v === 'none' ? 'errors.view-meeting.responses.missing' : '')),
  )(responses);

  return errors;
};

const hasNoResponsesErrors = pipe(
  prop('responses'),
  values,
  map(values),
  flatten,
  all(equals('')),
);

export const MeetingTable = ({ days, loading, onSaveResponse, resolution }) => {
  const [showForm, setShowForm] = useState(true);
  const participants = useMemo(() => getParticipants(days), [days]);

  const [name, setName] = useState('');
  const [responses, setResponses] = useState(buildEmptyResponse(days));
  const [errors, setErrors] = useState({});

  const updateResponse = useCallback((day, hour, response) => {
    setResponses(set(lensPath([day, hour]), response));
    setErrors(set(lensPath(['responses', day, hour]), ''));
  }, []);

  const saveResponses = () => {
    const errors = buildErrors(name, responses);

    if (errors.name || !hasNoResponsesErrors(errors)) {
      setErrors(errors);
      return;
    }

    onSaveResponse(name, responses);
    setResponses(buildEmptyResponse(days));
    setName('');
    setShowForm(false);
    setErrors({});
  };

  return (
    <>
      <div className={cx('meeting-table', { 'no-form': !showForm })}>
        <table className="table">
          <thead>
          <Participants
            error={propOr('', 'name', errors)}
            name={name}
            onNameChange={setName}
            participants={participants}
            showForm={showForm}
          />
          </thead>
          <tbody>
          {days.map((event) => (
            <MeetingDay
              key={event.day}
              errors={pathOr({}, ['responses', event.day], errors)}
              event={event}
              onResponseChange={updateResponse}
              participantCount={participants.length}
              resolution={resolution}
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
