import { useCallback, useState } from 'react';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useNavigate } from 'react-router';
import { complement, equals, fromPairs, map, mapObjIndexed, omit, pipe, propOr, reduce, values } from 'ramda';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import i18next from '~/i18next.server';
import { fetch, WHOLE_DAY } from '~/helpers';

import { Name } from '~/components/create-meeting/name';
import { Days } from '~/components/create-meeting/days';
import { Resolution } from '~/components/create-meeting/resolution';
import { Schedule, ScheduleTable } from '~/components/create-meeting/schedule/schedule-table';
import { ScheduleEntry } from '~/components/create-meeting/schedule/entry';
import { SaveButton } from '~/components/save-button/save-button';
import { Spinner } from '~/components/spinner/spinner';

import '~/components/create-meeting/index.scss';

export async function loader({ request }: LoaderFunctionArgs) {
  const t = await i18next.getFixedT(request);

  return {
    title: `${t('createMeeting.title')} - ${t('app.name')}`,
    description: t('app.description'),
  };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title || '' },
    { name: 'description', content: data?.description || '' },
  ];
};

const buildSchedule = pipe(
  mapObjIndexed((item: ScheduleEntry | undefined, day: string) => ({ ...item, day: new Date(parseInt(day, 10)) })),
  values,
);

const buildDailySchedule = pipe(
  mapObjIndexed((item: unknown, day: string) => ({ day: new Date(parseInt(day, 10)) })),
  values,
);

const buildScheduleEntryFromError = (from: string, to: string) => {
  if (from.length === 0) {
    return 'errors.create-meeting.from.missing';
  }
  if (parseInt(from, 10) >= parseInt(to, 10)) {
    return 'errors.create-meeting.from.after-to';
  }

  return '';
};

const buildScheduleEntryToError = (to: string) => {
  if (to.length === 0) {
    return 'errors.create-meeting.to.missing';
  }

  return '';
};

const buildScheduleErrors = mapObjIndexed((entry: ScheduleEntry | undefined) => ({
  from: buildScheduleEntryFromError(entry?.from || '', entry?.to || ''),
  to: buildScheduleEntryToError(entry?.to || ''),
} as ScheduleEntry));

const hasScheduleErrors = pipe(
  values<Record<string, ScheduleEntry>>,
  reduce(
    (result, entry) => result || entry.from !== '' || entry.to !== '',
    false,
  ),
);

type Errors = Record<string, string | Record<string, Record<string, string>>>;

const buildErrors = (name: string, days: Date[], schedule: Schedule, resolution?: number) => {
  const errors: Errors = {};

  if (name === '') {
    errors.name = 'errors.create-meeting.name.missing';
  }
  if (days.length === 0) {
    errors.days = 'errors.create-meeting.days.missing';
  }
  if (resolution === undefined) {
    errors.resolution = 'errors.create-meeting.resolution.missing';
  }
  if (resolution !== WHOLE_DAY) {
    const scheduleErrors = buildScheduleErrors(schedule);

    if (hasScheduleErrors(scheduleErrors)) {
      errors.schedule = scheduleErrors;
    }
  }

  return errors;
};

export default function Index() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [days, setDays] = useState<Date[]>([]);
  const [schedule, setSchedule] = useState<Schedule>({});
  const [resolution, setResolution] = useState<number | undefined>(60);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const updateDays = useCallback((days: Date[]) => {
    setDays(days);
    setErrors(errors => omit(['days'], errors));
    setSchedule((schedule) =>
      pipe(
        map((day: Date) => day.valueOf().toString()),
        map<string, [string, ScheduleEntry]>((day) => [day, (schedule[day] || {}) as ScheduleEntry]),
        fromPairs,
      )(days)
    );
  }, []);

  const removeDay = useCallback((day: Date) => {
    setDays(days => days.filter(complement(equals(day))));
    setSchedule(schedule => omit([day.valueOf().toString()], schedule));
  }, []);

  const createMeeting = async () => {
    // TODO: Rewrite as a form with Remix action
    const errors = buildErrors(name, days, schedule, resolution);

    if (
      errors.name ||
      errors.days ||
      errors.resolution ||
      (resolution !== WHOLE_DAY && errors.schedule)
    ) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${window.ENV.API_URL}/v1/meetings`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          resolution,
          schedule: resolution === WHOLE_DAY ? buildDailySchedule(schedule) : buildSchedule(schedule),
        }),
        retries: 4,
        retryDelay: 3000,
      });

      const result = await response.json();

      if (response.status === 201) {
        localStorage.setItem('newly_created_event', result.hash);
        navigate(`/view/${result.hash}`);
      } else {
        toast.error(t('errors.create-meeting.general'));
      }
    } catch (e) {
      toast.error(t('errors.common.connection'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-meeting">
      <Name value={name} onChange={setName} error={propOr('', 'name', errors)}/>
      <Days days={days} onChange={updateDays} error={propOr('', 'days', errors)}/>
      <Resolution value={resolution} onChange={setResolution} error={propOr('', 'resolution', errors)}/>
      {resolution !== WHOLE_DAY && (
        <ScheduleTable
          days={days}
          schedule={schedule}
          errors={propOr({}, 'schedule', errors)}
          onChange={setSchedule}
          onRemoveDay={removeDay}
        />
      )}
      <SaveButton onClick={createMeeting} disabled={loading}>
        {loading ? <Spinner/> : t('createMeeting.button')}
      </SaveButton>
    </div>
  );
}
