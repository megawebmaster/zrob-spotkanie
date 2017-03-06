import React from 'react';
import { Participant } from './Participant';
import NewParticipant from './../../../containers/ViewMeeting/NewParticipant';
import './Participants.scss';

class Participants extends React.Component {
  static propTypes = {
    participants: React.PropTypes.array.isRequired,
    showForm: React.PropTypes.bool.isRequired,
  };
  participants = [];

  componentDidMount(){
    this.recalculatePositions();
    window.addEventListener('resize', this.recalculatePositions.bind(this));
  }
  componentWillUpdate(){
    this.participants = [];
  }
  componentDidUpdate(){
    this.recalculatePositions();
  }

  recalculatePositions(){
    if (this.participants.length === 0) {
      return;
    }

    let maxHeight = 0;
    this.participants.forEach(item => {
      if (item != null && item.offsetHeight > maxHeight) {
        maxHeight = item.offsetHeight;
      }
    });

    let offset = 8;
    if (this.participant) {
      offset = this.participant.offsetHeight / 4;
    }

    let top = maxHeight + offset;

    if (this.title){
      this.title.style.top = top + 'px';
    }

    if (this.participant){
      this.participant.style.top = top + 'px';
    }
  }

  render(){
    let { participants, showForm } = this.props;
    return (
      <tr className="Participants">
        <th scope="col" className="title" ref={input => this.title = input}><p>Uczestnicy:</p></th>
        {showForm && <th scope="col" className="attendance" ref={input => this.participant = input}>
          <NewParticipant />
        </th>}
        {participants.map((participant) =>
          <th key={participant} ref={input => this.participants.push(input)} scope="col">
            <Participant participant={participant} />
          </th>
        )}
        {participants.length === 0 && <th className="empty"></th>}
      </tr>
    );
  }
}

export default Participants;
