import React from "react";
import DayPicker, {DateUtils} from "react-day-picker";
import LocaleUtils from "react-day-picker/moment";
import moment from 'moment';
import "./MeetingDaysField.scss";

class MeetingDaysField extends React.Component {
  static propTypes = {
    days: React.PropTypes.array.isRequired,
    month: React.PropTypes.object.isRequired,
    onDayChange: React.PropTypes.func.isRequired,
    onMonthChange: React.PropTypes.func.isRequired
  };

  handleDayClick(e, day, {selected, disabled}){
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
      <div className="MeetingDaysField form-group clearfix">
        <label htmlFor="meeting-name" className="col-form-label col-xs-3">Wybierz dni</label>
        <div className="col-xs-6 col-md-5 col-lg-4">
          <DayPicker initialMonth={month} firstDayOfWeek={1} selectedDays={this.isDaySelected.bind(this)}
                     disabledDays={MeetingDaysField.isDayBeforeToday} fromMonth={new Date()}
                     onDayClick={this.handleDayClick.bind(this)} onMonthChange={onMonthChange} localeUtils={LocaleUtils}
                     locale="pl" />
        </div>
        <div className="col-xs-3 col-md-4 col-lg-5">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default MeetingDaysField;
