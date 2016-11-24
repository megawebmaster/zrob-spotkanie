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

  isFirstRowFilled() {
    let { schedule } = this.props;
    if (schedule.length === 0) {
      return false;
    }
    return schedule[0].from !== undefined && schedule[0].to !== undefined &&
      schedule[0].from.length > 0 && schedule[0].to.length > 0;
  }

  copyFirstRow() {
    let { schedule } = this.props;
    if (schedule.length === 0) {
      return false;
    }
    let { from, to } = schedule[0];
    schedule.forEach((event) => this.handleUpdate(event, from, to));
  }

  sortDates(a, b){
    return a.day.valueOf() - b.day.valueOf();
  }

  render(){
    let { schedule, onDayRemove } = this.props;
    return (
      <fieldset className="MeetingSchedule">
        <legend>Przedziały godzin</legend>
        {schedule.length === 0 && <p className="px-2 m-0 float-xs-left" style={{lineHeight: '1.8rem'}}>
          Wybierz dni dla spotkania
        </p>}
        {schedule.sort(this.sortDates).map((event, index) =>
          <MeetingScheduleEntry key={event.day.valueOf()} event={event} onDayRemove={() => onDayRemove(event.day)}
                                onUpdate={this.handleUpdate.bind(this, event)}>
            {index === 0 && <button className="btn btn-secondary ml-1" type="button" tabIndex="-1"
                                    disabled={!this.isFirstRowFilled()} onClick={() => this.copyFirstRow()}>
              Zastosuj do wszystkich
            </button>}
          </MeetingScheduleEntry>
        )}
      </fieldset>
    );
  }
}

export default MeetingSchedule;
