import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'clsx';

type NameProps = {
  value: string;
  error: string;
  onChange: (value: string) => void;
};

export const Name = ({ value, error, onChange }: NameProps) => {
  const { t } = useTranslation();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

  return (
    <div className={cx('name form-group form-row', { 'was-validated': error })}>
      <label htmlFor="meeting-name" className="col-form-label col-sm-3">
        {t("createMeeting.name")}
      </label>
      <div className="col-sm-9">
        <input
          type="text"
          id="meeting-name"
          className="form-control"
          value={value}
          onChange={handleChange}
          placeholder={t('createMeeting.namePlaceholder')}
          required
        />
        {error && (
          <div className="invalid-feedback">
            {t(error)}
          </div>
        )}
      </div>
    </div>
  );
};
