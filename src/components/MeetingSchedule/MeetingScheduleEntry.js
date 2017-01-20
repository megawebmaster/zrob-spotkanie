import React from 'react';
import moment from 'moment';

class MeetingScheduleEntry extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    resolution: React.PropTypes.string.isRequired,
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
    let { from, to, day } = this.props.event;
    let { resolution } = this.props;

    if (from === undefined || from.length === 0) {
      return true;
    }

    let today = moment();
    let fromMoment = moment(from, 'HH:mm');
    if (moment(day).isSame(today, 'day') && fromMoment.isSameOrBefore(today, 'minute')) {
      return 'Ale to już było... :)';
    }

    if (to === undefined || to.length === 0) {
      return true;
    }

    let toMoment = moment(to, 'HH:mm');
    if (!fromMoment.isBefore(toMoment, 'minute')) {
      return 'Godzina końcowa musi być później niż godzina początkowa'
    }

    if (!fromMoment.isSameOrBefore(toMoment.subtract(resolution, 'minutes'), 'minute')) {
      return 'Przedział jest za krótki, żeby mogło tam być spotkanie'
    }

    return true;
  }

  render() {
    let { event, onDayRemove } = this.props;
    let label = moment(event.day).format('DD.MM.YYYY');
    let status = this.isCorrect();

    return (
      <div className={"form-group clearfix " + (status === true ? '' : 'has-danger')}>
        <label htmlFor="meeting-schedule-entry-from" className="col-form-label col-xs-3">{label}</label>
        <div className="col-xs-2 small-padding">
          <input type="text" id="meeting-schedule-entry-from" className="form-control" value={event.from}
                 placeholder="np. 8 lub 8:30" onChange={this.updateFrom.bind(this)} />
        </div>
        <div className="col-xs-2 small-padding">
          <input type="text" id="meeting-schedule-entry-to" className="form-control" value={event.to}
                 placeholder="np. 16 lub 18:45" onChange={this.updateTo.bind(this)} />
        </div>
        <div className="col-xs-5">
          <button className="btn btn-secondary mr-1" tabIndex="-1" onClick={() => onDayRemove(event)}>
            <span className="hidden-md-up">Usuń</span>
            <span className="hidden-sm-down">Usuń ten dzień</span>
          </button>
          {this.props.children}
        </div>
        {status !== true && <div className="col-xs-9 col-offset-xs-2 form-control-feedback">
          {status}
        </div>}
      </div>
    );
  }
}

export default MeetingScheduleEntry;
