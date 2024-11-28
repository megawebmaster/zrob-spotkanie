import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { ClientOnly } from 'remix-utils/client-only';

import i18next from '~/i18next.server';

import { AnimationStep } from '~/components/how-it-works/components/animation-step';
import { StepButton } from '~/components/how-it-works/components/step-button';
import {
  AnimationManagement,
  AnimationManagementHandle
} from '~/components/how-it-works/components/animation-management';

import '~/components/how-it-works/index.scss';

export async function loader({ request }: LoaderFunctionArgs) {
  const t = await i18next.getFixedT(request);

  return json({
    title: `${t('how-it-works.title')} - ${t('app.name')}`,
    description: t('how-it-works.description'),
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title || '' },
    { name: 'description', content: data?.description || '' },
  ];
};

export default function HowItWorks() {
  const { t } = useTranslation();
  const managementRef = useRef<AnimationManagementHandle>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const updateStep = (value: number) => {
    setStep(value);
    managementRef.current?.pauseAnimation();
  };

  return (
    <div className="HowItWorks">
      <h1>
        {t("how-it-works.create.title")}
      </h1>
      <div className={'how-to-create step-' + step} ref={ref}>
        <div className="curtain"/>
        <div className="magnifier"/>
        <div className="caption">
          <AnimationStep step={1} className="meeting-name"/>
          <AnimationStep step={2} className="meeting-days"/>
          <AnimationStep step={3} className="meeting-resolution"/>
          <AnimationStep step={4} className="meeting-schedule"/>
          <AnimationStep step={5} className="create-meeting"/>
        </div>
        <div className="buttons">
          <ClientOnly>
            {() => (
              <div className="btn-group mr-2" role="group" aria-label="Animation controls">
                <AnimationManagement step={step} setStep={setStep} ref={managementRef} containerRef={ref}/>
              </div>
            )}
          </ClientOnly>
          <div className="btn-group" role="group" aria-label="How to steps">
            <StepButton number={1} step={step} setStep={updateStep}/>
            <StepButton number={2} step={step} setStep={updateStep}/>
            <StepButton number={3} step={step} setStep={updateStep}/>
            <StepButton number={4} step={step} setStep={updateStep}/>
            <StepButton number={5} step={step} setStep={updateStep}/>
          </div>
        </div>
      </div>
    </div>
  );
}
