import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import MeetingScheduleEntry from './../../containers/CreateMeeting/MeetingSchedule/MeetingScheduleEntry';
import './MeetingSchedule.scss';

class MeetingSchedule extends React.Component {
  static propTypes = {
    schedule: React.PropTypes.array.isRequired,
    onCopyFirstDay: React.PropTypes.func.isRequired,
    intl: React.PropTypes.object.isRequired,
  };

  isFirstRowFilled(){
    let {schedule} = this.props;
    if(schedule.length === 0){
      return false;
    }
    return schedule[0].from !== undefined && schedule[0].to !== undefined &&
      schedule[0].from.length > 0 && schedule[0].to.length > 0 &&
      parseInt(schedule[0].from, 10) < parseInt(schedule[0].to, 10);
  }

  static sortDates(a, b){
    return a.day.valueOf() - b.day.valueOf();
  }

  render(){
    let {intl, schedule, onCopyFirstDay} = this.props;
    return (
      <fieldset className="MeetingSchedule">
        <legend>{intl.formatMessage({id: 'createMeeting.schedule', defaultMessage: 'Przedziały godzin'})}</legend>
        {schedule.length === 0 && <p className="px-2 m-0 float-xs-left" style={{lineHeight: '1.8rem'}}>
          <FormattedMessage id="createMeeting.scheduleDays" defaultMessage="Wybierz dni dla spotkania" />
        </p>}
        {schedule.sort(MeetingSchedule.sortDates).map((event, index) =>
          <MeetingScheduleEntry key={event.day.valueOf()} index={index} event={event}>
            {index === 0 && schedule.length > 1 &&
            <button className="btn btn-secondary" type="button" tabIndex="-1" disabled={!this.isFirstRowFilled()}
                    onClick={onCopyFirstDay}>
              <span className="hidden-lg-up">
                <FormattedMessage id="createMeeting.scheduleDaysAllSmall" defaultMessage="Wszystkie" />
              </span>
              <span className="hidden-md-down">
                <FormattedMessage id="createMeeting.scheduleDaysAll" defaultMessage="Zastosuj do wszystkich" />
              </span>
            </button>}
          </MeetingScheduleEntry>
        )}
      </fieldset>
    );
  }
}

export default injectIntl(MeetingSchedule);
