import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayRow from './../../containers/ViewMeeting/DayRow';
import DayTitle from './../../containers/ViewMeeting/DayTitle';
import Participants from './../../containers/ViewMeeting/Participants';
import './MeetingTable.scss';

class MeetingTable extends React.PureComponent {
  static propTypes = {
    schedule: PropTypes.array.isRequired,
    foldedDays: PropTypes.object.isRequired,
    showForm: PropTypes.bool.isRequired,
  };

  static sortDates(a, b){
    return a.day.valueOf() - b.day.valueOf();
  }

  static getWholeDayResponse(currentResponse, hours) {
    if (hours.length === 0) {
      return '';
    }

    let wholeDayResponse = currentResponse[hours[0].format('HH:mm')] || 'none';
    for (let hour in hours) {
      if (!hours.hasOwnProperty(hour)) {
        continue;
      }

      let value = hours[hour].format('HH:mm');
      if (!currentResponse.hasOwnProperty(value) || currentResponse[value] !== wholeDayResponse) {
        wholeDayResponse = 'none';
      }
    }

    return wholeDayResponse;
  }

  updateWholeDayResponse(day, event, answer) {
    let { resolution, onResponseChange, onFold } = this.props;
    let hours = MeetingTable.getHours(event, resolution);
    hours.forEach(hour => onResponseChange(day, hour.format('HH:mm'), answer));
    onFold(day, true);
  }

  render(){
    let { schedule, foldedDays, showForm } = this.props;
    let rows = [];

    schedule.sort(MeetingTable.sortDates).forEach((event) => {
      let day = moment(event.day).format('YYYY-MM-DD');
      let isFolded = foldedDays[day] || false;
      rows.push(<DayTitle key={event.day.valueOf()} event={event} />);
      if(!isFolded){
        rows = rows.concat(event.available_hours.map(hour =>{
          return <DayRow key={event.day.valueOf() + '-' +hour.valueOf()} event={event} hour={hour} />
        }));
      }
    });

    return (
      <div className={"MeetingTable" + (showForm ? '' : '-NoForm')}>
        <div>
          <table className="table">
            <thead>
              <Participants />
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default MeetingTable;
