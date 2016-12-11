import React from 'react';
import moment from 'moment';
import { MeetingTitle } from './../../components/MeetingTitle';
import { MeetingTable } from './../../components/MeetingTable';
import { MeetingSaveButton } from './../../components/MeetingSaveButton';
import './ViewMeeting.scss';

/*
*
 '2017.02.28': {
 '08:00': {
 'Piotr': 'yes',
 'Jakub': 'no',
 'Magda': 'maybe',
 'Edyta': 'maybe',
 'Karolina': 'yes',
 },
 '09:00': {
 'Piotr': 'yes',
 'Jakub': 'yes',
 'Magda': 'yes',
 'Edyta': 'yes',
 'Karolina': 'yes',
 },
 '10:00': {
 'Piotr': 'yes',
 'Jakub': 'yes',
 'Magda': 'yes',
 'Edyta': 'no',
 'Karolina': 'yes',
 },
 '11:00': {
 'Piotr': 'maybe',
 'Jakub': 'no',
 'Magda': 'maybe',
 'Edyta': 'no',
 'Karolina': 'yes',
 },
 },
 '2017.03.01': {
 '08:00': {
 'Piotr': 'yes',
 'Jakub': 'maybe',
 'Magda': 'maybe',
 'Edyta': 'maybe',
 'Karolina': 'yes',
 },
 '09:00': {
 'Piotr': 'yes',
 'Jakub': 'yes',
 'Magda': 'yes',
 'Edyta': 'yes',
 'Karolina': 'yes',
 },
 '10:00': {
 'Piotr': 'yes',
 'Jakub': 'yes',
 'Magda': 'yes',
 'Edyta': 'no',
 'Karolina': 'yes',
 },
 '11:00': {
 'Piotr': 'maybe',
 'Jakub': 'no',
 'Magda': 'maybe',
 'Edyta': 'no',
 'Karolina': 'yes',
 },
 },

 {
 day: moment('2017.02.28', 'YYYY.MM.DD').toDate(),
 from: 8,
 to: 11
 },
 {
 day: moment('2017.03.01', 'YYYY.MM.DD').toDate(),
 from: 8,
 to: 11
 }
 Testowe spotkanie 1 - sprzedaż Q3
 1ae3bfc
 'Piotr', 'Jakub', 'Magda', 'Edyta', 'Karolina'
 * */
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
    let response = await fetch(`http://localhost:8000/v1/meetings/${this.props.params.hash}`);
    let { hash, name, resolution, days } = await response.json();
    let responses = {};
    let participants = [];

    for (let i in days) {
      if (!days.hasOwnProperty(i)){
        continue;
      }

      let dayResponses = {};
      for (let j in days[i].hours) {
        if (!days[i].hours.hasOwnProperty(j)){
          continue;
        }

        let hourResponses = {}
        for (let a in days[i].hours[j].answers) {
          if (!days[i].hours[j].answers.hasOwnProperty(a)){
            continue;
          }

          hourResponses[days[i].hours[j].answers[a].name] = days[i].hours[j].answers[a].answer;
        }

        if (participants.length === 0) {
          participants = Object.keys(hourResponses);
        }

        dayResponses[days[i].hours[j].hour] = hourResponses;
      }

      let day = moment(days[i].day, 'YYYY-MM-DD').format('YYYY.MM.DD');
      responses[day] = dayResponses;
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
      for (let i = from; i.isSameOrBefore(to); i.add(resolution, 'minutes')) {
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

  saveResponses(){
    let { currentName, currentResponse, responses, participants } = this.state;

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
    // TODO: Properly behave when more than 15 people are added (kind of stretching? or maybe scrolling?)
  }

  render() {
    let {
      name, resolution, schedule, responses, participants, currentName, currentResponse, foldedDays, isLoading
    } = this.state;

    return (
      <div className="ViewMeeting">
        {isLoading && <i className="fa fa-spin fa-spinner fa-pulse fa-3x fa-fw"></i>}
        {isLoading === false && <div>
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
