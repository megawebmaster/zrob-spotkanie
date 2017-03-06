import {connect} from 'react-redux';
import { DayRow } from '../../components/MeetingTable/MeetingDay/DayRow';
import {updateDayHour} from '../../actions';

const mapStateToProps = (state, ownProps) => {
  let response = state.viewMeeting.response.responses;
  let formattedDay = ownProps.day.format('YYYY.MM.DD');
  let formattedHour = ownProps.hour.format('HH:mm');

  return {
    responses: state.viewMeeting.meeting.responses[formattedDay][formattedHour],
    currentResponse: response.hasOwnProperty(formattedDay) ? response[formattedDay][formattedHour] || '' : '',
    showForm: !state.viewMeeting.response.hasResponded,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onResponseChange: (response) => dispatch(updateDayHour(ownProps.day, ownProps.hour, response))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayRow);
