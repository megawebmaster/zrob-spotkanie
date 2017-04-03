import Alert from 'react-s-alert';
import ReactGA from 'react-ga';
import { push } from 'react-router-redux';

export const addDayToSchedule = (day) => ({
  type: 'SCHEDULE_ADD_DAY',
  day
});

export const copyFirstDay = () => ({
  type: 'SCHEDULE_COPY_FIRST_DAY'
});

export const removeDayFromSchedule = (day) => ({
  type: 'SCHEDULE_REMOVE_DAY',
  day
});

export const setCreateMeetingErrors = (errors) => ({
  type: 'CREATE_MEETING_ERRORS',
  errors
});

export const updateParticipantName = (name) => ({
  type: 'PARTICIPANT_UPDATE_NAME',
  name
});

export const updateScheduleEntry = (day, from, to) => ({
  type: 'SCHEDULE_UPDATE_ENTRY',
  day,
  from,
  to
});

export const updateScheduleResolution = (resolution) => ({
  type: 'SCHEDULE_UPDATE_RESOLUTION',
  resolution
});

export const updateVisibleMonth = (month) => ({
  type: 'SCHEDULE_VISIBLE_MONTH',
  month
});

export const createMeeting = () => {
  return async (dispatch, getState) => {
    let meeting = getState().createMeeting;
    ReactGA.event({
      category: 'CreateEvent',
      action: `Resolution: ${meeting.resolution} minutes`
    });

    let response = await fetch(`${process.env.API_URL}/v1/meetings`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: meeting.name,
        resolution: meeting.resolution,
        schedule: meeting.schedule
      })
    });

    if (response.status !== 201) {
      Alert.error('Wystąpiły błędy w formularzu, nie można utworzyć spotkania');
      let errors = await response.json();
      if (errors.hasOwnProperty('name')) {
        Alert.error('Brakuje nazwy spotkania!');
      }
      return dispatch(setCreateMeetingErrors(errors));
    }

    let result = await response.json();
    localStorage.setItem('newly_created_event', result.hash);
    return dispatch(push(`/view/${result.hash}`));
  };
};

export const meetingRequest = () => ({
  type: 'MEETING_REQUESTED'
});

export const meetingFetched = (meeting) => ({
  type: 'MEETING_FETCHED',
  meeting
});

export const meetingFetch = (meetingHash) => {
  return async dispatch => {
    dispatch(meetingRequest());
    let response = await fetch(`${process.env.API_URL}/v1/meetings/${meetingHash}`);
    if (response.status === 404) {
      Alert.error('Podane spotkanie nie zostało znalezione w systemie.');
      return dispatch(push('/'));
    }
    if (response.status !== 200){
      let error = await response.json();
      Alert.error(error);
      return dispatch(push('/'));
    }

    let meeting = await response.json();
    return dispatch(meetingFetched(meeting));
  };
};

export const responseSaved = (response) => ({
  type: 'RESPONSE_SAVED',
  response
});

export const responseSaveError = (error) => ({
  type: 'RESPONSE_SAVE_ERROR',
  error
});

export const addNewResponse = () => ({
  type: 'RESPONSE_NEW'
});

export const saveResponse = () => {
  return async (dispatch, getState) => {
    let state = getState().viewMeeting;
    // ReactGA.event({
    //   category: 'RespondToEvent',
    //   action: state.response.name
    // });

    let response = await fetch(`${process.env.API_URL}/v1/meetings/${state.meeting.hash}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: state.response.name,
        response: state.response.responses
      })
    });

    if (response.status === 500) {
      Alert.error('Wystąpił błąd serwera. Prosimy spróbować później.');

      return new Promise();
    }
    if (response.status !== 201) {
      let error = await response.json();
      if (error.hasOwnProperty('name')){
        Alert.error(error.name.join(', '));
      }
      if (error.hasOwnProperty('response')){
        Alert.error('Brakuje niektórych odpowiedzi');
      }

      return dispatch(responseSaveError(error));
    }

    Alert.success('Twoje odpowiedzi zostały zapisane!');

    return dispatch(responseSaved(state.response));
  };
};

export const updateResponseName = (name) => ({
  type: 'RESPONSE_UPDATE_NAME',
  name
});

export const foldWholeDay = (event, isFolded) => ({
  type: 'RESPONSE_FOLD_DAY',
  event,
  isFolded
});

export const updateWholeDay = (event, response) => ({
  type: 'RESPONSE_UPDATE_DAY',
  event,
  response
});

export const updateDayHour = (event, hour, response) => ({
  type: 'RESPONSE_UPDATE_DAY_AND_HOUR',
  event,
  hour,
  response
});
