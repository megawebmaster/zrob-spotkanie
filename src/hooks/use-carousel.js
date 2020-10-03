import { useCallback, useEffect, useRef, useState } from 'react';

export const useCarousel = ({ defaultStep = 0, loop = false, steps, timings }) => {
  const timeout = useRef(0);
  const [step, setStep] = useState(defaultStep);
  const [animating, setAnimate] = useState(false);

  const start = useCallback(() => {
    setAnimate(true);
  }, []);

  const pause = useCallback(() => {
    setAnimate(false);
  }, []);

  const stop = useCallback(() => {
    setAnimate(false);
    setStep(defaultStep);
  }, [defaultStep]);

  const updateStep = useCallback((newStep) => {
    setStep(newStep);
    setAnimate(false);
  }, []);

  useEffect(() => {
    if (animating) {
      // Start animation
      // Looped or still has steps
      if (loop || step < steps) {
        timeout.current = setTimeout(() => setStep((step + 1) % (steps + 1)), timings[step]);
      } else {
        timeout.current = setTimeout(() => {
          setAnimate(false);
          setStep(defaultStep);
        }, timings[step]);
      }
    }

    return () => {
      // Stop animation on exit
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = 0;
      }
    };
  }, [animating, step, defaultStep, loop, steps, timings]);

  return {
    animating,
    step,
    start,
    stop,
    pause,
    updateStep,
  }
};
