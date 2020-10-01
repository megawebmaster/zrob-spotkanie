import React from 'react';
import cx from 'classnames';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { propOr } from 'ramda';

export const ScheduleEntry = ({ children, day, errors, event, onChange, onDelete }) => {
  const intl = useIntl();
  const fromErrors = propOr([], 'from', errors);
  const toErrors = propOr([], 'to', errors);

  const updateFrom = (event) => onChange(day, { from: event.target.value });
  const updateTo = (event) => onChange(day, { to: event.target.value });

  return (
    <div className="form-group form-row">
      <label htmlFor="meeting-schedule-entry-from" className="col-form-label col-sm-2">
        <FormattedDate value={day} year="numeric" month="numeric" day="numeric" />
      </label>
      <div className={cx('col-sm-2', { 'has-danger': fromErrors.length > 0 })}>
        <input
          type="text"
          id="meeting-schedule-entry-from"
          className="form-control"
          value={event.from}
          placeholder={intl.formatMessage({ id: 'createMeeting.scheduleEntryStart' })}
          onChange={updateFrom}
        />
        {fromErrors.length > 0 && (
          <div className="form-control-feedback">{fromErrors.join(', ')}</div>
        )}
      </div>
      <div className={cx('col-sm-2', { 'has-danger': toErrors.length > 0 })}>
        <input
          type="text"
          id="meeting-schedule-entry-to"
          className="form-control"
          value={event.to}
          placeholder={intl.formatMessage({ id: 'createMeeting.scheduleEntryEnd' })}
          onChange={updateTo}
        />
        {toErrors.length > 0 && (
          <div className="form-control-feedback">{toErrors.join(', ')}</div>
        )}
      </div>
      <div className="col-sm-6">
        <button className="btn btn-secondary mr-1" tabIndex="-1" onClick={() => onDelete(day)}>
            <span className="d-lg-none">
              <FormattedMessage id="createMeeting.scheduleEntryRemoveSmall" />
            </span>
          <span className="d-none d-lg-block">
              <FormattedMessage id="createMeeting.scheduleEntryRemove" />
            </span>
        </button>
        {children}
      </div>
    </div>
  );
};
