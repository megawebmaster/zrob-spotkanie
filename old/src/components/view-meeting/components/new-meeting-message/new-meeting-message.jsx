import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

export const NewMeetingMessage = ({ hash }) => {
  const intl = useIntl();
  const [isNewMeeting, setIsNewMeeting] = useState(hash === localStorage.getItem('newly_created_event'));

  const closeNewMeeting = () => {
    setIsNewMeeting(false);
    localStorage.removeItem('newly_created_event');
  };

  if (!isNewMeeting) {
    return null;
  }

  return (
    <p className="alert alert-dismissible alert-success">
      <FormattedMessage id="viewMeeting.meetingCreated" />
      <button
        type="button"
        className="close"
        aria-label={intl.formatMessage({ id: 'viewMeeting.close' })}
        onClick={closeNewMeeting}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </p>
  );
};
