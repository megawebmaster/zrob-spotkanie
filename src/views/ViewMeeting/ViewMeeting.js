import React from 'react';
import moment from 'moment';
import { MeetingTitle } from './../../components/MeetingTitle';
import { MeetingTable } from './../../components/MeetingTable';
import { MeetingSaveButton } from './../../components/MeetingSaveButton';
import './ViewMeeting.scss';

class ViewMeeting extends React.Component {
  state = {
    id: '1ae3bfc',
    name: 'Testowe spotkanie 1 - sprzedaż Q3',
    schedule: [
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
    ],
    responses: {
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
    },
    foldedDays: {},
    currentName: '',
    currentResponse: {},
    participants: [
      'Piotr', 'Jakub', 'Magda', 'Edyta', 'Karolina'
    ],
    resolution: 60
  };

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
    let { name, resolution, schedule, responses, participants, currentName, currentResponse, foldedDays } = this.state;

    return (
      <div className="ViewMeeting">
        <MeetingTitle title={name} />
        <MeetingTable schedule={schedule} resolution={resolution} participants={participants} responses={responses}
                      currentName={currentName} foldedDays={foldedDays} onNameChange={this.handleNameChange.bind(this)}
                      currentResponse={currentResponse} onResponseChange={this.handleResponseChange.bind(this)}
                      onFold={this.handleDayFolding.bind(this)} />
        <MeetingSaveButton enabled={this.isProperlyFilled()} label="Zapisz moje odpowiedzi"
                           onClick={this.saveResponses.bind(this)} />
      </div>
    );
  }
}

export default ViewMeeting;
