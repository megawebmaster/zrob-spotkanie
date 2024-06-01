import { Dispatch, SetStateAction, useCallback } from 'react';
import { always, map, propOr } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Entry, ScheduleEntry } from './entry';
import { CopyRowButton } from './copy-row-button';

import './schedule.scss';

const EMPTY_EVENT: ScheduleEntry = { from: '', to: '' };

const isRowFilled = ({ from, to }: Partial<ScheduleEntry>) =>
  (from || '').length > 0 &&
  (to || '').length > 0 &&
  parseInt(from || '0', 10) < parseInt(to || '0', 10)
;

export type Schedule = Record<string, ScheduleEntry | undefined>;

type ScheduleTableProps = {
  days: Date[];
  schedule: Schedule;
  errors: Schedule;
  onChange: Dispatch<SetStateAction<Schedule>>;
  onRemoveDay: (day: Date) => void;
};

export const ScheduleTable = ({ days, schedule, errors, onChange, onRemoveDay }: ScheduleTableProps) => {
  const { t } = useTranslation();

  const copyDay = useCallback((day: Date) => {
    onChange((items: Schedule) => map(
      always(items[day.valueOf()]),
      items
    ));
  }, [onChange]);

  const updateDay = useCallback((day: Date, { from, to }: Partial<ScheduleEntry>) => {
    onChange(items => {
      const item = items[day.valueOf()];
      return {
        ...items,
        [day.valueOf()]: {
          from: from === undefined ? item?.from : from,
          to: to === undefined ? item?.to : to,
        }
      };
    });
  }, [onChange]);

  return (
    <div className="meeting-schedule form-group form-row">
      <label className="col-form-label col-sm-3 legend">
        {t('createMeeting.schedule')}
      </label>
      <div className="col-sm-9 pt-1">
        {days.length === 0 ? (
          <p className="px-2 m-0">
            {t('createMeeting.scheduleDays')}
          </p>
        ) : (
          <div className="meeting-entry form-group form-row text-center">
            <div className="day">
              {t('createMeeting.schedule.day')}
            </div>
            <div className="time-from">
              {t('createMeeting.schedule.from')}
            </div>
            <div className="time-to">
              {t('createMeeting.schedule.to')}
            </div>
            <div className="actions"/>
          </div>
        )}
        {days.map((day, idx) => {
          const entry = propOr<ScheduleEntry, Schedule, ScheduleEntry>(
            EMPTY_EVENT,
            day.valueOf().toString(),
            schedule
          );

          return (
            <Entry
              key={day.valueOf()}
              day={day}
              entry={entry}
              onChange={updateDay}
              onDelete={onRemoveDay}
              errors={propOr({}, day.valueOf().toString(), errors)}
            >
              {idx === 0 && days.length > 1 && (
                <CopyRowButton disabled={!isRowFilled(entry)} onClick={() => copyDay(day)}/>
              )}
            </Entry>
          );
        })}
      </div>
    </div>
  );
};
