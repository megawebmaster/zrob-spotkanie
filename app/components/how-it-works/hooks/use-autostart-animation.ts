import { MutableRefObject, useEffect } from 'react';

type AnimationHookProps = {
  ref: MutableRefObject<HTMLDivElement | null>;
  startAnimation: () => void;
};

export const useAutostartAnimation = ({ ref, startAnimation }: AnimationHookProps) => {
  useEffect(() => {
    let autoplay = true;
    let timeout = 0;

    const runAnimation = () => {
      if (timeout) {
        window.clearTimeout(timeout);
        timeout = 0;
      }

      if (!ref.current || !autoplay) {
        return;
      }

      const minAnimationImageBottom = ref.current.offsetTop + ref.current.offsetHeight * 4 / 5;
      const browserBottom = window.scrollY + window.innerHeight;

      if (minAnimationImageBottom < browserBottom) {
        autoplay = false;
        startAnimation();
      }
    };

    window.addEventListener('scroll', runAnimation);
    timeout = window.setTimeout(runAnimation, 1000);

    return () => {
      window.removeEventListener('scroll', runAnimation);

      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [ref, startAnimation]);
};
