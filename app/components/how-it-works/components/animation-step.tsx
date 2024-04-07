import { useTranslation } from 'react-i18next';

type AnimationStepProps = {
  className?: string;
  step: number;
};

export const AnimationStep = ({ className, step }: AnimationStepProps) => {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <span>{step}</span>
      {t(`how-it-works.create.step${step}`)}
    </div>
  );
}
