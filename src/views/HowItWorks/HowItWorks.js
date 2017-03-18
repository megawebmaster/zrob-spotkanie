import React from 'react';
import Helmet from 'react-helmet';

import './HowItWorks.scss';

class HowItWorks extends React.PureComponent {
  state = {
    step: 0,
    autoplay: true
  };

  componentDidMount(){
    this.createTimeout = setTimeout(this.updateSteps.bind(this), 5000);
  }

  updateSteps(){
    let { step, autoplay } = this.state;
    if (autoplay && step !== 5) {
      this.createTimeout = setTimeout(this.updateSteps.bind(this), 5000);
    }
    this.setState({ step: (step+1)%6, autoplay: step !== 5 });
  }

  updateStep(step){
    if (this.createTimeout) {
      clearTimeout(this.createTimeout);
    }
    this.setState({ step: step%6, autoplay: step !== 5 });
  }

  render(){
    let {step} = this.state;
    return (
      <div className="HowItWorks">
        <Helmet title="Jak to działa?" />
        <h1>Jak dodać spotkanie?</h1>
        <div className={"how-to-create step-"+step}>
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
            <button type="button" className={"btn btn-secondary" + (step === 1 ? ' active': '')} onClick={this.updateStep.bind(this, 1)}>1</button>
            <button type="button" className={"btn btn-secondary" + (step === 2 ? ' active': '')} onClick={this.updateStep.bind(this, 2)}>2</button>
            <button type="button" className={"btn btn-secondary" + (step === 3 ? ' active': '')} onClick={this.updateStep.bind(this, 3)}>3</button>
            <button type="button" className={"btn btn-secondary" + (step === 4 ? ' active': '')} onClick={this.updateStep.bind(this, 4)}>4</button>
            <button type="button" className={"btn btn-secondary" + (step === 5 ? ' active': '')} onClick={this.updateStep.bind(this, 5)}>5</button>
          </div>
        </div>
      </div>
    );
  }
}

export default HowItWorks;
