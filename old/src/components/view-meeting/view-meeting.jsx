import React, { useCallback, useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import Alert from 'react-s-alert';
import { useHistory, useParams } from 'react-router';
import { omit } from 'ramda';

import { Spinner } from '../spinner/spinner';
import { MeetingTable } from './components/meeting-table/meeting-table';
import { NewMeetingMessage } from './components/new-meeting-message/new-meeting-message';

import './view-meeting.scss';

const ViewMeeting = () => {
  const history = useHistory();
  const { hash } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);

  const request = useCallback(async () => {
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
    setLoading(false);
  }, [hash, history]);

  const saveResponse = async (name, responses) => {
    // ReactGA.event({
    //   category: 'RespondToEvent',
    //   action: state.response.name
    // });
    setLoading(true);

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
      setLoading(false);
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

      setLoading(false);
      return;
    }

    Alert.success('Twoje odpowiedzi zostały zapisane!');
    await request();
  };

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    request();
  }, [request]);

  if (meeting === null) {
    return <Spinner />;
  }

  return (
    <div className="view-meeting">
      <Helmet title={meeting.name} />
      <NewMeetingMessage hash={hash} />
      <div className="form-group">
        <h2>{meeting.name}</h2>
      </div>
      <MeetingTable
        days={meeting.days}
        loading={loading}
        onSaveResponse={saveResponse}
        resolution={meeting.resolution}
      />
    </div>
  );
};

export default ViewMeeting;

