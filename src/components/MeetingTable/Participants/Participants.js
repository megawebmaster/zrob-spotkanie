import React from 'react';
import { Participant } from './Participant';
import { NewParticipant } from './NewParticipant';
import './Participants.scss';

class Participants extends React.Component {
  static propTypes = {
    participants: React.PropTypes.array.isRequired,
    currentName: React.PropTypes.string.isRequired,
    onNameChange: React.PropTypes.func.isRequired,
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
    let top = maxHeight + this.participant.offsetHeight / 4;
    this.title.style.top = top + 'px';
    this.participant.style.top = top + 'px';
  }

  render(){
    let { participants, currentName, onNameChange } = this.props;
    // TODO: Hide new participant after answering
    return (
      <tr className="Participants">
        <th scope="col" className="title" ref={input => this.title = input}><p>Uczestnicy:</p></th>
        <th scope="col" className="attendance" ref={input => this.participant = input}>
          <NewParticipant name={currentName} onNameChange={onNameChange} />
        </th>
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
