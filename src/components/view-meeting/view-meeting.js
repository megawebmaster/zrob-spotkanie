import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import Alert from 'react-s-alert';
import { useHistory, useParams } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';

import { Spinner } from '../spinner/spinner';
import { MeetingTable } from './components/meeting-table/meeting-table';

import './view-meeting.scss';
import { omit } from 'ramda';

const ViewMeeting = () => {
  const intl = useIntl();
  const history = useHistory();
  const { hash } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [isNewMeeting, setIsNewMeeting] = useState(hash === localStorage.getItem('newly_created_event'));

  const saveResponse = async (name, responses) => {
    // ReactGA.event({
    //   category: 'RespondToEvent',
    //   action: state.response.name
    // });

    const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/meetings/${hash}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        response: omit(['full'], responses)
      })
    });

    if (response.status === 500) {
      Alert.error('Wystąpił błąd serwera. Prosimy spróbować później.');
      return;
    }
    if (response.status !== 201) {
      const error = await response.json();

      if (error.name) {
        Alert.error(error.name.join(', '));
      }
      if (error.response) {
        Alert.error('Brakuje niektórych odpowiedzi');
      }

      return;
    }

    Alert.success('Twoje odpowiedzi zostały zapisane!');
  };

  const closeNewMeeting = () => {
    setIsNewMeeting(false);
    localStorage.removeItem('newly_created_event');
  };

  useEffect(() => {
    const request = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/meetings/${hash}`);

      if (response.status === 404) {
        Alert.error('Podane spotkanie nie zostało znalezione w systemie.');
        history.push('/');
        return;
      }

      const result = await response.json();
      if (response.status !== 200) {
        Alert.error(result);
        history.push('/');
        return;
      }

      setMeeting(result);
    };

    // noinspection JSIgnoredPromiseFromCall
    request();
  }, [hash, history]);

  if (meeting === null) {
    return <Spinner />;
  }

  return (
    <div className="view-meeting">
      <Helmet title={meeting.name} />
      {isNewMeeting && (
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
      )}
      <div className="form-group">
        <h2>{meeting.name}</h2>
      </div>
      <MeetingTable days={meeting.days} onSaveResponse={saveResponse} />
    </div>
  );
};

export default ViewMeeting;

