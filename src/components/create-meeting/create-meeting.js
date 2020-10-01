import React, { useCallback, useState } from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { any, complement, either, equals, mergeDeepLeft, omit, pick, pipe, propEq, propOr, values } from 'ramda';

import { Name } from './components/name/name';
import { Days } from './components/days/days';
import { Resolution, WHOLE_DAY } from './components/resolution/resolution';
import { SaveButton } from './components/save-button/save-button';
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

const CreateMeeting = () => {
  const intl = useIntl();
  const [name, setName] = useState('');
  const [days, setDays] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [resolution, setResolution] = useState('60');
  const [errors] = useState({});

  const updateDays = useCallback((days) => {
    setDays(days);
    setSchedule(schedule => {
      const existingDays = days.map(day => day.valueOf());
      return mergeDeepLeft(pick(existingDays, schedule), buildEvents(days));
    });
  }, []);

  const removeDay = useCallback((day) => {
    setDays(days => days.filter(complement(equals(day))));
    setSchedule(schedule => omit([day.valueOf()], schedule));
  }, []);

  const createMeeting = () => {
    // TODO: Implement meeting creation
  };

  const hasMissingFields =
    days.length === 0 ||
    name.length === 0 ||
    resolution === '' ||
    (resolution !== WHOLE_DAY && scheduleMissingValues(schedule))
  ;

  return (
    <div className="create-meeting">
      <Helmet title={intl.formatMessage({ id: 'createMeeting.title' })} />
      <Name value={name} onChange={setName} errors={propOr(false, 'name', errors)} />
      <Days days={days} onChange={updateDays}>
        {errors.days && (
          <div className="form-control-feedback">{errors.days.join(', ')}</div>
        )}
      </Days>
      <Resolution value={resolution} onChange={setResolution} errors={propOr(false, 'resolution', errors)} />
      {resolution !== WHOLE_DAY && (
        <Schedule days={days} schedule={schedule} errors={errors} onChange={setSchedule} onRemoveDay={removeDay} />
      )}
      <SaveButton onClick={createMeeting} disabled={hasMissingFields}>
        <FormattedMessage id="createMeeting.button" />
      </SaveButton>
    </div>
  );
};

export default CreateMeeting;
