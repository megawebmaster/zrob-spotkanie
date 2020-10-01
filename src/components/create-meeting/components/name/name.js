import React from 'react';
import cx from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';

export const Name = ({ value, errors, onChange }) => {
  const intl = useIntl();
  const handleChange = (event) => onChange(event.target.value);

  return (
    <div className={cx('name form-group form-row', { 'has-danger': errors.length > 0 })}>
      <label htmlFor="meeting-name" className="col-form-label col-sm-3">
        <FormattedMessage id="createMeeting.name" />
      </label>
      <div className="col-sm-9">
        <input
          type="text"
          id="meeting-name"
          className="form-control"
          value={value}
          onChange={handleChange}
          placeholder={intl.formatMessage({ id: 'createMeeting.namePlaceholder' })}
        />
        {errors.length > 0 && (
          <div className="form-control-feedback">{errors.join(', ')}</div>
        )}
      </div>
    </div>
  );
};
