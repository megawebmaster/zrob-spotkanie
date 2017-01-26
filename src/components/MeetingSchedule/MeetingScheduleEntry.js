import React from 'react';
import moment from 'moment';

class MeetingScheduleEntry extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    errors: React.PropTypes.object.isRequired,
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

  render() {
    let { event, errors, onDayRemove } = this.props;
    let label = moment(event.day).format('DD.MM.YYYY');
    let hasFromErrors = errors.hasOwnProperty('from') && errors.from.length > 0;
    let hasToErrors = errors.hasOwnProperty('to') && errors.to.length > 0;

    return (
      <div className="form-group clearfix">
        <label htmlFor="meeting-schedule-entry-from" className="col-form-label col-xs-3">{label}</label>
        <div className={"col-xs-2 small-padding" + (hasFromErrors ? ' has-danger' : '')}>
          <input type="text" id="meeting-schedule-entry-from" className="form-control" value={event.from || ''}
                 placeholder="np. 8 lub 8:30" onChange={this.updateFrom.bind(this)} />
          {hasFromErrors && <div className="form-control-feedback">{errors.from.join(', ')}</div>}
        </div>
        <div className={"col-xs-2 small-padding" + (hasToErrors ? ' has-danger' : '')}>
          <input type="text" id="meeting-schedule-entry-to" className="form-control" value={event.to || ''}
                 placeholder="np. 16 lub 18:45" onChange={this.updateTo.bind(this)} />
          {hasToErrors && <div className="form-control-feedback">{errors.to.join(', ')}</div>}
        </div>
        <div className="col-xs-5">
          <button className="btn btn-secondary mr-1" tabIndex="-1" onClick={() => onDayRemove(event)}>
            <span className="hidden-md-up">Usuń</span>
            <span className="hidden-sm-down">Usuń ten dzień</span>
          </button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MeetingScheduleEntry;
