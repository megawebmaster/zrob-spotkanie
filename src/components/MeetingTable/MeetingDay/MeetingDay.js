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
    isFolded: React.PropTypes.bool.isRequired,
    currentResponse: React.PropTypes.object.isRequired,
    onResponseChange: React.PropTypes.func.isRequired,
    onFold: React.PropTypes.func.isRequired,
  };

  state = {
    manualFold: false
  };

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
    if (hours.length === 0) {
      return '';
    }

    let wholeDayResponse = currentResponse[hours[0].format('HH:mm')] || 'none';
    for (var hour in hours) {
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

  updateWholeDayResponse(answer) {
    let { event, resolution, onResponseChange, onFold } = this.props;
    let hours = this.getHours(event, resolution);
    hours.forEach(hour => onResponseChange(hour.format('HH:mm'), answer));
    onFold(true);
    this.setState({ manualFold: true });
  }

  handleResponse(hour, answer) {
    let { event, resolution, currentResponse, onResponseChange, onFold } = this.props;
    let { manualFold } = this.state;
    onResponseChange(hour, answer);

    if (manualFold) {
      return;
    }

    let hours = this.getHours(event, resolution);

    let hasResponses = true;
    for (var h in hours) {
      if (!hours.hasOwnProperty(h)) {
        continue;
      }

      let value = hours[h].format('HH:mm');
      if (!currentResponse.hasOwnProperty(value) && value !== hour) {
        hasResponses = false;
        break;
      }
    }

    if (hasResponses) {
      onFold(true);
      this.setState({ manualFold: true });
    }
  }

  render(){
    let { event, resolution, responses, currentResponse, isFolded, onFold } = this.props;
    let hours = this.getHours(event, resolution);
    let wholeDayResponse = this.getWholeDayResponse(currentResponse, hours);

    return (
      <div className="MeetingDay">
        <DayTitle day={event.day} isFolded={isFolded} onFoldChange={onFold} currentResponse={wholeDayResponse}
                  onResponseChange={this.updateWholeDayResponse.bind(this)} />
        {isFolded === false && hours.map(hour => {
            let value = hour.format('HH:mm');
            return <DayRow key={hour.valueOf()} hour={hour} responses={responses[value]}
                           currentResponse={currentResponse[value] || ''}
                           onResponseChange={this.handleResponse.bind(this, value)} />
          }
        )}
      </div>
    );
  }
}
export default MeetingDay;
