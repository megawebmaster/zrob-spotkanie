import { useTranslation } from 'react-i18next';

type CopyRowButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export const CopyRowButton = ({ disabled, onClick }: CopyRowButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      className="btn btn-secondary"
      type="button"
      tabIndex={-1}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="d-lg-none">
        {t('createMeeting.scheduleDaysAllSmall')}
      </span>
      <span className="d-none d-lg-block">
        {t('createMeeting.scheduleDaysAll')}
      </span>
    </button>
  );
};
