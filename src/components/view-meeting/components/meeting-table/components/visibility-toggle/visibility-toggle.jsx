import React from 'react';
import cx from 'classnames';
import { useIntl } from 'react-intl';

import './visibility-toggle.scss';

export const VisibilityToggle = ({ visible, onChange }) => {
  const intl = useIntl();

  return (
    <div className="visibility-toggle">
      <button
        className="btn btn-secondary"
        type="button"
        onClick={() => onChange(visible)}
        title={intl.formatMessage({ id: visible ? 'visibilityToggle.hide' : 'visibilityToggle.show' })}
      >
        <i className={cx('fa', { 'fa-chevron-up': visible, 'fa-chevron-down': !visible })} />
      </button>
    </div>
  )
}
