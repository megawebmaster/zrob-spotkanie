import React from 'react';
import Helmet from 'react-helmet';
import Alert from 'react-s-alert';
import moment from 'moment';
import { MeetingTitle } from './../../components/MeetingTitle';
import { MeetingTable } from './../../components/MeetingTable';
import { MeetingSaveButton } from './../../components/MeetingSaveButton';
import './ViewMeeting.scss';

class ViewMeeting extends React.Component {
  state = {
    id: '',
    name: '',
    schedule: [],
    responses: {},
    foldedDays: {},
    currentName: '',
    currentResponse: {},
    participants: [],
    resolution: 60,
    isLoading: true,
  };

  async componentDidMount(){
    let response = await fetch(`${process.env.API_URL}/v1/meetings/${this.props.params.hash}`);
    if (response.status === 404){
      Alert.error('Podane spotkanie nie zostało znalezione w systemie.');
      return this.props.router.push({pathname: '/'});
    }
    if (response.status !== 200){
      let error = await response.json();
      Alert.error(error);
      return new Promise();
    }

    let { hash, name, resolution, days } = await response.json();
    let responses = {};
    let participants = [];

    for (let i in days) {
      if (!days.hasOwnProperty(i)){
        continue;
      }

      let dayResponses = {};
      let day = days[i];
      for (let j in day.hours) {
        if (!day.hours.hasOwnProperty(j)){
          continue;
        }

        let hourResponses = {};
        let hour = day.hours[j] || { answers: [] };
        for (let a in hour.answers) {
          if (!hour.answers.hasOwnProperty(a)){
            continue;
          }

          let answer = hour.answers[a] || { name: '', answer: '' };
          hourResponses[answer.name] = answer.answer;
        }

        if (participants.length === 0) {
          participants = Object.keys(hourResponses);
        }

        dayResponses[hour.hour] = hourResponses;
      }

      let formattedDay = moment(day.day, 'YYYY-MM-DD').format('YYYY.MM.DD');
      responses[formattedDay] = dayResponses;
    }

    this.setState({
      name, participants, responses: responses, id: hash, resolution: parseInt(resolution, 10), schedule: days,
      isLoading: false
    });
  }

  handleNameChange(currentName){
    this.setState({ currentName });
  }

  handleResponseChange(day, hour, answer){
    // TODO: Improve performance - React updates whole page!
    this.setState(state => {
      let { currentResponse } = state;
      let dayResponse = { ...currentResponse[day], [hour]: answer };
      let response = { ...currentResponse, [day]: dayResponse };
      return { currentResponse: response };
    });
  }

  handleDayFolding(day, isFolded) {
    let { foldedDays } = this.state;
    this.setState({ foldedDays: { ...foldedDays, [day]: isFolded } });
  }

  isResponseComplete() {
    let { currentResponse, schedule, resolution } = this.state;

    for (let k in schedule) {
      if (!schedule.hasOwnProperty(k)) {
        continue;
      }
      let day = moment(schedule[k].day).format('YYYY.MM.DD');
      if (!currentResponse.hasOwnProperty(day)) {
        return false;
      }

      let from = moment(schedule[k].from, 'HH:mm');
      let to = moment(schedule[k].to, 'HH:mm');
      for (let i = from; i.isBefore(to); i.add(resolution, 'minutes')) {
        let hour = i.format('HH:mm');
        if (!currentResponse[day].hasOwnProperty(hour) || currentResponse[day][hour] === '') {
          return false;
        }
      }
    }

    return true;
  }

  isProperlyFilled() {
    let { currentName } = this.state;

    return currentName !== undefined && currentName.length > 0 && this.isResponseComplete();
  }

  async saveResponses(){
    let { id, currentName, currentResponse, responses, participants } = this.state;

    let result = await fetch(`${process.env.API_URL}/v1/meetings/${id}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: currentName,
        response: currentResponse
      })
    });

    if (result.status === 500) {
      Alert.error('Wystąpił błąd serwera. Prosimy spróbować później.');
      return new Promise();
    }
    if (result.status !== 201) {
      let error = await result.json();
      Alert.error(error);
      return new Promise();
    }

    for (let day in currentResponse) {
      if (!currentResponse.hasOwnProperty(day)) {
        continue;
      }

      for (let hour in currentResponse[day]) {
        if (!currentResponse[day].hasOwnProperty(hour)) {
          continue;
        }

        responses[day][hour] = { ...responses[day][hour], [currentName]: currentResponse[day][hour] };
      }
    }

    this.setState({
      responses,
      participants: [...participants, currentName],
      currentName: '',
      currentResponse: {},
      foldedDays: {}
    });
    Alert.success('Twoje odpowiedzi zostały zapisane!');
    // TODO: Properly behave when more than 15 people are added (kind of stretching? or maybe scrolling?)
  }

  hasNewMeeting(){
    let hash = localStorage.getItem('newly_created_event');

    if (hash === null) {
      return false;
    }

    let { id } = this.state;
    if (id !== hash) {
      this.removeNewMeeting();
      return false;
    }

    return true;
  }

  removeNewMeeting() {
    localStorage.removeItem('newly_created_event');
    this.setState({});
  }

  render() {
    let {
      name, resolution, schedule, responses, participants, currentName, currentResponse, foldedDays, isLoading
    } = this.state;

    return (
      <div className="ViewMeeting">
        <Helmet title={name} />
        {isLoading && <i className="fa fa-spin fa-spinner fa-pulse fa-3x fa-fw"></i>}
        {isLoading === false && <div>
          {this.hasNewMeeting() && <p className="alert alert-dismissible alert-success">
            Twoje spotkanie zostało utworzone. Skopiuj adres do spotkania i wyślij go zaproszonym osobom!
            <button type="button" className="close" aria-label="Zamknij" onClick={() => this.removeNewMeeting()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </p>}
          <MeetingTitle title={name} />
          <MeetingTable schedule={schedule} resolution={resolution} participants={participants} responses={responses}
                        currentName={currentName} foldedDays={foldedDays} onNameChange={this.handleNameChange.bind(this)}
                        currentResponse={currentResponse} onResponseChange={this.handleResponseChange.bind(this)}
                        onFold={this.handleDayFolding.bind(this)} />
          <MeetingSaveButton enabled={this.isProperlyFilled()} label="Zapisz moje odpowiedzi"
                             onClick={this.saveResponses.bind(this)} />
        </div>}
      </div>
    );
  }
}

export default ViewMeeting;
