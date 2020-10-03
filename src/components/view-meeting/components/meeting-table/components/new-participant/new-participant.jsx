import React from 'react';
import cx from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';

import './new-participant.scss';

export const NewParticipant = ({ name, error, onNameChange }) => {
  const intl = useIntl();

  return (
    <div className={cx({ 'was-validated': error })}>
      <input
        type="text"
        className="form-control new-participant"
        placeholder={intl.formatMessage({ id: 'participants.new-placeholder' })}
        value={name}
        autoFocus
        required
        onChange={(event) => onNameChange(event.target.value)}
      />
      {error && (
        <div className="invalid-feedback">
          <FormattedMessage id={error} />
        </div>
      )}
    </div>
  );
};
