import {connect} from 'react-redux';
import { MeetingTitle } from '../../components/MeetingTitle';

const mapStateToProps = (state) => ({
  title: state.viewMeeting.meeting.name
});

export default connect(mapStateToProps)(MeetingTitle);
