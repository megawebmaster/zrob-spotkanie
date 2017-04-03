import React from 'react';
import './NewParticipant.scss';

class NewParticipant extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    error: React.PropTypes.array,
    onNameChange: React.PropTypes.func.isRequired,
  };

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render(){
    let { name, error } = this.props;

    return (
      <div className={"form-group" + (error.length > 0 ? ' has-danger' : '')}>
        <input type="text" className="form-control NewParticipant" placeholder="Podaj imię…" value={name} autoFocus
               onChange={this.handleNameChange.bind(this)}/>
      </div>
    );
  }
}
export default NewParticipant;
