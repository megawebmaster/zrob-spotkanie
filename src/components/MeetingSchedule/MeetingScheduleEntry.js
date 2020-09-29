import React from 'react';
import PropTypes from 'prop-types';
import {FormattedDate, FormattedMessage, injectIntl} from 'react-intl';

class MeetingScheduleEntry extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    errors: PropTypes.object.isRequired,
    resolution: PropTypes.string.isRequired,
    onDayRemove: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  updateFrom(event){
    this.props.onUpdate(event.target.value, this.props.event.to);
  }

  updateTo(event){
    this.props.onUpdate(this.props.event.from, event.target.value);
  }

  render(){
    let {intl, event, errors, onDayRemove} = this.props;
    let hasFromErrors = errors.hasOwnProperty('from') && errors.from.length > 0;
    let hasToErrors = errors.hasOwnProperty('to') && errors.to.length > 0;

    return (
      <div className="form-group form-row">
        <label htmlFor="meeting-schedule-entry-from" className="col-form-label col-sm-2">
          <FormattedDate value={event.day} year="numeric" month="numeric" day="numeric" />
        </label>
        <div className={"col-sm-2" + (hasFromErrors ? ' has-danger' : '')}>
          <input type="text" id="meeting-schedule-entry-from" className="form-control" value={event.from || ''}
                 placeholder={intl.formatMessage({id: 'createMeeting.scheduleEntryStart', defaultMessage: 'np. 10 lub 8:30'})}
                 onChange={this.updateFrom.bind(this)} />
          {hasFromErrors && <div className="form-control-feedback">{errors.from.join(', ')}</div>}
        </div>
        <div className={"col-sm-2" + (hasToErrors ? ' has-danger' : '')}>
          <input type="text" id="meeting-schedule-entry-to" className="form-control" value={event.to || ''}
                 placeholder={intl.formatMessage({id: 'createMeeting.scheduleEntryEnd', defaultMessage: 'np. 16 lub 18:45'})}
                 onChange={this.updateTo.bind(this)} />
          {hasToErrors && <div className="form-control-feedback">{errors.to.join(', ')}</div>}
        </div>
        <div className="col-sm-6">
          <button className="btn btn-secondary mr-1" tabIndex="-1" onClick={() => onDayRemove(event)}>
            <span className="d-lg-none">
              <FormattedMessage id="createMeeting.scheduleEntryRemoveSmall" defaultMessage="Usuń" />
            </span>
            <span className="d-none d-lg-block">
              <FormattedMessage id="createMeeting.scheduleEntryRemove" defaultMessage="Usuń ten dzień" />
            </span>
          </button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default injectIntl(MeetingScheduleEntry);
