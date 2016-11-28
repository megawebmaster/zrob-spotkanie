import React from 'react';
import './AttendanceSelector.scss';

class AttendanceSelector extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
  };

  render(){
    let {value} = this.props;
    return (
      <div className="AttendanceSelector">
        <div className="btn-group" role="group" aria-label="Obecność">
          <button className="btn btn-success" type="button" checked={value === 'yes'}>
            <i className="fa fa-fw fa-check"></i><span className="sr-only">Tak, mogę</span>
          </button>
          <button className="btn btn-warning" type="button" checked={value === 'maybe'}>
            <i className="fa fa-fw fa-question"></i><span className="sr-only">Nie wiem</span>
          </button>
          <button className="btn btn-danger" type="button" checked={value === 'no'}>
            <i className="fa fa-fw fa-times"></i><span className="sr-only">Nie, nie mogę</span>
          </button>
        </div>
      </div>
    );
  }
}
export default AttendanceSelector;
