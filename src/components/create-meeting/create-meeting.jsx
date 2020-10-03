import React, { useCallback, useState } from 'react';
import Helmet from 'react-helmet';
import Alert from 'react-s-alert';
import { useHistory } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  __,
  any,
  complement,
  either,
  equals,
  map,
  mapObjIndexed,
  mergeDeepRight,
  omit,
  pick,
  pipe,
  propEq,
  propOr, tap,
  values
} from 'ramda';

import { Name } from './components/name/name';
import { Days } from './components/days/days';
import { Resolution, WHOLE_DAY } from './components/resolution/resolution';
import { SaveButton } from '../save-button/save-button';
import { Spinner } from '../spinner/spinner';
import { buildEvents, Schedule } from './components/schedule/schedule';

import './create-meeting.scss';

const scheduleMissingValues = pipe(
  values,
  any(
    either(
      propEq('from', ''),
      propEq('to', ''),
    )
  ),
);

const buildSchedule = pipe(
  mapObjIndexed((item, day) => ({ ...item, day: new Date(parseInt(day, 10)) })),
  values,
);

const buildDailySchedule = pipe(
  mapObjIndexed((item, day) => ({ day: new Date(parseInt(day, 10)) })),
  values,
);

const buildScheduleErrors = pipe(
  map((entry) =>
    entry.from.length > 0 && entry.to.length > 0 && parseInt(entry.from, 10) >= parseInt(entry.to, 10)
      ? { from: 'errors.create-meeting.from.after-to', to: entry.to }
      : entry
  ),
  map(mapObjIndexed((value, key) => value === '' ? `errors.create-meeting.${key}.missing` : (value.startsWith('errors') ? value : ''))),
);

const buildErrors = (name, days, schedule, resolution) => {
  const errors = {};

  if (name === '') {
    errors.name = 'errors.create-meeting.name.missing';
  }
  if (days.length === 0) {
    errors.days = 'errors.create-meeting.days.missing';
  }
  if (resolution === '') {
    errors.resolution = 'errors.create-meeting.resolution.missing';
  }
  if (resolution !== WHOLE_DAY) {
    errors.schedule = buildScheduleErrors(schedule);
  }

  return errors;
};

const CreateMeeting = () => {
  const intl = useIntl();
  const history = useHistory();
  const [name, setName] = useState('');
  const [days, setDays] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [resolution, setResolution] = useState('60');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const updateDays = useCallback((days) => {
    setDays(days);
    setErrors(errors => omit(['days'], errors));
    setSchedule(schedule => pipe(
      map(d => d.valueOf()),
      pick(__, schedule),
      mergeDeepRight(buildEvents(days)),
    )(days));
  }, []);

  const removeDay = useCallback((day) => {
    setDays(days => days.filter(complement(equals(day))));
    setSchedule(schedule => omit([day.valueOf()])(schedule));
  }, []);

  const createMeeting = async () => {
    // ReactGA.event({
    //   category: 'meeting',
    //   action: 'create',
    //   value: resolution,
    // });
    const errors = buildErrors(name, days, schedule, resolution);

    if (errors.name || errors.days || errors.resolution || scheduleMissingValues(schedule)) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/meetings`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          resolution,
          schedule: resolution === WHOLE_DAY ? buildDailySchedule(schedule) : buildSchedule(schedule),
        })
      });

      const result = await response.json();

      if (response.status === 201) {
        localStorage.setItem('newly_created_event', result.hash);
        history.push(`/view/${result.hash}`);
      } else {
        Alert.error('Wystąpiły błędy w formularzu, nie można utworzyć spotkania');
        setLoading(false);
      }
    } catch (e) {
      Alert.error('Błąd połączenia z serwerem. Spróbuj ponownie');
      setLoading(false);
    }
  };

  return (
    <div className="create-meeting">
      <Helmet title={intl.formatMessage({ id: 'createMeeting.title' })} />
      <Name value={name} onChange={setName} error={propOr('', 'name', errors)} />
      <Days days={days} onChange={updateDays} error={propOr('', 'days', errors)} />
      <Resolution value={resolution} onChange={setResolution} error={propOr('', 'resolution', errors)} />
      {resolution !== WHOLE_DAY && (
        <Schedule
          days={days}
          schedule={schedule}
          errors={propOr({}, 'schedule', errors)}
          onChange={setSchedule}
          onRemoveDay={removeDay}
        />
      )}
      <SaveButton onClick={createMeeting} disabled={loading}>
        {loading ? <Spinner /> : <FormattedMessage id="createMeeting.button" />}
      </SaveButton>
    </div>
  );
};

export default CreateMeeting;
