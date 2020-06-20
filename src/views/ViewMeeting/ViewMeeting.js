import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import MeetingTitle from './../../containers/ViewMeeting/MeetingTitle';
import MeetingTable from './../../containers/ViewMeeting/MeetingTable';
import {MeetingSaveButton} from './../../components/MeetingSaveButton';
import {meetingFetch, saveResponse, addNewResponse} from '../../actions';
import './ViewMeeting.scss';

class ViewMeeting extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    meeting: PropTypes.object.isRequired,
    showForm: PropTypes.bool.isRequired,
    fetchMeeting: PropTypes.func.isRequired,
    addNewResponse: PropTypes.func.isRequired,
    onSaveResponse: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  componentDidMount(){
    this.props.fetchMeeting(this.props.params.hash);
  }

  hasNewMeeting(){
    let hash = localStorage.getItem('newly_created_event');

    if(hash === null){
      return false;
    }

    if(this.props.meeting.hash !== hash){
      this.removeNewMeeting();
      return false;
    }

    return true;
  }

  removeNewMeeting(){
    localStorage.removeItem('newly_created_event');
  }

  render(){
    let {isLoading, meeting, showForm, onSaveResponse, addNewResponse} = this.props;
    let format = (id, message) => this.props.intl.formatMessage({id, defaultMessage: message});

    return (
      <div className="ViewMeeting">
        <Helmet title={meeting.name} />
        {isLoading && <i className="fa fa-spin fa-spinner fa-pulse fa-3x fa-fw"></i>}
        {isLoading === false && <div>
          {this.hasNewMeeting() && <p className="alert alert-dismissible alert-success">
            {format('viewMeeting.meetingCreated', 'Twoje spotkanie zostało utworzone. Skopiuj adres do spotkania i wyślij go zaproszonym osobom!')}
            <button type="button" className="close" aria-label={format('viewMeeting.close', 'Zamknij')}
                    onClick={this.removeNewMeeting}>
              <span aria-hidden="true">&times;</span>
            </button>
          </p>}
          <MeetingTitle />
          <MeetingTable />
          {showForm && <MeetingSaveButton onClick={onSaveResponse}>{format('viewMeeting.saveAnswers', 'Zapisz moje odpowiedzi')}</MeetingSaveButton>}
          {!showForm && <MeetingSaveButton onClick={addNewResponse}>{format('viewMeeting.newAnswer', 'Dodaj kolejną odpowiedź')}</MeetingSaveButton>}
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.viewMeeting.isLoading,
  meeting: state.viewMeeting.meeting,
  showForm: !state.viewMeeting.response.hasResponded,
});
const mapDispatchToProps = (dispatch) => ({
  fetchMeeting: (hash) => dispatch(meetingFetch(hash)),
  onSaveResponse: () => dispatch(saveResponse()),
  addNewResponse: () => dispatch(addNewResponse())
});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewMeeting)));
export {ViewMeeting};
