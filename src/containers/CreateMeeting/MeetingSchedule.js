import {connect} from 'react-redux';
import {MeetingSchedule as Schedule} from '../../components/MeetingSchedule';
import {copyFirstDay} from '../../actions';

const mapStateToProps = (state) => ({
  schedule: state.createMeeting.schedule,
});

const mapDispatchToProps = (dispatch) => ({
  onCopyFirstDay: () => dispatch(copyFirstDay())
});

const MeetingSchedule = connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);

export default MeetingSchedule;
