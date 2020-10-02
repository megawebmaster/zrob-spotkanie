import React from 'react';
import { useIntl } from 'react-intl';

import './new-participant.scss';

export const NewParticipant = ({ name, onNameChange }) => {
  const intl = useIntl();

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control new-participant"
        placeholder={intl.formatMessage({ id: 'participants.new-placeholder' })}
        value={name}
        autoFocus
        required
        onChange={(event) => onNameChange(event.target.value)}
      />
    </div>
  );
};
