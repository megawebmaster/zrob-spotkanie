import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';

class MeetingNameField extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    errors: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    intl: React.PropTypes.object.isRequired,
  };

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    let {intl, value, errors} = this.props;

    return (
      <div className={"MeetingNameField form-group clearfix" + (errors.length > 0 ? ' has-danger' : '')}>
        <label htmlFor="meeting-name" className="col-form-label col-xs-3">
          <FormattedMessage id="createMeeting.name" />
        </label>
        <div className="col-xs-9 small-padding">
          <input type="text" id="meeting-name" className="form-control" value={value}
                 onChange={this.onChange.bind(this)}
                 placeholder={intl.formatMessage({id: 'createMeeting.namePlaceholder'})} />
          {errors.length > 0 &&
          <div className="form-control-feedback">{errors.join(', ')}</div>
          }
        </div>
      </div>
    );
  }
}

export default injectIntl(MeetingNameField);
