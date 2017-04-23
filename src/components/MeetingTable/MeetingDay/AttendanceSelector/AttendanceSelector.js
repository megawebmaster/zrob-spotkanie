import React from 'react';
import {injectIntl} from 'react-intl';
import './AttendanceSelector.scss';

class AttendanceSelector extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    intl: React.PropTypes.object.isRequired,
  };

  render(){
    let { value, error, onChange } = this.props;
    let isActive = (type) => {
      return value === '' || value === type ? '' : ' inactive';
    };
    let format = (id, message) => this.props.intl.formatMessage({id, defaultMessage: message});

    return (
      <div className={"AttendanceSelector" + (value === '' ? ' not-selected' : '')}>
        <div className={"btn-group" + (error && error.length > 0 ? ' has-error' : '')} role="group"
             aria-label={format('viewMeeting.attendance', 'Obecność')}>
          <button className={"btn btn-success" + isActive('yes')} type="button"
                  onClick={() => onChange('yes')} >
            <i className="fa fa-fw fa-check"></i>
            <span className="sr-only">
              {format('viewMeeting.attendance.yes', 'Tak, mogę')}
            </span>
          </button>
          <button className={"btn btn-warning" + isActive('maybe')} type="button"
                  onClick={() => onChange('maybe')}>
            <i className="fa fa-fw fa-question"></i>
            <span className="sr-only">
              {format('viewMeeting.attendance.maybe', 'Nie wiem')}
            </span>
          </button>
          <button className={"btn btn-danger" + isActive('no')} type="button"
                  onClick={() => onChange('no')}>
            <i className="fa fa-fw fa-times"></i>
            <span className="sr-only">
              {format('viewMeeting.attendance.no', 'Nie, nie mogę')}
            </span>
          </button>
        </div>
      </div>
    );
  }
}
export default injectIntl(AttendanceSelector);
