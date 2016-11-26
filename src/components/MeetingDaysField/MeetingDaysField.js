import React from "react";
import DayPicker, {DateUtils} from "react-day-picker";
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

  render(){
    let { month, onMonthChange } = this.props;
    return (
      <div className="MeetingDaysField form-group clearfix">
        <label htmlFor="meeting-name" className="col-form-label col-xs-3">Wybierz dni</label>
        <div className="col-xs-4">
          <DayPicker initialMonth={month} selectedDays={this.isDaySelected.bind(this)}
                     onDayClick={this.handleDayClick.bind(this)} onMonthChange={onMonthChange} />
        </div>
        <div className="col-xs-5">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default MeetingDaysField;
