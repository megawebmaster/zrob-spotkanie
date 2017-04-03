import {connect} from 'react-redux';
import { DayTitle } from '../../components/MeetingTable/MeetingDay/DayTitle';
import {foldWholeDay, updateWholeDay} from '../../actions';

const getWholeDayResponse = (currentResponse, hours) => {
  // TODO: Improve this code
  if (hours.length === 0) {
    return 'none';
  }
  if (!currentResponse) {
    return 'none';
  }

  let wholeDayResponse = currentResponse[hours[0].format('HH:mm')] || 'none';
  for (let hour in hours) {
    if (!hours.hasOwnProperty(hour)) {
      continue;
    }

    let value = hours[hour].format('HH:mm');
    if (!currentResponse.hasOwnProperty(value) || currentResponse[value] !== wholeDayResponse) {
      wholeDayResponse = 'none';
    }
  }

  return wholeDayResponse;
};

const mapStateToProps = (state, ownProps) => ({
  participants: state.viewMeeting.participants,
  isFolded: state.viewMeeting.response.foldedDays[ownProps.event.day.format('YYYY-MM-DD')] || false,
  currentResponse: getWholeDayResponse(
    state.viewMeeting.response.responses[ownProps.event.day.format('YYYY-MM-DD')],
    ownProps.event.available_hours
  ),
  showForm: !state.viewMeeting.response.hasResponded,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFoldChange: (isFolded) => dispatch(foldWholeDay(ownProps.event, isFolded)),
  onResponseChange: (response) => dispatch(updateWholeDay(ownProps.event, response))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayTitle);
