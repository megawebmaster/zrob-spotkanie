import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from 'react-intl';

class MeetingNameField extends React.Component {
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
      <div className={"MeetingNameField form-group form-row" + (errors.length > 0 ? ' has-danger' : '')}>
        <label htmlFor="meeting-name" className="col-form-label col-sm-3">
          <FormattedMessage id="createMeeting.name" defaultMessage="Podaj nazwę" />
        </label>
        <div className="col-sm-9">
          <input type="text" id="meeting-name" className="form-control" value={value}
                 onChange={this.onChange.bind(this)}
                 placeholder={intl.formatMessage({id: 'createMeeting.namePlaceholder', defaultMessage: 'np. Podsumowanie sprzedaży Q3'})} />
          {errors.length > 0 &&
          <div className="form-control-feedback">{errors.join(', ')}</div>
          }
        </div>
      </div>
    );
  }
}

export default injectIntl(MeetingNameField);
