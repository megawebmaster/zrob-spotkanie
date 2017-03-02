import React from 'react';
import moment from 'moment';
import { DayTitle } from './MeetingDay/DayTitle';
import { DayRow } from './MeetingDay/DayRow';
import {Participants} from './Participants';
import './MeetingTable.scss';

class MeetingTable extends React.PureComponent {
  static propTypes = {
    schedule: React.PropTypes.array.isRequired,
    resolution: React.PropTypes.number.isRequired,
    participants: React.PropTypes.array.isRequired,
    responses: React.PropTypes.object.isRequired,
    currentName: React.PropTypes.string.isRequired,
    currentResponse: React.PropTypes.object.isRequired,
    foldedDays: React.PropTypes.object.isRequired,
    onNameChange: React.PropTypes.func.isRequired,
    onResponseChange: React.PropTypes.func.isRequired,
    onFold: React.PropTypes.func.isRequired,
  };

  static sortDates(a, b){
    return a.day.valueOf() - b.day.valueOf();
  }

  static getHours(event, resolution) {
    let hours = [];
    let from = moment(event.from, 'HH:mm');
    let to = moment(event.to, 'HH:mm');
    for (let i = from; i.isBefore(to); i.add(resolution, 'minutes')) {
      hours.push(moment(i));
    }

    return hours;
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
    let {
      schedule, resolution, participants, responses, currentName, currentResponse, foldedDays,
      onNameChange, onResponseChange, onFold
    } = this.props;
    let rows = [];

    schedule.sort(MeetingTable.sortDates).forEach((event) => {
      let day = moment(event.day).format('YYYY.MM.DD');
      let hours = MeetingTable.getHours(event, resolution);
      let isFolded = foldedDays[day] || false;
      let dayResponse = currentResponse[day] || {};
      let wholeDayResponse = MeetingTable.getWholeDayResponse(dayResponse, hours);
      rows.push(<DayTitle key={event.day.valueOf()} day={event.day} participants={participants} isFolded={isFolded}
                          currentResponse={wholeDayResponse} onFoldChange={onFold.bind(this, day)}
                          onResponseChange={this.updateWholeDayResponse.bind(this, day, event)} />);
      if(!isFolded){
        rows = rows.concat(hours.map(hour =>{
          let value = hour.format('HH:mm');
          return <DayRow key={event.day.valueOf() + '-' +hour.valueOf()} hour={hour} responses={responses[day][value]}
                         currentResponse={dayResponse[value] || ''}
                         onResponseChange={onResponseChange.bind(this, day, value)} />
        }));
      }
    });

    return (
      <div className="MeetingTable">
        <div>
          <table className="table">
            <thead>
              <Participants key="participants-list" participants={participants} currentName={currentName}
                            onNameChange={onNameChange} />
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default MeetingTable;
