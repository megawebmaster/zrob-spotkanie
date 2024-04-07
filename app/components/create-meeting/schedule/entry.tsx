import type { ChangeEvent, ReactNode } from 'react';
import { propOr } from 'ramda';
import cx from 'clsx';
import { useTranslation } from 'react-i18next';
import { DATE_FORMAT } from '~/helpers';

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
      <label htmlFor={`schedule-entry-${day.toISOString()}-from`} className="col-form-label col-sm-2">
        {i18n.t('createMeeting.scheduleEntryDate', { val: day, formatParams: { val: DATE_FORMAT } })}
      </label>
      <div className={cx('col-sm-2', { 'was-validated': fromError })}>
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
      <div className={cx('col-sm-2', { 'was-validated': toError })}>
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
      <div className="col-sm-6">
        <button className="btn btn-secondary mr-1" tabIndex={-1} onClick={() => onDelete(day)}>
          <span className="d-lg-none">
            {t('createMeeting.scheduleEntryRemoveSmall')}
          </span>
          <span className="d-none d-lg-block">
            {t('createMeeting.scheduleEntryRemove')}
          </span>
        </button>
        {children}
      </div>
    </div>
  );
};
