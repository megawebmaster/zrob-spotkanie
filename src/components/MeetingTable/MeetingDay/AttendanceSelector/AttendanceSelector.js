import React from 'react';
import './AttendanceSelector.scss';

class AttendanceSelector extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  render(){
    let { value, onChange } = this.props;
    return (
      <div className="AttendanceSelector">
        <div className="btn-group" role="group" aria-label="Obecność">
          <button className={"btn btn-success " + (value === 'yes' ? 'active' : '')} type="button"
                  onClick={() => onChange('yes')}>
            <i className="fa fa-fw fa-check"></i><span className="sr-only">Tak, mogę</span>
          </button>
          <button className={"btn btn-warning " + (value === 'maybe' ? 'active' : '')} type="button"
                  onClick={() => onChange('maybe')}>
            <i className="fa fa-fw fa-question"></i><span className="sr-only">Nie wiem</span>
          </button>
          <button className={"btn btn-danger " + (value === 'no' ? 'active' : '')} type="button"
                  onClick={() => onChange('no')}>
            <i className="fa fa-fw fa-times"></i><span className="sr-only">Nie, nie mogę</span>
          </button>
        </div>
      </div>
    );
  }
}
export default AttendanceSelector;