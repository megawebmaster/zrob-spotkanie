import React from 'react';
import moment from 'moment';
import { MeetingTitle } from './../../components/MeetingTitle';
import { MeetingTable } from './../../components/MeetingTable';
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
    },
    participants: [
      'Piotr', 'Jakub', 'Magda', 'Edyta', 'Karolina'
    ],
    resolution: 60
  };

  render() {
    let { name, resolution, schedule, responses, participants } = this.state;
    return (
      <div className="ViewMeeting">
        <MeetingTitle title={name} />
        <MeetingTable schedule={schedule} resolution={resolution} participants={participants} responses={responses} />
      </div>
    );
  }
}

export default ViewMeeting;
