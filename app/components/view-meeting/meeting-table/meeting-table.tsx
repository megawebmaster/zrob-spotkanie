import { useCallback, useMemo, useState } from 'react';
import { fromPairs, lensPath, map, omit, pathOr, pipe, prop, propOr, set } from 'ramda';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import cx from 'clsx';

import type { AttendanceResponse, MeetingDay as MeetingDayType, MeetingHour } from '~/components/view-meeting/types';
import { SaveButton } from '~/components/save-button/save-button';
import { Spinner } from '~/components/spinner/spinner';
import { fetch } from '~/helpers';

import { Participants } from './components/participants/participants';
import { MeetingDay } from './components/meeting-day';
import { buildResponseErrors, hasResponseErrors, RESPONSE_NONE } from './helpers';

import './meeting-table.scss';

const mapHoursTo = (response: AttendanceResponse) => pipe(
  map(({ hour }: MeetingHour): [string, AttendanceResponse] => [hour, response]),
  fromPairs,
);
const mapDaysTo = (response: AttendanceResponse) => pipe(
  map(({ day, hours }: MeetingDayType): [string, Record<string, AttendanceResponse>] => [
    day,
    mapHoursTo(response)(hours)
  ]),
  fromPairs,
);

const getParticipants = pipe(
  pathOr([], [0, 'hours', 0, 'answers']),
  map(prop('name')),
);

const buildEmptyResponse = mapDaysTo(RESPONSE_NONE);

export type Responses = Record<string, Record<string, AttendanceResponse>>;

const buildErrors = (name: string, responses: Responses) => {
  const errors: { name?: string; responses?: Record<string, Record<string, string>> } = {};

  if (name === '') {
    errors.name = 'errors.view-meeting.name.missing';
  }

  const responseErrors = buildResponseErrors(responses);

  if (hasResponseErrors(responseErrors)) {
    errors.responses = responseErrors;
  }

  return errors;
};

type MeetingTableProps = {
  days: MeetingDayType[];
  hash: string;
  resolution: number;
  onNewAnswer: (name: string, responses: Responses) => void;
};

export const MeetingTable = ({ days, hash, resolution, onNewAnswer }: MeetingTableProps) => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(true);
  const participants = useMemo(() => getParticipants(days), [days]);

  const [name, setName] = useState('');
  const [responses, setResponses] = useState<Responses>(buildEmptyResponse(days));
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const updateResponse = useCallback((day: string, hour: string, response: AttendanceResponse) => {
    setResponses(set(lensPath([day, hour]), response));
    setErrors(set(lensPath(['responses', day, hour]), ''));
  }, []);

  const saveResponses = async () => {
    const errors = buildErrors(name, responses);

    if (errors.name || errors.responses) {
      setErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${window.ENV.API_URL}/v1/meetings/${hash}`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          response: omit(['full'], responses)
        }),
        retries: 4,
        retryDelay: 3000,
      });

      if (response.status === 500) {
        toast.error(t('errors.common.connection'));
        return;
      }
      if (response.status !== 201) {
        const error = await response.json();

        if (error.name) {
          toast.error(error.name.join(', '));
        }
        if (error.response) {
          toast.error(t('errors.view-meeting.server.response-missing'));
        }

        return;
      }

      toast.success(t('view-meeting.save-success'));
      onNewAnswer(name, responses);

      setResponses(buildEmptyResponse(days));
      setName('');
      setShowForm(false);
      setErrors({});
    } catch (e: unknown) {
      toast.error(t('errors.common.connection'));
    } finally {
      setLoading(false);
    }
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
          {days.map((day) => (
            <MeetingDay
              key={day.day}
              errors={pathOr({}, ['responses', day.day], errors)}
              day={day}
              onResponseChange={updateResponse}
              participantCount={participants.length}
              resolution={resolution}
              responses={responses[day.day]}
              showForm={showForm}
            />
          ))}
          </tbody>
        </table>
      </div>
      <SaveButton onClick={showForm ? saveResponses : () => setShowForm(true)} disabled={loading}>
        {loading
          ? <Spinner/>
          : t(showForm ? 'viewMeeting.saveAnswers' : 'viewMeeting.newAnswer')}
      </SaveButton>
    </>
  );
};
