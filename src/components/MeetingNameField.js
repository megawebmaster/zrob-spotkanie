import React, { Component } from 'react';

class MeetingNameField extends Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div className="MeetingNameField form-group clearfix">
        <label htmlFor="meeting-name" className="col-form-label col-xs-3">Podaj nazwę</label>
        <div className="col-xs-9">
          <input type="text" id="meeting-name" className="form-control" value={this.props.value}
                 onChange={this.onChange.bind(this)} placeholder="np. Podsumowanie sprzedaży Q3" />
        </div>
      </div>
    );
  }
}

export default MeetingNameField;
