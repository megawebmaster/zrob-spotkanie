import React from 'react';
import { FormattedMessage } from 'react-intl';

export const CopyRowButton = ({ disabled, onClick }) => (
  <button
    className="btn btn-secondary"
    type="button"
    tabIndex="-1"
    disabled={disabled}
    onClick={onClick}
  >
    <span className="d-lg-none">
      <FormattedMessage id="createMeeting.scheduleDaysAllSmall" />
    </span>
    <span className="d-none d-lg-block">
      <FormattedMessage id="createMeeting.scheduleDaysAll" />
    </span>
  </button>
);
