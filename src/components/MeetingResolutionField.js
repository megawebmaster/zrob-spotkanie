import React, { Component } from 'react';

class MeetingResolutionField extends Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div className="MeetingResolutionField form-group clearfix">
        <label htmlFor="meeting-resolution" className="col-form-label col-xs-3">Czas</label>
        <div className="col-xs-4">
          <select value={this.props.value} onChange={this.onChange.bind(this)} id="meeting-resolution"
                  className="form-control">
            <option value="60">co godzinę</option>
            <option value="30">co pół godziny</option>
            <option value="15">co 15 minut</option>
          </select>
        </div>
        <div className="col-xs-5">
          <p className="col-form-label">do wyboru</p>
        </div>
      </div>
    );
  }
}

export default MeetingResolutionField;
