import { useTranslation } from 'react-i18next';

import { NewParticipant } from '../new-participant/new-participant';

import './participants.scss';

type ParticipantsProps = {
  error: string;
  name: string;
  onNameChange: (value: string) => void;
  participants: string[];
  showForm: boolean;
};

export const Participants = ({ error, name, onNameChange, participants, showForm }: ParticipantsProps) => {
  const { t } = useTranslation();

  return (
    <tr className="participants">
      <th scope="col" className="title">
        {showForm && t('participants.participants')}
      </th>
      {showForm && (
        <th scope="col" className="attendance">
          <NewParticipant name={name} error={error} onNameChange={onNameChange}/>
        </th>
      )}
      {participants.map((participant) =>
        <th key={participant} scope="col">
          <span className="participant">{participant}</span>
        </th>
      )}
      {participants.length === 0 && <th className="empty"/>}
    </tr>
  );
};
