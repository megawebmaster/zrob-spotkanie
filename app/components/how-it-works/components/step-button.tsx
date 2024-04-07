import cx from 'clsx';

type StepButtonProps = {
  number: number;
  step: number;
  setStep: (value: number) => void;
};

export const StepButton = ({ number, step, setStep }: StepButtonProps) => (
  <button
    type="button"
    className={cx('btn btn-secondary', { active: step === number })}
    onClick={() => setStep(number)}
  >
    {number}
  </button>
);
