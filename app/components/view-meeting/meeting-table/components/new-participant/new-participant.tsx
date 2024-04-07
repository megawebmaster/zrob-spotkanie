import { useTranslation } from 'react-i18next';
import cx from 'clsx';

import './new-participant.scss';

type NewParticipantProps = {
  name: string;
  error: string;
  onNameChange: (value: string) => void;
};

export const NewParticipant = ({ name, error, onNameChange }: NewParticipantProps) => {
  const { t } = useTranslation();

  return (
    <div className={cx({ 'was-validated': error })}>
      <input
        type="text"
        className="form-control new-participant"
        placeholder={t('participants.new-placeholder')}
        value={name}
        required
        onChange={(event) => onNameChange(event.target.value)}
      />
      {error && (
        <div className="invalid-feedback">
          {t(error)}
        </div>
      )}
    </div>
  );
};
