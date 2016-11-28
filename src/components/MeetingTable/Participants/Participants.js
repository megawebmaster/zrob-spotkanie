import React from 'react';
import { Participant } from './Participant';
import { NewParticipant } from './NewParticipant';
import './Participants.scss';

class Participants extends React.Component {
  static propTypes = {
    participants: React.PropTypes.array.isRequired,
  };

  render(){
    let {participants} = this.props;
    return (
      <div className="Participants">
        <div className="title"><p>Uczestnicy:</p></div>
        <NewParticipant />
        {participants.map(participant => <Participant key={participant} participant={participant} />)}
      </div>
    );
  }
}

export default Participants;
