import {connect} from 'react-redux';
import Entry from '../../../components/MeetingSchedule/MeetingScheduleEntry';
import {removeDayFromSchedule, updateScheduleEntry} from '../../../actions';

const mapStateToProps = (state, ownProps) => {
  let errors = state.createMeeting.errors.schedule[ownProps.index];
  if (errors === undefined || errors.length === 0) {
    errors = {};
  }

  return {
    resolution: state.createMeeting.resolution,
    errors,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDayRemove: () => dispatch(removeDayFromSchedule(ownProps.event.day)),
  onUpdate: (from, to) => dispatch(updateScheduleEntry(ownProps.event.day, from, to))
});

const MeetingScheduleEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(Entry);

export default MeetingScheduleEntry;
