import React, {
  forwardRef,
  Ref,
} from 'react';
import type {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
} from 'react';

import classes from './buttonBase.module.scss';
import clsx from 'clsx';

export type ButtonElement = HTMLLabelElement | HTMLButtonElement | HTMLSpanElement;
export type ButtonRefs = (string & Ref<HTMLLabelElement>) |
(string & Ref<HTMLButtonElement>) |
(string & Ref<HTMLSpanElement>);
export interface ButtonBaseProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  tabIndex?: number;
  htmlFor?: string;
  component?: 'button' | 'span' | 'label';
  onClick?: MouseEventHandler<HTMLElement>;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
}

const ButtonBase = forwardRef<ButtonElement, ButtonBaseProps>(
  (
    {
      children,
      className ='',
      style,
      type = 'button',
      disabled = false,
      tabIndex,
      htmlFor,
      component: Component = 'button',
      onClick,
      onMouseEnter,
      onMouseLeave,
    },
    ref,
  ) => (
    <Component
      ref={ref as ButtonRefs}
      type={type}
      className={clsx(
        classes.root,
        className,
      )}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      tabIndex={tabIndex}
      htmlFor={htmlFor}>
      {children}
    </Component>
  ),
);

ButtonBase.displayName = 'ButtonBase';
export default ButtonBase;
