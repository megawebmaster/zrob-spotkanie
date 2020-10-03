import React from 'react';
import cx from 'classnames';

export const StepButton = ({ number, step, setStep }) => (
  <button
    type="button"
    className={cx('btn btn-secondary', { active: step === number })}
    onClick={() => setStep(number)}
  >
    {number}
  </button>
);
