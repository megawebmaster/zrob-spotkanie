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
      <span className="fa-solid fa-copy" />
      <span className="d-none d-md-inline d-lg-none ml-1">
        {t('createMeeting.scheduleDaysAllSmall')}
      </span>
      <span className="d-none d-lg-inline ml-1">
        {t('createMeeting.scheduleDaysAll')}
      </span>
    </button>
  );
};
