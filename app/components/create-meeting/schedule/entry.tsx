import type { ChangeEvent, ReactNode } from 'react';
import { propOr } from 'ramda';
import cx from 'clsx';
import { useTranslation } from 'react-i18next';
import { DATE_FORMAT, DATE_FORMAT_SHORT } from '~/helpers';

export type ScheduleEntry = {
  from: string;
  to: string;
};

type ScheduleEntryProps = {
  children: ReactNode;
  day: Date;
  errors: Partial<ScheduleEntry>;
  entry: Partial<ScheduleEntry>;
  onChange: (day: Date, updates: Partial<ScheduleEntry>) => void;
  onDelete: (day: Date) => void;
};

export const Entry = ({ children, day, errors, entry, onChange, onDelete }: ScheduleEntryProps) => {
  const { t, i18n } = useTranslation();
  const fromError = propOr<string, ScheduleEntry, string>('', 'from', (errors || {}) as ScheduleEntry);
  const toError = propOr<string, ScheduleEntry, string>('', 'to', (errors || {}) as ScheduleEntry);

  const updateFrom = (event: ChangeEvent<HTMLInputElement>) => onChange(day, { from: event.target.value });
  const updateTo = (event: ChangeEvent<HTMLInputElement>) => onChange(day, { to: event.target.value });

  return (
    <div className="meeting-entry form-group form-row">
      <label htmlFor={`schedule-entry-${day.toISOString()}-from`} className="col-form-label day">
        <span className="d-sm-none">
          {i18n.t('createMeeting.scheduleEntryDate', { val: day, formatParams: { val: DATE_FORMAT_SHORT } })}
        </span>
        <span className="d-none d-md-block">
          {i18n.t('createMeeting.scheduleEntryDate', { val: day, formatParams: { val: DATE_FORMAT } })}
        </span>
      </label>
      <div className={cx('time-from', { 'was-validated': fromError })}>
        <input
          type="text"
          id={`schedule-entry-${day.toISOString()}-from`}
          className={cx('form-control', { 'is-invalid': fromError && entry.from })}
          value={entry.from || ''}
          placeholder={t('createMeeting.scheduleEntryStart')}
          onChange={updateFrom}
          required
        />
        {fromError && (
          <div className="invalid-feedback">
            {t(fromError)}
          </div>
        )}
      </div>
      <div className={cx('time-to', { 'was-validated': toError })}>
        <input
          type="text"
          id="meeting-schedule-entry-to"
          className={cx('form-control', { 'is-invalid': toError && entry.to })}
          value={entry.to || ''}
          placeholder={t('createMeeting.scheduleEntryEnd')}
          onChange={updateTo}
          required
        />
        {toError && (
          <div className="invalid-feedback">
            {t(toError)}
          </div>
        )}
      </div>
      <div className="actions">
        <button className="btn btn-secondary btn-danger mr-1" tabIndex={-1} onClick={() => onDelete(day)}>
          <span className="fa fa-times"/>
          <span className="d-none d-md-inline d-lg-none ml-1">
            {t('createMeeting.scheduleEntryRemoveSmall')}
          </span>
          <span className="d-none d-lg-inline ml-1">
            {t('createMeeting.scheduleEntryRemove')}
          </span>
        </button>
        {children}
      </div>
    </div>
  );
};
