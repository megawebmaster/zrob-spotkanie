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

  render(){
    let { event, resolution, responses } = this.props;
    let { isFolded } = this.state;
    let hours = this.getHours(event, resolution);

    return (
      <div className="MeetingDay">
        <DayTitle day={event.day} isFolded={isFolded} onFoldChange={this.onFoldChange.bind(this)} />
        {isFolded === false && hours.map(hour =>
          <DayRow key={hour.valueOf()} hour={hour} responses={responses[hour.format('HH:mm')]} />
        )}
      </div>
    );
  }
}
export default MeetingDay;
