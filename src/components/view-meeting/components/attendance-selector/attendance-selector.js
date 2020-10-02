import React from 'react';
import cx from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';

import './attendance-selector.scss';

export const RESPONSE_NONE = 'none';
export const RESPONSE_YES = 'yes';
export const RESPONSE_MAYBE = 'maybe';
export const RESPONSE_NO = 'no';

const AttendanceButton = ({ answer, color, icon, onChange, value }) => (
  <button
    className={cx('btn', color, { inactive: value !== answer })}
    type="button"
    onClick={() => onChange(answer)}
  >
    <i className={cx('fa fa-fw', icon)} />
    <span className="sr-only">
      <FormattedMessage id={`viewMeeting.attendance.${answer}`} />
    </span>
  </button>
);

export const AttendanceSelector = ({ onChange, value }) => {
  const intl = useIntl();

  return (
    <div className={cx('attendance-selector', { 'not-selected': value === '' })}>
      <div
        className="btn-group"
        role="group"
        aria-label={intl.formatMessage({ id: 'viewMeeting.attendance' })}
      >
        <AttendanceButton answer={RESPONSE_YES} color="btn-success" icon="fa-check" onChange={onChange} value={value} />
        <AttendanceButton answer={RESPONSE_MAYBE} color="btn-warning" icon="fa-question" onChange={onChange} value={value} />
        <AttendanceButton answer={RESPONSE_NO} color="btn-danger" icon="fa-times" onChange={onChange} value={value} />
      </div>
    </div>
  );
};
