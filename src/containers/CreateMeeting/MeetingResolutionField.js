import {connect} from 'react-redux';
import {MeetingResolutionField as Field} from '../../components/MeetingResolutionField';
import {updateScheduleResolution} from '../../actions';

const mapStateToProps = (state) => ({
  value: state.createMeeting.resolution,
  errors: state.createMeeting.errors.resolution,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (resolution) => dispatch(updateScheduleResolution(resolution)),
});

const MeetingResolutionField = connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);

export default MeetingResolutionField;
