import React from 'react';
import Helmet from 'react-helmet';
import {withRouter} from 'react-router';
import {DateUtils} from 'react-day-picker';
import Alert from 'react-s-alert';
import moment from 'moment';
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
    let isCorrect = (from, to, resolution) => {
      let fromMoment = moment(from, 'HH:mm');
      let toMoment = moment(to, 'HH:mm');
      if(!fromMoment.isBefore(toMoment, 'minute')){
        return false;
      }

      return fromMoment.isSameOrBefore(toMoment.subtract(resolution, 'minutes'), 'minute');
    };

    let {name, schedule, resolution} = this.state;
    return name !== undefined && name.length > 0 && schedule.length > 0 &&
      schedule.map(event => !isDefined(event.from) || !isDefined(event.to) || !isCorrect(event.from, event.to, resolution))
        .filter(i => i)
        .length === 0;
  }

  async saveMeeting(){
    let {name, schedule, resolution} = this.state;
    let response = await fetch(`${process.env.API_URL}/v1/meetings`, {
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
    if(response.status !== 201){
      let error = await response.json();
      Alert.error(error);
    } else {
      let meeting = await response.json();
      localStorage.setItem('newly_created_event', meeting.hash);
      this.props.router.push({pathname: `/view/${meeting.hash}`});
    }
  }

  render(){
    let {name, resolution, schedule, visibleMonth} = this.state;
    let days = schedule.map(event => event.day);
    return (
      <div className="CreateMeeting">
        <Helmet title="Utwórz nowe spotkanie" />
        <MeetingNameField value={name} onChange={this.handleNameChange.bind(this)} />
        <MeetingDaysField days={days} month={visibleMonth} onDayChange={this.handleDayChange.bind(this)}
                          onMonthChange={this.handleMonthChange.bind(this)}>
          <p>Reklama?</p>
        </MeetingDaysField>
        <MeetingResolutionField value={resolution} onChange={this.handleResolutionChange.bind(this)} />
        <MeetingSchedule schedule={schedule} onDayRemove={this.handleDayChange.bind(this, true)} resolution={resolution}
                         onUpdateSchedule={this.handleSchedule.bind(this)} />
        <MeetingSaveButton enabled={this.isProperlyFilled()} label="Utwórz spotkanie"
                           onClick={this.saveMeeting.bind(this)} />
      </div>
    );
  }
}
export default withRouter(CreateMeeting);
export {CreateMeeting};
