import React, {Component} from "react";
import MeetingScheduleEntry from "./MeetingScheduleEntry";
import "./MeetingSchedule.scss";

class MeetingSchedule extends Component {
  static propTypes = {
    schedule: React.PropTypes.array.isRequired,
    onDayRemove: React.PropTypes.func.isRequired,
    onUpdateSchedule: React.PropTypes.func.isRequired
  };

  handleUpdate(day, from, to) {
    this.props.onUpdateSchedule(day, from, to);
  }

  sortDates(a, b){
    return a.day.valueOf() - b.day.valueOf();
  }

  render(){
    let { schedule, onDayRemove } = this.props;
    return (
      <fieldset className="MeetingSchedule">
        <legend>Przedziały godzin</legend>
        {schedule.length === 0 && <p className="px-2 m-0 float-xs-left" style={{lineHeight: '1.8rem'}}>Wybierz dni dla spotkania</p>}
        {schedule.sort(this.sortDates).map((event) =>
          <MeetingScheduleEntry key={event.day.valueOf()} event={event} onDayRemove={() => onDayRemove(event.day)}
                                onUpdate={this.handleUpdate.bind(this, event)} />
        )}
      </fieldset>
    );
  }
}

export default MeetingSchedule;
