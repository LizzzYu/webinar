import React from 'react';
import clsx from 'clsx';
import type { CSSProperties } from 'react';

import classes from './loadingSpinner.module.scss';

export interface LoadingSpinnerProps {
  size?: number | undefined;
  color?: string | undefined;
  scale?: number | undefined;
  style?: CSSProperties;
  wrapperClassName?: string;
  innerClassName?: string;
}

export type CssVarInterpolations = Record<string, string | number | null | undefined>;

const LoadingSpinner = ({
  color = 'var(--main-blue)',
  size = 72,
  scale = 1,
  wrapperClassName,
  innerClassName,
  style,
}: LoadingSpinnerProps): JSX.Element => {
  const loadingSpinnerCss: CssVarInterpolations = {
    '--color': `${color}`,
    '--size': `${size}px`,
    '--scale': `${scale}`,
    ...style,
  };

  return (
    <div
      style={loadingSpinnerCss}
      className={clsx(
        classes.wrapper,
        wrapperClassName,
      )}>
      <div className={clsx(
        classes.loadingSpinner,
        innerClassName,
      )}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default LoadingSpinner;
