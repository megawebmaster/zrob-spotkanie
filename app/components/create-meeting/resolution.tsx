import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'clsx';

import { WHOLE_DAY } from '~/helpers';

type ResolutionProps = {
  value: string;
  error: string;
  onChange: (value: string) => void;
};

export const Resolution = ({ value, error, onChange }: ResolutionProps) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(value);
  const [customValue, setCustomValue] = useState('');

  const updateSelectedValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };
  const updateCustomValue = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="form-group form-row">
      <label htmlFor="meeting-resolution" className="col-form-label col-sm-3">
        {t("createMeeting.resolution")}
      </label>
      <div className="col-sm-4">
        <select value={selectedValue} onChange={updateSelectedValue} id="meeting-resolution" className="form-control">
          <option value={WHOLE_DAY}>
            {t('createMeeting.resolutionOption1440')}
          </option>
          <option value="60">
            {t('createMeeting.resolutionOption60')}
          </option>
          <option value="30">
            {t('createMeeting.resolutionOption30')}
          </option>
          <option value="15">
            {t('createMeeting.resolutionOption15')}
          </option>
          <option value="">
            {t('createMeeting.resolutionOptionOther')}
          </option>
        </select>
      </div>
      {selectedValue === '' && (
        <div className={cx('col-sm-3', { 'was-validated': error })}>
          <input
            type="text"
            className="form-control"
            value={customValue}
            onChange={updateCustomValue}
            placeholder={t('createMeeting.resolutionOtherPlaceholder')}
            required
          />
          {error && (
            <div className="invalid-feedback">
              {t(error)}
            </div>
          )}
        </div>
      )}
      {selectedValue !== WHOLE_DAY && (
        <div className={cx({ 'col-sm-2': selectedValue === '', 'col-sm-5': selectedValue !== '' })}>
          <p className="col-form-label">
            {t(selectedValue === '' ? 'createMeeting.resolutionOtherSuffix' : 'createMeeting.resolutionSuffix')}
          </p>
        </div>
      )}
    </div>
  );
};
