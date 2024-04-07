import { forwardRef, MutableRefObject, useImperativeHandle } from 'react';

import { ManagementButton } from '~/components/how-it-works/components/management-button';
import { useCarousel } from '~/components/how-it-works/hooks/use-carousel';
import { useAutostartAnimation } from '~/components/how-it-works/hooks/use-autostart-animation';

const STEPS = 5;
const TIMINGS = {
  0: 0,
  1: 2500,
  2: 4000,
  3: 4000,
  4: 5000,
  5: 3000,
};

export type AnimationManagementHandle = {
  pauseAnimation: () => void;
};

type AnimationManagementProps = {
  step: number;
  setStep: (value: number) => void;
  containerRef: MutableRefObject<HTMLDivElement | null>;
};

export const AnimationManagement = forwardRef<AnimationManagementHandle, AnimationManagementProps>(
  ({ step, setStep, containerRef }, ref) => {
    const { animating, start, stop, pause } = useCarousel({
      currentStep: step,
      timings: TIMINGS,
      steps: STEPS,
      updateStep: setStep,
    });

    useAutostartAnimation({ ref: containerRef, startAnimation: start });
    useImperativeHandle(ref, () => ({
      pauseAnimation() {
        pause();
      }
    }), [pause]);

    return (
      <>
        {step > 0 && step <= STEPS && <ManagementButton icon="fa-stop" onClick={stop}/>}
        {!animating && <ManagementButton icon="fa-play" onClick={start}/>}
        {animating && <ManagementButton icon="fa-pause" onClick={pause}/>}
      </>
    );
  }
);

AnimationManagement.displayName = 'AnimationManagement';
