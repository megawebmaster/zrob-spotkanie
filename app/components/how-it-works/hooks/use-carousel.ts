import { useCallback, useEffect, useRef, useState } from 'react';

type CarouselHookProps = {
  currentStep: number;
  defaultStep?: number;
  loop?: boolean;
  steps: number;
  timings: Record<number, number>;
  updateStep: (value: number) => void;
};

export const useCarousel = ({ currentStep, defaultStep = 0, loop = false, steps, timings, updateStep }: CarouselHookProps) => {
  const timeout = useRef(0);
  const [animating, setAnimate] = useState(false);

  const start = useCallback(() => {
    setAnimate(true);
  }, []);

  const pause = useCallback(() => {
    setAnimate(false);
  }, []);

  const stop = useCallback(() => {
    setAnimate(false);
    updateStep(defaultStep);
  }, [defaultStep, updateStep]);


  useEffect(() => {
    if (animating) {
      // Start animation
      // Looped or still has steps
      if (loop || currentStep < steps) {
        timeout.current = window.setTimeout(
          () => {
            updateStep((currentStep + 1) % (steps + 1))
          },
          timings[currentStep]
        );
      } else {
        timeout.current = window.setTimeout(
          () => {
            setAnimate(false);
            updateStep(defaultStep);
          },
          timings[currentStep]
        );
      }
    }

    return () => {
      // Stop animation on exit
      if (timeout.current) {
        window.clearTimeout(timeout.current);
        timeout.current = 0;
      }
    };
  }, [animating, currentStep, defaultStep, loop, steps, timings, updateStep]);

  return {
    animating,
    start,
    stop,
    pause,
  }
};
