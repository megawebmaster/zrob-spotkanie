import { ActiveModifiers, DayPicker } from 'react-day-picker';
import { endOfDay, isAfter } from 'date-fns';
import { complement, equals, includes } from 'ramda';
import { useTranslation } from 'react-i18next';
import { pl } from 'date-fns/locale';
import cx from 'clsx';

import './days.scss';

const isDayBeforeToday = (day: Date) => isAfter(new Date(), endOfDay(day));

type DaysProps = {
  days: Date[];
  error: string;
  onChange: (days: Date[]) => void;
};

export const Days = ({ days, error, onChange }: DaysProps) => {
  const { t } = useTranslation();
  const isDaySelected = (day: Date) => includes(day, days);
  const toggleDay = (day: Date, { selected, disabled }: ActiveModifiers) => {
    if (!disabled) {
      if (selected) {
        onChange(days.filter(complement(equals(day))));
      } else {
        onChange([...days, day].sort((a, b) => isAfter(a, b) ? 1 : 0));
      }
    }
  };

  return (
    <div className={cx('form-group form-row', { 'is-invalid': error })}>
      <label htmlFor="meeting-days" className="col-form-label col-sm-3">
        {t("createMeeting.days")}
      </label>
      <div className="col-sm-6 col-md-5 col-lg-4">
        <DayPicker
          weekStartsOn={1}
          selected={isDaySelected}
          disabled={isDayBeforeToday}
          fromMonth={new Date()}
          onDayClick={toggleDay}
          locale={pl}
        />
      </div>
      <div className="col-sm-3 col-md-4 col-lg-5">
        {error && (
          <div className="invalid-feedback">
            {t(error)}
          </div>
        )}
      </div>
    </div>
  );
};
