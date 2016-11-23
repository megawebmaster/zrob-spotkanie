import React, {Component} from "react";
import DayPicker, {DateUtils} from "react-day-picker";
import "./MeetingDaysField.scss";

class MeetingDaysField extends Component {
  static propTypes = {
    days: React.PropTypes.array.isRequired,
    onDayChange: React.PropTypes.func.isRequired
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
    return (
      <div className="MeetingDaysField form-group clearfix">
        <label htmlFor="meeting-name" className="col-form-label col-xs-3">Wybierz dni</label>
        <div className="col-xs-4">
          <DayPicker initialMonth={new Date()} selectedDays={this.isDaySelected.bind(this)}
                     onDayClick={this.handleDayClick.bind(this)} />
        </div>
        <div className="col-xs-5">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default MeetingDaysField;
