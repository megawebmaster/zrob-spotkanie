import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from 'react-intl';

class MeetingResolutionField extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    errors: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    let {intl, value, errors} = this.props;

    return (
      <div className={"MeetingResolutionField form-group form-row" + (errors.length > 0 ? ' has-danger' : '')}>
        <label htmlFor="meeting-resolution" className="col-form-label col-sm-3">
          <FormattedMessage id="createMeeting.resolution" defaultMessage="Czas" />
        </label>
        <div className="col-sm-4">
          <select value={value} onChange={this.onChange.bind(this)} id="meeting-resolution"
                  className="form-control">
            <option value="60">
              {intl.formatMessage({id: 'createMeeting.resolutionOption60', defaultMessage: 'co godzinę'})}
            </option>
            <option value="30">
              {intl.formatMessage({id: 'createMeeting.resolutionOption30', defaultMessage: 'co pół godziny'})}
            </option>
            <option value="15">
              {intl.formatMessage({id: 'createMeeting.resolutionOption15', defaultMessage: 'co 15 minut'})}
            </option>
          </select>
          {errors.length > 0 &&
          <div className="form-control-feedback">{errors.join(', ')}</div>
          }
        </div>
        <div className="col-sm-5">
          <p className="col-form-label">
            <FormattedMessage id="createMeeting.resolutionSuffix" defaultMessage="do wyboru" />
          </p>
        </div>
      </div>
    );
  }
}

export default injectIntl(MeetingResolutionField);
