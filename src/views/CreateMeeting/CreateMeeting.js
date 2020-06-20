import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';

import MeetingDaysField from './../../containers/CreateMeeting/MeetingDaysField';
import MeetingNameField from './../../containers/CreateMeeting/MeetingNameField';
import MeetingResolutionField from './../../containers/CreateMeeting/MeetingResolutionField';
import MeetingSchedule from './../../containers/CreateMeeting/MeetingSchedule';
import {MeetingSaveButton} from './../../components/MeetingSaveButton';
import {createMeeting} from '../../actions';

import './CreateMeeting.scss';

class CreateMeeting extends React.Component {
  static propTypes = {
    onCreateMeeting: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  render(){
    return (
      <div className="CreateMeeting">
        <Helmet title={this.props.intl.formatMessage({id: 'createMeeting.title', defaultMessage: 'Utwórz nowe spotkanie'})} />
        <MeetingNameField />
        <MeetingDaysField />
        <MeetingResolutionField />
        <MeetingSchedule />
        <MeetingSaveButton onClick={this.props.onCreateMeeting}>
          <FormattedMessage id="createMeeting.button" defaultMessage="Utwórz spotkanie" />
        </MeetingSaveButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  onCreateMeeting: () => dispatch(createMeeting())
});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateMeeting)));
export {CreateMeeting};
