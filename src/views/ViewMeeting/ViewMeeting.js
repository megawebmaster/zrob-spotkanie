import React from 'react';
import Helmet from 'react-helmet';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import MeetingTitle from './../../containers/ViewMeeting/MeetingTitle';
import MeetingTable from './../../containers/ViewMeeting/MeetingTable';
import {MeetingSaveButton} from './../../components/MeetingSaveButton';
import {meetingFetch, saveResponse, addNewResponse} from '../../actions';
import './ViewMeeting.scss';

class ViewMeeting extends React.Component {
  static propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    meeting: React.PropTypes.object.isRequired,
    showForm: React.PropTypes.bool.isRequired,
    fetchMeeting: React.PropTypes.func.isRequired,
    addNewResponse: React.PropTypes.func.isRequired,
    onSaveResponse: React.PropTypes.func.isRequired,
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
    // TODO: Translate with Intl
    let {isLoading, meeting, showForm, onSaveResponse, addNewResponse} = this.props;

    return (
      <div className="ViewMeeting">
        <Helmet title={meeting.name} />
        {isLoading && <i className="fa fa-spin fa-spinner fa-pulse fa-3x fa-fw"></i>}
        {isLoading === false && <div>
          {this.hasNewMeeting() && <p className="alert alert-dismissible alert-success">
            Twoje spotkanie zostało utworzone. Skopiuj adres do spotkania i wyślij go zaproszonym osobom!
            <button type="button" className="close" aria-label="Zamknij" onClick={this.removeNewMeeting}>
              <span aria-hidden="true">&times;</span>
            </button>
          </p>}
          <MeetingTitle />
          <MeetingTable />
          {showForm && <MeetingSaveButton onClick={onSaveResponse}>Zapisz moje odpowiedzi</MeetingSaveButton>}
          {!showForm && <MeetingSaveButton onClick={addNewResponse}>Dodaj kolejną odpowiedź</MeetingSaveButton>}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewMeeting));
export {ViewMeeting};
