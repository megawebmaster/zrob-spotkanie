import {connect} from 'react-redux';
import { MeetingTable } from '../../components/MeetingTable';

const mapStateToProps = (state) => ({
  schedule: state.viewMeeting.meeting.schedule,
  resolution: state.viewMeeting.meeting.resolution,
  foldedDays: state.viewMeeting.response.foldedDays,
  showForm: !state.viewMeeting.response.hasResponded,
});

export default connect(mapStateToProps)(MeetingTable);
