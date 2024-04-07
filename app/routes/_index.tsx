import { useCallback, useState } from 'react';
import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import {
  any,
  complement,
  either,
  equals,
  map,
  mapObjIndexed,
  mergeDeepRight,
  omit,
  pipe,
  propEq,
  propOr,
  values
} from 'ramda';
import { useTranslation } from 'react-i18next';

import i18next from '~/i18next.server';
import { WHOLE_DAY } from '~/helpers';
import { Name } from '~/components/create-meeting/name';

import '~/components/create-meeting/index.scss';

export async function loader({ request }: LoaderFunctionArgs) {
  const t = await i18next.getFixedT(request);

  return json({
    title: `${t('createMeeting.title')} - ${t('app.name')}`,
    description: t('app.description'),
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title || '' },
    { name: 'description', content: data?.description || '' },
  ];
};

type ScheduleEntry = {
  from: string;
  to: string;
};
type ScheduleType = Record<string, ScheduleEntry>;

const scheduleMissingValues = (schedule: ScheduleType) =>
  any<ScheduleEntry>(
    either(
      propEq<string, keyof ScheduleEntry>('', 'from'),
      propEq<string, keyof ScheduleEntry>('', 'to'),
    ),
    values<ScheduleType>(schedule)
  );

const buildSchedule = pipe(
  mapObjIndexed((item: ScheduleEntry, day: string) => ({ ...item, day: new Date(parseInt(day, 10)) })),
  values,
);

const buildDailySchedule = pipe(
  mapObjIndexed((item: any, day: string) => ({ day: new Date(parseInt(day, 10)) })),
  values,
);

const buildScheduleErrors = pipe(
  values,
  map((entry: ScheduleEntry) =>
    entry.from.length > 0 && entry.to.length > 0 && parseInt(entry.from, 10) >= parseInt(entry.to, 10)
      ? { from: 'errors.create-meeting.from.after-to', to: entry.to }
      : entry
  ),
  map(mapObjIndexed((value, key) => value === '' ? `errors.create-meeting.${key}.missing` : (value.startsWith('errors') ? value : ''))),
);

type Errors = Record<string, string | Record<string, string>[]>;

const buildErrors = (name: string, days: string[], schedule: ScheduleType, resolution: string) => {
  const errors: Errors = {};

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

export default function Index() {
  const [name, setName] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<ScheduleType>({});
  const [resolution, setResolution] = useState('60');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const { t } = useTranslation();

  const updateDays = useCallback((days: string[]) => {
    setDays(days);
    setErrors(errors => omit(['days'], errors));
    // setSchedule((schedule) =>
    //   pipe(
    //     map((day: string) => day.valueOf()),
    //     map((day) => schedule[day]),
    //     mergeDeepRight(buildEvents(days)),
    //   )(days)
    // );
  }, []);

  const removeDay = useCallback((day: string) => {
    setDays(days => days.filter(complement(equals(day))));
    setSchedule(schedule => omit([day.valueOf()])(schedule));
  }, []);

  const createMeeting = async () => {
    const errors = buildErrors(name, days, schedule, resolution);

    if (
      errors.name ||
      errors.days ||
      errors.resolution ||
      (resolution !== WHOLE_DAY && scheduleMissingValues(schedule))
    ) {
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
        // TODO: Fix navigation
        // history.push(`/view/${result.hash}`);
      } else {
        // TODO: Replace react-s-alert with something more modern
        // Alert.error(t('errors.create-meeting.general'));
        setLoading(false);
      }
    } catch (e) {
      // TODO: Replace react-s-alert with something more modern
      // Alert.error(t('errors.common.connection'));
      setLoading(false);
    }
  };

  return (
    <div className="create-meeting">
      <Name value={name} onChange={setName} error={propOr('', 'name', errors)}/>
      {/*<Days days={days} onChange={updateDays} error={propOr('', 'days', errors)}/>*/}
      {/*<Resolution value={resolution} onChange={setResolution} error={propOr('', 'resolution', errors)}/>*/}
      {/*{resolution !== WHOLE_DAY && (*/}
      {/*  <Schedule*/}
      {/*    days={days}*/}
      {/*    schedule={schedule}*/}
      {/*    errors={propOr({}, 'schedule', errors)}*/}
      {/*    onChange={setSchedule}*/}
      {/*    onRemoveDay={removeDay}*/}
      {/*  />*/}
      {/*)}*/}
      {/*<SaveButton onClick={createMeeting} disabled={loading}>*/}
      {/*  {loading ? <Spinner/> : t('createMeeting.button')}*/}
      {/*</SaveButton>*/}
    </div>
  );
}
