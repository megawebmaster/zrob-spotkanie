import React from 'react';
import Helmet from 'react-helmet';

import './HowItWorks.scss';

class HowItWorks extends React.Component {
  state = {
    create: {
      step: 0,
      animate: true,
      autoplay: true,
      steps: 5,
      times: {
        1: 5000,
        2: 5000,
        3: 5000,
        4: 5000,
        5: 5000,
      }
    }
  };

  timeouts = {
    create: null,
  };

  componentDidMount(){
    this.tryToStartAnimations();
    this.createMeetingScrollHandle = this.createMeetingScrollHandle.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    window.addEventListener('scroll', this.createMeetingScrollHandle);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.createMeetingScrollHandle);
  }

  tryToStartAnimations(){
    this.startAnimation('create', window.pageYOffset, this.createMeeting);
  }

  createMeetingScrollHandle(event){
    this.startAnimation('create', event.pageY, this.createMeeting);
  }

  startAnimation(type, position, element){
    let {autoplay} = this.state[type];
    let minAnimationImageBottom = element.offsetTop + element.offsetHeight * 4 / 5;
    let browserBottom = position + window.innerHeight;

    if(autoplay && minAnimationImageBottom < browserBottom){
      this.setState({[type]: { ...this.state[type], autoplay: false }});
      this._runAnimation(type, 1000);
    }
  }

  _runAnimation(type, time) {
    this.timeouts[type] = setTimeout(this.updateSteps.bind(this, type), time);
  }

  updateSteps(type){
    let {step, steps, animate, times} = this.state[type];

    if(animate){
      this._runAnimation(type, times[step]);
      this.setState({[type]: { ...(this.state[type]), step: (step + 1) % (steps + 1), animate: step < steps }});
    }
  }

  setStep(type, step){
    let {animate, steps, times} = this.state[type];
    let canAnimate = animate && step <= steps;
    if (canAnimate) {
      this.pauseAnimation(type);
      this._runAnimation(type, times[step]);
    }
    this.setState({[type]: {...this.state[type], step: step % 6, animate: canAnimate}});
  }

  playAnimation(type) {
    let {step, steps, times} = this.state[type];
    if (step === 0 || step > steps){
      step = 1;
    }
    this.setState({[type]: { ...this.state[type], step, animate: true}});
    this._runAnimation(type, times[step]);
  }

  pauseAnimation(type) {
    if(this.timeouts[type]){
      clearTimeout(this.timeouts[type]);
    }
    this.setState({[type]: { ...this.state[type], animate: false}});
  }

  stopAnimation(type) {
    let {steps} = this.state[type];
    this.pauseAnimation(type);
    this.setStep(type, steps + 1);
  }

  render(){
    let {create: {step, steps, animate}} = this.state;
    return (
      <div className="HowItWorks">
        <Helmet title="Jak to działa?" />
        <h1>Jak dodać spotkanie?</h1>
        <div className={"how-to-create step-" + step} ref={input => this.createMeeting = input}>
          <div className="curtain"></div>
          <div className="magnifier"></div>
          <div className="caption">
            <div className="meeting-name">
              <span>1</span>Nazwij swoje spotkanie
            </div>
            <div className="meeting-days">
              <span>2</span>Wybierz dni, w których spotkanie może się odbyć
            </div>
            <div className="meeting-resolution">
              <span>3</span>Wybierz na jakie części ma zostać podzielony czas do wyboru
            </div>
            <div className="meeting-schedule">
              <span>4</span>
              Podaj przedziały godzin, które można wybrać - zostaną podzielone na części wybrane wcześniej
            </div>
            <div className="create-meeting">
              <span>5</span>Utwórz spotkanie i roześlij link zaproszonym!
            </div>
          </div>
          <div className="buttons">
            {step > 0 && step <= steps && <button type="button" className="btn btn-secondary" onClick={() => this.stopAnimation('create')}>
              <i className="fa fa-stop"></i>
            </button>}
            {!animate && <button type="button" className="btn btn-secondary" onClick={() => this.playAnimation('create')}>
              <i className="fa fa-play"></i>
            </button>}
            {animate && <button type="button" className="btn btn-secondary" onClick={() => this.pauseAnimation('create')}>
              <i className="fa fa-pause"></i>
            </button>}
            <button type="button" className={"btn btn-secondary" + (step === 1 ? ' active' : '')}
                    onClick={this.setStep.bind(this, 'create', 1)}>1
            </button>
            <button type="button" className={"btn btn-secondary" + (step === 2 ? ' active' : '')}
                    onClick={this.setStep.bind(this, 'create', 2)}>2
            </button>
            <button type="button" className={"btn btn-secondary" + (step === 3 ? ' active' : '')}
                    onClick={this.setStep.bind(this, 'create', 3)}>3
            </button>
            <button type="button" className={"btn btn-secondary" + (step === 4 ? ' active' : '')}
                    onClick={this.setStep.bind(this, 'create', 4)}>4
            </button>
            <button type="button" className={"btn btn-secondary" + (step === 5 ? ' active' : '')}
                    onClick={this.setStep.bind(this, 'create', 5)}>5
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HowItWorks;
