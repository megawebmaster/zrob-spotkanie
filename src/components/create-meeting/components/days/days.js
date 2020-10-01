import React from 'react';
import DayPicker from 'react-day-picker';
import { endOfDay, isAfter } from 'date-fns';
import { FormattedMessage } from 'react-intl';
import { complement, equals, includes } from 'ramda';

import './days.scss';

const isDayBeforeToday = (day) => isAfter(new Date(), endOfDay(day));

export const Days = ({ children, days, onChange }) => {
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
    <div className="form-group form-row">
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
        />
      </div>
      <div className="col-sm-3 col-md-4 col-lg-5">
        {children}
      </div>
    </div>
  );
};
