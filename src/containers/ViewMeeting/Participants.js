import {connect} from 'react-redux';
import { Participants } from '../../components/MeetingTable/Participants';

const mapStateToProps = (state) => ({
  participants: state.viewMeeting.participants,
  showForm: !state.viewMeeting.response.hasResponded,
});

export default connect(mapStateToProps)(Participants);
