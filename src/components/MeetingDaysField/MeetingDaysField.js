import React from "react";
import PropTypes from 'prop-types';
import DayPicker, {DateUtils} from "react-day-picker";
import LocaleUtils from "react-day-picker/moment";
import {FormattedMessage} from 'react-intl';
import moment from 'moment';
import "./MeetingDaysField.scss";

class MeetingDaysField extends React.Component {
  static propTypes = {
    days: PropTypes.array.isRequired,
    month: PropTypes.object.isRequired,
    onDayChange: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired
  };

  handleDayClick(day, {selected, disabled}){
    // We need to pass it upwards
    if(disabled){
      return;
    }

    this.props.onDayChange(selected, day);
  }

  isDaySelected(day){
    return this.props.days.findIndex((d) => DateUtils.isSameDay(d, day)) > -1;
  }

  static isDayBeforeToday(day) {
    return moment(day).endOf('day').isBefore();
  }

  render(){
    let { month, onMonthChange } = this.props;
    // TODO: Create Redux version of DayPicker
    return (
      <div className="MeetingDaysField form-group form-row">
        <label htmlFor="meeting-name" className="col-form-label col-sm-3">
          <FormattedMessage id="createMeeting.days" defaultMessage="Wybierz dni" />
        </label>
        <div className="col-sm-6 col-md-5 col-lg-4">
          <DayPicker initialMonth={month} firstDayOfWeek={1} selectedDays={this.isDaySelected.bind(this)}
                     disabledDays={MeetingDaysField.isDayBeforeToday} fromMonth={new Date()}
                     onDayClick={this.handleDayClick.bind(this)} onMonthChange={onMonthChange} localeUtils={LocaleUtils}
                     locale="pl" />
        </div>
        <div className="col-sm-3 col-md-4 col-lg-5">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default MeetingDaysField;
