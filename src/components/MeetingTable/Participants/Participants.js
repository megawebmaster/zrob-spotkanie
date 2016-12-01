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

  render(){
    let { participants, currentName, onNameChange } = this.props;
    return (
      <div className="Participants">
        <div className="title"><p>Uczestnicy:</p></div>
        <NewParticipant name={currentName} onNameChange={onNameChange} />
        {participants.map(participant => <Participant key={participant} participant={participant} />)}
      </div>
    );
  }
}

export default Participants;
