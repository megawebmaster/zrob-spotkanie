import React from 'react';
import moment from 'moment';

class MeetingScheduleEntry extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    onDayRemove: React.PropTypes.func.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  };

  updateFrom(event) {
    this.props.onUpdate(event.target.value, this.props.event.to);
  }

  updateTo(event) {
    this.props.onUpdate(this.props.event.from, event.target.value);
  }

  isCorrect() {
    let { from, to } = this.props.event;
    return from === undefined || to === undefined || parseInt(from, 10) < parseInt(to, 10);
  }

  render() {
    let { event, onDayRemove } = this.props;
    let label = moment(event.day).format('DD.MM.YYYY');

    return (
      <div className={"form-group clearfix " + (this.isCorrect() ? '' : 'has-danger')}>
        <label htmlFor="meeting-schedule-entry-from" className="col-form-label col-xs-3">{label}</label>
        <div className="col-xs-2">
          <input type="text" id="meeting-schedule-entry-from" className="form-control" value={event.from}
                 placeholder="np. od 8" onChange={this.updateFrom.bind(this)} />
        </div>
        <div className="col-xs-2">
          <input type="text" id="meeting-schedule-entry-to" className="form-control" value={event.to}
                 placeholder="np. do 16" onChange={this.updateTo.bind(this)} />
        </div>
        <div className="col-xs-5">
          <button className="btn btn-secondary" tabIndex="-1" onClick={() => onDayRemove(event)}>Usuń ten dzień</button>
          {this.props.children}
        </div>
        {!this.isCorrect() && <div className="col-xs-9 col-offset-xs-2 form-control-feedback">
          Godzina początkowa musi być mniejsza niż godzina końcowa!
        </div>}
      </div>
    );
  }
}

export default MeetingScheduleEntry;
