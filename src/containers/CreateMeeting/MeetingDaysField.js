import {connect} from 'react-redux';
import {MeetingDaysField as Field} from '../../components/MeetingDaysField';
import {addDayToSchedule, removeDayFromSchedule, updateVisibleMonth} from '../../actions';

const mapStateToProps = (state) => ({
  days: state.createMeeting.schedule.map(e => e.day),
  month: state.createMeeting.visibleMonth,
});

const mapDispatchToProps = (dispatch) => ({
  onDayChange: (isSelected, day) => {
    if (isSelected){
      dispatch(removeDayFromSchedule(day));
    } else {
      dispatch(addDayToSchedule(day));
    }
  },
  onMonthChange: (month) => dispatch(updateVisibleMonth(month))
});

const MeetingDaysField = connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);

export default MeetingDaysField;
