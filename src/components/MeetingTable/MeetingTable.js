import React from 'react';
import moment from 'moment';
import {MeetingDay} from './MeetingDay';
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
    onNameChange: React.PropTypes.func.isRequired,
    onResponseChange: React.PropTypes.func.isRequired,
  };

  static sortDates(a, b){
    return a.day.valueOf() - b.day.valueOf();
  }

  render(){
    let { schedule, resolution, participants, responses, currentName, currentResponse, onNameChange, onResponseChange } = this.props;
    return (
      <div className="MeetingTable">
        <Participants participants={participants} currentName={currentName} onNameChange={onNameChange} />
        {schedule.sort(this.sortDates).map((event) =>{
            let day = moment(event.day).format('YYYY.MM.DD');
            return <MeetingDay key={event.day.valueOf()} event={event} resolution={resolution}
                               responses={responses[day]} currentResponse={currentResponse[day] || {}}
                               onResponseChange={onResponseChange.bind(this, day)} />
          }
        )}
      </div>
    );
  }
}
export default MeetingTable;
