import React from 'react';
import {withRouter} from 'react-router';
import {DateUtils} from 'react-day-picker';
import {MeetingDaysField} from './../../components/MeetingDaysField';
import {MeetingNameField} from './../../components/MeetingNameField';
import {MeetingResolutionField} from './../../components/MeetingResolutionField';
import {MeetingSchedule} from './../../components/MeetingSchedule';
import {MeetingSaveButton} from './../../components/MeetingSaveButton';
import './CreateMeeting.scss';

class CreateMeeting extends React.Component {
  state = {
    name: '',
    visibleMonth: new Date(),
    schedule: [],
    resolution: '60'
  };

  handleNameChange(name){
    this.setState({name});
  }

  handleResolutionChange(resolution){
    this.setState({resolution});
  }

  handleDayChange(isSelected, day){
    let {schedule} = this.state;
    if(isSelected){
      // TODO: Using Redux it will need to be properly immutable
      let index = schedule.findIndex((d) => DateUtils.isSameDay(d.day, day));
      schedule.splice(index, 1);
      this.setState({schedule});
    } else {
      this.setState({
        schedule: [...schedule, {day}]
      });
    }
  }

  handleMonthChange(month){
    this.setState({visibleMonth: month});
  }

  handleSchedule(event, from, to){
    let {schedule} = this.state;
    let index = schedule.findIndex((d) => DateUtils.isSameDay(d.day, event.day));
    schedule[index] = {...event, from, to};
    this.setState({schedule});
  }

  isProperlyFilled(){
    let isDefined = (value) => value !== undefined && value.length > 0;
    let isCorrect = (from, to) => parseInt(from, 10) < parseInt(to, 10);
    let {name, schedule} = this.state;
    return name !== undefined && name.length > 0 && schedule.length > 0 &&
      schedule.map(event => !isDefined(event.from) || !isDefined(event.to) || !isCorrect(event.from, event.to))
        .filter(i => i)
        .length === 0;
  }

  async saveMeeting(){
    let {name, schedule, resolution} = this.state;
    let response = await fetch('http://localhost:8000/v1/meetings', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        resolution,
        schedule
      })
    });
    let meeting = await response.json();
    this.props.router.push({pathname: `/view/${meeting.hash}`});
  }

  render(){
    let {name, resolution, schedule, visibleMonth} = this.state;
    let days = schedule.map(event => event.day);
    return (
      <div className="CreateMeeting">
        <MeetingNameField value={name} onChange={this.handleNameChange.bind(this)} />
        <MeetingDaysField days={days} month={visibleMonth} onDayChange={this.handleDayChange.bind(this)}
                          onMonthChange={this.handleMonthChange.bind(this)}>
          <p>Reklama?</p>
        </MeetingDaysField>
        <MeetingResolutionField value={resolution} onChange={this.handleResolutionChange.bind(this)} />
        <MeetingSchedule schedule={schedule} onDayRemove={this.handleDayChange.bind(this, true)}
                         onUpdateSchedule={this.handleSchedule.bind(this)} />
        <MeetingSaveButton enabled={this.isProperlyFilled()} label="Utwórz spotkanie"
                           onClick={this.saveMeeting.bind(this)} />
      </div>
    );
  }
}

export default withRouter(CreateMeeting);
export { CreateMeeting };
