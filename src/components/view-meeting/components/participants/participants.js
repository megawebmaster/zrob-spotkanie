import React from 'react';
import { FormattedMessage } from 'react-intl';

import { NewParticipant } from './new-participant/new-participant';

import './participants.scss';

export const Participants = ({ name, onNameChange, participants, showForm }) => (
  <tr className="participants">
    <th scope="col" className="title">
      {showForm && <FormattedMessage id="participants.participants" />}
    </th>
    {showForm && (
      <th scope="col" className="attendance">
        <NewParticipant name={name} onNameChange={onNameChange} />
      </th>
    )}
    {participants.map((participant) =>
      <th key={participant} scope="col">
        <span className="participant">{participant}</span>
      </th>
    )}
    {participants.length === 0 && <th className="empty" />}
  </tr>
);
