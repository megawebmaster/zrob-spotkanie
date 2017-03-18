import React from 'react';
import Helmet from 'react-helmet';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import MeetingDaysField from './../../containers/CreateMeeting/MeetingDaysField';
import MeetingNameField from './../../containers/CreateMeeting/MeetingNameField';
import MeetingResolutionField from './../../containers/CreateMeeting/MeetingResolutionField';
import MeetingSchedule from './../../containers/CreateMeeting/MeetingSchedule';
import {MeetingSaveButton} from './../../components/MeetingSaveButton';
import {createMeeting} from '../../actions';

import './CreateMeeting.scss';

class CreateMeeting extends React.Component {
  static propTypes = {
    onCreateMeeting: React.PropTypes.func.isRequired
  };

  render(){
    return (
      <div className="CreateMeeting">
        <Helmet title="Utwórz nowe spotkanie" />
        <MeetingNameField />
        <MeetingDaysField></MeetingDaysField>
        <MeetingResolutionField />
        <MeetingSchedule />
        <MeetingSaveButton label="Utwórz spotkanie" onClick={this.props.onCreateMeeting} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  onCreateMeeting: () => dispatch(createMeeting())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateMeeting));
export {CreateMeeting};
