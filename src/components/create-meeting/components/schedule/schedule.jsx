import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { always, fromPairs, map, pathOr, pipe, propOr } from 'ramda';

import { ScheduleEntry } from './schedule-entry';
import { CopyRowButton } from './copy-row-button';

import './schedule.scss';

const EMPTY_EVENT = { from: '', to: '' };

export const buildEvents = pipe(
  map(day => [day.valueOf(), EMPTY_EVENT]),
  fromPairs,
);

const isRowFilled = ({ from, to }) => from.length > 0 && to.length > 0 && parseInt(from, 10) < parseInt(to, 10);

export const Schedule = ({ days, schedule, errors, onChange, onRemoveDay }) => {
  const copyDay = useCallback((day) => {
    onChange(items => map(
      always(items[day.valueOf()]),
      items
    ));
  }, [onChange]);

  const updateDay = useCallback((day, { from, to }) => {
    onChange(items => {
      const item = items[day.valueOf()];
      return {
        ...items,
        [day.valueOf()]: {
          from: from === undefined ? item.from : from,
          to: to === undefined ? item.to : to,
        }
      };
    });
  }, [onChange]);

  return (
    <div className="meeting-schedule form-group form-row">
      <label className="col-form-label col-sm-3 legend">
        <FormattedMessage id="createMeeting.schedule" />
      </label>
      <div className="col-sm-9">
        {days.length === 0 && (
          <p className="px-2 m-0">
            <FormattedMessage id="createMeeting.scheduleDays" />
          </p>
        )}
        {days.map((day, idx) => {
          const event = propOr(EMPTY_EVENT, day.valueOf(), schedule);
          return (
            <ScheduleEntry
              key={day.valueOf()}
              day={day}
              event={event}
              onChange={updateDay}
              onDelete={onRemoveDay}
              errors={pathOr({}, ['schedule', day.valueOf()], errors)}
            >
              {idx === 0 && days.length > 1 && (
                <CopyRowButton disabled={!isRowFilled(event)} onClick={() => copyDay(day)} />
              )}
            </ScheduleEntry>
          );
        })}
      </div>
    </div>
  );
};
