import React from 'react';
import moment from 'moment';
import { MeetingDay } from './MeetingDay';
import { Participants } from './Participants';
import './MeetingTable.scss';

class MeetingTable extends React.Component {
  static propTypes = {
    schedule: React.PropTypes.array.isRequired,
    resolution: React.PropTypes.number.isRequired,
    participants: React.PropTypes.array.isRequired,
    responses: React.PropTypes.object.isRequired,
  };

  static sortDates(a, b){
    return a.day.valueOf() - b.day.valueOf();
  }

  render(){
    let { schedule, resolution, participants, responses } = this.props;
    return (
      <div className="MeetingTable">
        <Participants participants={participants} />
        {schedule.sort(this.sortDates).map((event) =>
          <MeetingDay key={event.day.valueOf()} event={event} resolution={resolution}
                      responses={responses[moment(event.day).format('YYYY.MM.DD')]} />
        )}
      </div>
    );
  }
}
export default MeetingTable;
