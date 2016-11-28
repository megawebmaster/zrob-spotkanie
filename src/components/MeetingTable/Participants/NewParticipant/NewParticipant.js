import React from 'react';
import './NewParticipant.scss';

class NewParticipant extends React.Component {
  static propTypes = {
  };

  render(){
    return (
      <div className="NewParticipant">
        <input type="text" className="form-control" placeholder="Podaj swoje imię…" />
      </div>
    );
  }
}
export default NewParticipant;
