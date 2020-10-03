import React, { useEffect, useRef } from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useCarousel } from '../../hooks/use-carousel';
import { AnimationStep } from './components/animation-step';
import { ManagementButton } from './components/management-button';
import { StepButton } from './components/step-button';

import './how-it-works.scss';

const STEPS = 5;
const TIMINGS = {
  0: 0,
  1: 2500,
  2: 4000,
  3: 4000,
  4: 5000,
  5: 3000,
};

const HowItWorks = () => {
  const intl = useIntl();
  const ref = useRef();
  const { animating, step, start, stop, pause, updateStep } = useCarousel({ timings: TIMINGS, steps: STEPS });

  useEffect(() => {
    let autoplay = true;
    let timeout = 0;

    const startAnimation = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = 0;
      }

      if (!ref.current || !autoplay) {
        return;
      }

      const minAnimationImageBottom = ref.current.offsetTop + ref.current.offsetHeight * 4 / 5;
      const browserBottom = window.pageYOffset + window.innerHeight;

      if (minAnimationImageBottom < browserBottom) {
        autoplay = false;
        start();
      }
    };

    window.addEventListener('scroll', startAnimation);
    timeout = setTimeout(startAnimation, 1000);

    return () => {
      window.removeEventListener('scroll', startAnimation);

      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [start]);

  return (
    <div className="HowItWorks">
      <Helmet title={intl.formatMessage({ id: 'howItWorks.title' })} />
      <h1>
        <FormattedMessage id="howItWorks.create.title" />
      </h1>
      <div className={'how-to-create step-' + step} ref={ref}>
        <div className="curtain" />
        <div className="magnifier" />
        <div className="caption">
          <AnimationStep step={1} className="meeting-name" />
          <AnimationStep step={2} className="meeting-days" />
          <AnimationStep step={3} className="meeting-resolution" />
          <AnimationStep step={4} className="meeting-schedule" />
          <AnimationStep step={5} className="create-meeting" />
        </div>
        <div className="buttons">
          {step > 0 && step <= STEPS && <ManagementButton icon="fa-stop" onClick={stop} />}
          {!animating && <ManagementButton icon="fa-play" onClick={start} />}
          {animating && <ManagementButton icon="fa-pause" onClick={pause} />}
          <StepButton number={1} step={step} setStep={updateStep} />
          <StepButton number={2} step={step} setStep={updateStep} />
          <StepButton number={3} step={step} setStep={updateStep} />
          <StepButton number={4} step={step} setStep={updateStep} />
          <StepButton number={5} step={step} setStep={updateStep} />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
