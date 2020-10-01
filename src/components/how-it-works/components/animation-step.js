import React from 'react';
import { FormattedMessage } from 'react-intl';

export const AnimationStep = ({ className, step }) => (
  <div className={className}>
    <span>{step}</span>
    <FormattedMessage id={`howItWorks.create.step${step}`} />
  </div>
);
