import React from 'react';

class MeetingResolutionField extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    errors: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    let {value, errors} = this.props;

    return (
      <div className={"MeetingResolutionField form-group clearfix" + (errors.length > 0 ? ' has-danger' : '')}>
        <label htmlFor="meeting-resolution" className="col-form-label col-xs-3">Czas</label>
        <div className="col-xs-4 small-padding">
          <select value={value} onChange={this.onChange.bind(this)} id="meeting-resolution"
                  className="form-control">
            <option value="60">co godzinę</option>
            <option value="30">co pół godziny</option>
            <option value="15">co 15 minut</option>
          </select>
          {errors.length > 0 &&
          <div className="form-control-feedback">{errors.join(', ')}</div>
          }
        </div>
        <div className="col-xs-5">
          <p className="col-form-label">do wyboru</p>
        </div>
      </div>
    );
  }
}

export default MeetingResolutionField;
