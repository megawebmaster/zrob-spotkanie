import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type NewMeetingMessageProps = {
  hash?: string;
};

export const NewMeetingMessage = ({ hash }: NewMeetingMessageProps) => {
  const { t } = useTranslation();
  const [isNewMeeting, setIsNewMeeting] = useState(() => hash === window.localStorage?.getItem('newly_created_event'));

  const closeNewMeeting = () => {
    setIsNewMeeting(false);
    window.localStorage.removeItem('newly_created_event');
  };

  if (!isNewMeeting) {
    return null;
  }

  return (
    <p className="alert alert-dismissible alert-success">
      {t('viewMeeting.meetingCreated')}
      <button
        type="button"
        className="close"
        aria-label={t('viewMeeting.close')}
        onClick={closeNewMeeting}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </p>
  );
};
