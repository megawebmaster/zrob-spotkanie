import React, { useState } from 'react';
import cx from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';

export const WHOLE_DAY = '1440';

export const Resolution = ({ value, errors, onChange }) => {
  const intl = useIntl();
  const [selectedValue, setSelectedValue] = useState(value);
  const [customValue, setCustomValue] = useState('');

  const updateSelectedValue = (event) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };
  const updateCustomValue = (event) => {
    setCustomValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className={cx('form-group form-row', { 'has-danger': errors.length > 0 })}>
      <label htmlFor="meeting-resolution" className="col-form-label col-sm-3">
        <FormattedMessage id="createMeeting.resolution" defaultMessage="Czas" />
      </label>
      <div className="col-sm-4">
        <select value={selectedValue} onChange={updateSelectedValue} id="meeting-resolution" className="form-control">
          <option value={WHOLE_DAY}>
            {intl.formatMessage({ id: 'createMeeting.resolutionOption1440' })}
          </option>
          <option value="60">
            {intl.formatMessage({ id: 'createMeeting.resolutionOption60' })}
          </option>
          <option value="30">
            {intl.formatMessage({ id: 'createMeeting.resolutionOption30' })}
          </option>
          <option value="15">
            {intl.formatMessage({ id: 'createMeeting.resolutionOption15' })}
          </option>
          <option value="">
            {intl.formatMessage({ id: 'createMeeting.resolutionOptionOther' })}
          </option>
        </select>
        {errors.length > 0 && (
          <div className="form-control-feedback">{errors.join(', ')}</div>
        )}
      </div>
      {selectedValue === '' && (
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            value={customValue}
            onChange={updateCustomValue}
            placeholder={intl.formatMessage({ id: 'createMeeting.resolutionOtherPlaceholder' })}
          />
        </div>
      )}
      {selectedValue !== WHOLE_DAY && (
        <div className={cx({ 'col-sm-2': selectedValue === '', 'col-sm-5': selectedValue !== '' })}>
          <p className="col-form-label">
            <FormattedMessage id="createMeeting.resolutionSuffix" defaultMessage="do wyboru" />
          </p>
        </div>
      )}
    </div>
  );
};
