import { useTranslation } from 'react-i18next';
import cx from 'clsx';

import type { AttendanceResponse } from '~/components/view-meeting/types';

import {
  RESPONSE_MAYBE,
  RESPONSE_NO,
  RESPONSE_NONE,
  RESPONSE_YES
} from '~/components/view-meeting/meeting-table/helpers';

import './attendance-selector.scss';

type AttendanceButtonProps = {
  answer: AttendanceResponse;
  color: string;
  icon: string;
  onChange: (answer: AttendanceResponse) => void;
  value: AttendanceResponse;
}

const AttendanceButton = ({ answer, color, icon, onChange, value }: AttendanceButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      className={cx('btn', color, { inactive: value !== answer })}
      type="button"
      onClick={() => onChange(answer)}
    >
      <i className={cx('fa fa-fw', icon)}/>
      <span className="sr-only">
        {t(`view-meeting.attendance.${answer}`)}
      </span>
    </button>
  );
};

type AttendanceSelectorProps = {
  error?: string;
  onChange: (answer: AttendanceResponse) => void;
  value: AttendanceResponse;
};

export const AttendanceSelector = ({ error, onChange, value }: AttendanceSelectorProps) => {
  const { t } = useTranslation();

  return (
    <div className={cx('attendance-selector', { 'not-selected': value === RESPONSE_NONE, 'was-validated': error })}>
      <div
        className={cx('btn-group', { 'is-invalid': error })}
        role="group"
        aria-label={t('view-meeting.attendance')}
      >
        <AttendanceButton
          answer={RESPONSE_YES}
          color="btn-success"
          icon="fa-check"
          onChange={onChange}
          value={value}
        />
        <AttendanceButton
          answer={RESPONSE_MAYBE}
          color="btn-warning"
          icon="fa-question"
          onChange={onChange}
          value={value}
        />
        <AttendanceButton
          answer={RESPONSE_NO}
          color="btn-danger"
          icon="fa-times"
          onChange={onChange}
          value={value}
        />
      </div>
      {error && (
        <div className="invalid-feedback">
          {t(error)}
        </div>
      )}
    </div>
  );
};
