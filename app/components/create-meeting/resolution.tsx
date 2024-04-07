import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'clsx';

import { WHOLE_DAY } from '~/helpers';

type ResolutionProps = {
  value?: number;
  error: string;
  onChange: (value: number | undefined) => void;
};

export const Resolution = ({ value, error, onChange }: ResolutionProps) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(value);
  const [customValue, setCustomValue] = useState('');

  const updateSelectedValue = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === '') {
      setSelectedValue(undefined);
      onChange(undefined);
      return;
    }

    const value = parseInt(event.target.value, 10);
    setSelectedValue(value);
    onChange(value);
  };
  const updateCustomValue = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomValue(event.target.value);
    onChange(parseInt(event.target.value, 10));
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
      {selectedValue === undefined && (
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
        <div className={cx({ 'col-sm-2': selectedValue === undefined, 'col-sm-5': selectedValue !== undefined })}>
          <p className="col-form-label">
            {t(selectedValue === undefined ? 'createMeeting.resolutionOtherSuffix' : 'createMeeting.resolutionSuffix')}
          </p>
        </div>
      )}
    </div>
  );
};
