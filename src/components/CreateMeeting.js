import React, { Component } from 'react';
import { DateUtils } from "react-day-picker";
import MeetingDaysField from './MeetingDaysField';
import MeetingNameField from './MeetingNameField';
import MeetingResolutionField from './MeetingResolutionField';
import MeetingSchedule from './MeetingSchedule';
import MeetingCreateButton from './MeetingCreateButton';
import './CreateMeeting.scss';

class CreateMeeting extends Component {
  state = {
    name: '',
    schedule: [],
    resolution: '60'
  };

  handleNameChange(name) {
    this.setState({ name });
  }

  handleResolutionChange(resolution) {
    this.setState({ resolution });
  }

  handleDayChange(isSelected, day) {
    let { schedule } = this.state;
    if(isSelected){
      // TODO: Using Redux it will need to be properly immutable
      let index = schedule.findIndex((d) => DateUtils.isSameDay(d.day, day))
      schedule.splice(index, 1);
      this.setState({ schedule });
    } else {
      this.setState({
        schedule: [...schedule, { day }]
      });
    }
  }

  handleSchedule(event, from, to) {
    let { schedule } = this.state;
    let index = schedule.findIndex((d) => DateUtils.isSameDay(d.day, event.day))
    schedule[index] = { ...event, from, to };
    this.setState({ schedule });
  }

  isProperlyFilled() {
    let isDefined = (value) => value !== undefined && value.length > 0;
    let isCorrect = (from, to) => parseInt(from, 10) < parseInt(to, 10);
    return this.state.schedule
        .map(event => !isDefined(event.from) || !isDefined(event.to) || !isCorrect(event.from, event.to))
        .filter(i => i)
        .length === 0;
  }

  render() {
    let { name, resolution, schedule } = this.state;
    let days = schedule.map(event => event.day);
    return (
      <div className="CreateMeeting">
        <MeetingNameField value={name} onChange={this.handleNameChange.bind(this)} />
        <MeetingDaysField days={days} onDayChange={this.handleDayChange.bind(this)}>
          <p>Reklama?</p>
        </MeetingDaysField>
        <MeetingResolutionField value={resolution} onChange={this.handleResolutionChange.bind(this)} />
        <MeetingSchedule schedule={schedule} onDayRemove={this.handleDayChange.bind(this, true)}
                         onUpdateSchedule={this.handleSchedule.bind(this)} />
        <MeetingCreateButton enabled={this.isProperlyFilled()} />
      </div>
    );
  }
}

export default CreateMeeting;
