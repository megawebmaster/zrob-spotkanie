import {connect} from 'react-redux';
import { NewParticipant } from '../../components/MeetingTable/Participants/NewParticipant';
import {updateResponseName} from '../../actions';

const mapStateToProps = (state) => ({
  name: state.viewMeeting.response.name,
  error: state.viewMeeting.errors.name,
});
const mapDispatchToProps = (dispatch) => ({
  onNameChange: (name) => dispatch(updateResponseName(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewParticipant);
