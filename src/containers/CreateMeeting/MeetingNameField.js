import {connect} from 'react-redux';
import {MeetingNameField as Field} from '../../components/MeetingNameField';
import {updateParticipantName} from '../../actions';

const mapStateToProps = (state) => ({
  value: state.createMeeting.name,
  errors: state.createMeeting.errors.name,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (name) => dispatch(updateParticipantName(name)),
});

const MeetingNameField = connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);

export default MeetingNameField;
