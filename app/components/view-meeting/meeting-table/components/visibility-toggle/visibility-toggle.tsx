import { useTranslation } from 'react-i18next';
import cx from 'clsx';

import './visibility-toggle.scss';

type VisibilityToggleProps = {
  visible: boolean;
  onChange: (status: boolean) => void;
}

export const VisibilityToggle = ({ visible, onChange }: VisibilityToggleProps) => {
  const { t } = useTranslation();

  return (
    <div className="visibility-toggle">
      <button
        className="btn btn-secondary"
        type="button"
        onClick={() => onChange(visible)}
        title={t(visible ? 'visibility-toggle.hide' : 'visibility-toggle.show')}
      >
        <i className={cx('fa', { 'fa-chevron-up': visible, 'fa-chevron-down': !visible })} />
      </button>
    </div>
  )
}
