import React from 'react';
import cx from 'classnames';
import DayPicker from 'react-day-picker';
import { endOfDay, isAfter } from 'date-fns';
import { FormattedMessage, useIntl } from 'react-intl';
import { complement, equals, includes } from 'ramda';

import './days.scss';

const isDayBeforeToday = (day) => isAfter(new Date(), endOfDay(day));

export const Days = ({ days, error, onChange }) => {
  const intl = useIntl();
  const isDaySelected = (day) => includes(day, days);
  const toggleDay = (day, { selected, disabled }) => {
    if (!disabled) {
      if (selected) {
        onChange(days.filter(complement(equals(day))));
      } else {
        onChange([...days, day].sort(isAfter));
      }
    }
  };

  return (
    <div className={cx('form-group form-row', { 'is-invalid': error })}>
      <label htmlFor="meeting-days" className="col-form-label col-sm-3">
        <FormattedMessage id="createMeeting.days" defaultMessage="Wybierz dni" />
      </label>
      <div className="col-sm-6 col-md-5 col-lg-4">
        <DayPicker
          firstDayOfWeek={1}
          selectedDays={isDaySelected}
          disabledDays={isDayBeforeToday}
          fromMonth={new Date()}
          onDayClick={toggleDay}
          locale="pl"
          months={[
            intl.formatMessage({ id: 'dayPicker.months.january' }),
            intl.formatMessage({ id: 'dayPicker.months.february' }),
            intl.formatMessage({ id: 'dayPicker.months.march' }),
            intl.formatMessage({ id: 'dayPicker.months.april' }),
            intl.formatMessage({ id: 'dayPicker.months.may' }),
            intl.formatMessage({ id: 'dayPicker.months.june' }),
            intl.formatMessage({ id: 'dayPicker.months.july' }),
            intl.formatMessage({ id: 'dayPicker.months.august' }),
            intl.formatMessage({ id: 'dayPicker.months.september' }),
            intl.formatMessage({ id: 'dayPicker.months.october' }),
            intl.formatMessage({ id: 'dayPicker.months.november' }),
            intl.formatMessage({ id: 'dayPicker.months.december' }),
          ]}
          weekdaysShort={[
            intl.formatMessage({ id: 'dayPicker.weekdays.short.sunday' }),
            intl.formatMessage({ id: 'dayPicker.weekdays.short.monday' }),
            intl.formatMessage({ id: 'dayPicker.weekdays.short.tuesday' }),
            intl.formatMessage({ id: 'dayPicker.weekdays.short.wednesday' }),
            intl.formatMessage({ id: 'dayPicker.weekdays.short.thursday' }),
            intl.formatMessage({ id: 'dayPicker.weekdays.short.friday' }),
            intl.formatMessage({ id: 'dayPicker.weekdays.short.saturday' }),
          ]}
          weekdaysLong={[
            intl.formatMessage({ id: 'dayPicker.weekdays.long.sunday' }),
            intl.formatMessage({ id: 'dayPicker.weekdays.long.monday' }),
            intl.formatMessage({ id: 'dayPicker.weekdays.long.tuesday' }),
            intl.formatMessage({ id: 'dayPicker.weekdays.long.wednesday' }),
            intl.formatMessage({ id: 'dayPicker.weekdays.long.thursday' }),
            intl.formatMessage({ id: 'dayPicker.weekdays.long.friday' }),
            intl.formatMessage({ id: 'dayPicker.weekdays.long.saturday' }),
          ]}
        />
      </div>
      <div className="col-sm-3 col-md-4 col-lg-5">
        {error && (
          <div className="invalid-feedback">
            <FormattedMessage id={error} />
          </div>
        )}
      </div>
    </div>
  );
};
