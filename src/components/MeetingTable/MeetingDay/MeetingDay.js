import React from 'react';
import moment from 'moment';
import { DayTitle } from './DayTitle';
import { DayRow } from './DayRow';
import './MeetingDay.scss';

class MeetingDay extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    resolution: React.PropTypes.number.isRequired,
    responses: React.PropTypes.object.isRequired,
    currentResponse: React.PropTypes.object.isRequired,
    onResponseChange: React.PropTypes.func.isRequired,
  };

  state = {
    isFolded: false,
  };

  onFoldChange(isFolded) {
    this.setState({ isFolded });
  }

  getHours(event, resolution) {
    let hours = [];
    let from = moment(event.from, 'HH:mm');
    let to = moment(event.to, 'HH:mm');
    for (let i = from; i.isSameOrBefore(to); i.add(resolution, 'minutes')) {
      hours.push(moment(i));
    }

    return hours;
  }

  getWholeDayResponse(currentResponse, hours) {
    let wholeDayResponse = currentResponse[hours[0].format('HH:mm')] || '';
    for (var hour in currentResponse) {
      if (currentResponse.hasOwnProperty(hour) && currentResponse[hour] !== wholeDayResponse) {
        wholeDayResponse = '';
      }
    }

    return wholeDayResponse;
  }

  updateWholeDayResponse(answer) {
    let { event, resolution, onResponseChange } = this.props;
    let hours = this.getHours(event, resolution);
    hours.forEach(hour => onResponseChange(hour.format('HH:mm'), answer));
    this.setState({ isFolded: true });
  }

  render(){
    let { event, resolution, responses, currentResponse, onResponseChange } = this.props;
    let { isFolded } = this.state;
    let hours = this.getHours(event, resolution);
    let wholeDayResponse = this.getWholeDayResponse(currentResponse, hours);

    return (
      <div className="MeetingDay">
        <DayTitle day={event.day} isFolded={isFolded} onFoldChange={this.onFoldChange.bind(this)}
                  currentResponse={wholeDayResponse} onResponseChange={this.updateWholeDayResponse.bind(this)} />
        {isFolded === false && hours.map(hour => {
            let value = hour.format('HH:mm');
            return <DayRow key={hour.valueOf()} hour={hour} responses={responses[value]}
                           currentResponse={currentResponse[value] || ''}
                           onResponseChange={onResponseChange.bind(this, value)} />
          }
        )}
      </div>
    );
  }
}
export default MeetingDay;
