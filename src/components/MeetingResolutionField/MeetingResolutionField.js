import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';

class MeetingResolutionField extends React.Component {
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
      <div className={"MeetingResolutionField form-group clearfix" + (errors.length > 0 ? ' has-danger' : '')}>
        <label htmlFor="meeting-resolution" className="col-form-label col-xs-3">
          <FormattedMessage id="createMeeting.resolution" />
        </label>
        <div className="col-xs-4 small-padding">
          <select value={value} onChange={this.onChange.bind(this)} id="meeting-resolution"
                  className="form-control">
            <option value="60">{intl.formatMessage({id: 'createMeeting.resolutionOption60'})}</option>
            <option value="30">{intl.formatMessage({id: 'createMeeting.resolutionOption30'})}</option>
            <option value="15">{intl.formatMessage({id: 'createMeeting.resolutionOption15'})}</option>
          </select>
          {errors.length > 0 &&
          <div className="form-control-feedback">{errors.join(', ')}</div>
          }
        </div>
        <div className="col-xs-5">
          <p className="col-form-label"><FormattedMessage id="createMeeting.resolutionSuffix" /></p>
        </div>
      </div>
    );
  }
}

export default injectIntl(MeetingResolutionField);
