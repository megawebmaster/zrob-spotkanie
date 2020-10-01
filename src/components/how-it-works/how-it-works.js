import React, { useEffect, useRef } from 'react';
import Helmet from 'react-helmet';
import cx from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';

import { useCarousel } from '../../hooks/use-carousel';

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

const AnimationButton = ({ number, step, setStep }) => (
  <button
    type="button"
    className={cx('btn btn-secondary', { active: step === number })}
    onClick={() => setStep(number)}
  >
    {number}
  </button>
);

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
          <div className="meeting-name">
            <span>1</span>
            <FormattedMessage id="howItWorks.create.step1" />
          </div>
          <div className="meeting-days">
            <span>2</span>
            <FormattedMessage id="howItWorks.create.step2" />
          </div>
          <div className="meeting-resolution">
            <span>3</span>
            <FormattedMessage id="howItWorks.create.step3" />
          </div>
          <div className="meeting-schedule">
            <span>4</span>
            <FormattedMessage id="howItWorks.create.step4" />
          </div>
          <div className="create-meeting">
            <span>5</span>
            <FormattedMessage id="howItWorks.create.step5" />
          </div>
        </div>
        <div className="buttons">
          {step > 0 && step <= STEPS && (
            <button type="button" className="btn btn-secondary" onClick={stop}>
              <i className="fa fa-stop" />
            </button>
          )}
          {!animating && (
            <button type="button" className="btn btn-secondary" onClick={start}>
              <i className="fa fa-play" />
            </button>
          )}
          {animating && (
            <button type="button" className="btn btn-secondary" onClick={pause}>
              <i className="fa fa-pause" />
            </button>
          )}
          <AnimationButton number={1} step={step} setStep={updateStep} />
          <AnimationButton number={2} step={step} setStep={updateStep} />
          <AnimationButton number={3} step={step} setStep={updateStep} />
          <AnimationButton number={4} step={step} setStep={updateStep} />
          <AnimationButton number={5} step={step} setStep={updateStep} />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
