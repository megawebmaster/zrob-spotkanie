import React from 'react';
import './Participant.scss';

class Participant extends React.Component {
  static propTypes = {
    participant: React.PropTypes.string.isRequired,
  };

  render(){
    let {participant} = this.props;
    return (
      <div className="Participant">{participant}</div>
    );
  }
}
export default Participant;
