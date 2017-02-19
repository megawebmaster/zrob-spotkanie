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
  return (dispatch, getState) => {
    let meeting = getState().createMeeting;
    ReactGA.event({
      category: 'CreateEvent',
      action: `Resolution: ${meeting.resolution} minutes`
    });
    fetch(`${process.env.API_URL}/v1/meetings`, {
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
    }).then(
      result => {
        if (result.status !== 201) {
          Alert.error('Wystąpiły błędy w formularzu, nie można utworzyć spotkania');
          return result.json().then(response => dispatch(setCreateMeetingErrors(response)));
        }

        return result.json().then(response => {
          localStorage.setItem('newly_created_event', response.hash);
          return dispatch(push(`/view/${response.hash}`));
        });
      },
      error => Alert.error(error)
    );
  };
};
