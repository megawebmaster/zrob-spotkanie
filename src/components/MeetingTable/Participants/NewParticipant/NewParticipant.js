import React from 'react';
import './NewParticipant.scss';

class NewParticipant extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    onNameChange: React.PropTypes.func.isRequired,
  };

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render(){
    let { name } = this.props;
    return (
      <div className="NewParticipant">
        <input type="text" className="form-control" placeholder="Podaj swoje imię…" value={name}
               onChange={this.handleNameChange.bind(this)}/>
      </div>
    );
  }
}
export default NewParticipant;
