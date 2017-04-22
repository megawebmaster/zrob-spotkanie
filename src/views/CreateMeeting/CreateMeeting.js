import React from 'react';
import Helmet from 'react-helmet';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';

import MeetingDaysField from './../../containers/CreateMeeting/MeetingDaysField';
import MeetingNameField from './../../containers/CreateMeeting/MeetingNameField';
import MeetingResolutionField from './../../containers/CreateMeeting/MeetingResolutionField';
import MeetingSchedule from './../../containers/CreateMeeting/MeetingSchedule';
import {MeetingSaveButton} from './../../components/MeetingSaveButton';
import {createMeeting} from '../../actions';

import './CreateMeeting.scss';

class CreateMeeting extends React.Component {
  static propTypes = {
    onCreateMeeting: React.PropTypes.func.isRequired,
    intl: React.PropTypes.object.isRequired,
  };

  render(){
    return (
      <div className="CreateMeeting">
        <Helmet title={this.props.intl.formatMessage({id: 'createMeeting.title'})} />
        <MeetingNameField />
        <MeetingDaysField></MeetingDaysField>
        <MeetingResolutionField />
        <MeetingSchedule />
        <MeetingSaveButton label="createMeeting.button" onClick={this.props.onCreateMeeting} />
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
