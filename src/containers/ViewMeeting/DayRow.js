import {connect} from 'react-redux';
import { DayRow } from '../../components/MeetingTable/MeetingDay/DayRow';
import {updateDayHour} from '../../actions';

const mapStateToProps = (state, ownProps) => {
  let response = state.viewMeeting.response.responses;
  let errors = state.viewMeeting.errors.responses;
  let formattedDay = ownProps.event.day.format('YYYY-MM-DD');
  let formattedHour = ownProps.hour.format('HH:mm');

  return {
    responses: state.viewMeeting.meeting.responses[formattedDay][formattedHour],
    currentResponse: response.hasOwnProperty(formattedDay) ? response[formattedDay][formattedHour] || '' : '',
    error: errors.hasOwnProperty(formattedDay) ? errors[formattedDay][formattedHour] : undefined,
    showForm: !state.viewMeeting.response.hasResponded,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onResponseChange: (response) => dispatch(updateDayHour(ownProps.event, ownProps.hour, response))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayRow);
