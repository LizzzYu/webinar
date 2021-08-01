import React, { ReactNode } from 'react';
import clsx from 'clsx';
import FormControlLabel from './FormControlLabel';
import FormControlMessage from './FormControlMessage';
import classes from './formControl.module.scss';

export interface FormControlProps {
  children?: ReactNode;
  label?: string;
  labelMargin?: number;
  required?: boolean;
  annotation?: string;
  error?: string;
  errorPosition?: 'top' | 'bottom' | 'bottom-left';
  className?: string;
}

export default function FormControl(props: FormControlProps): JSX.Element {
  const {
    children,
    label,
    labelMargin = 8,
    required,
    annotation,
    error,
    errorPosition = 'top',
    className,
  } = props;

  return (
    <div className={clsx(
      classes.root,
      className,
    )}>
      <FormControlLabel
        required={required}
        annotation={annotation}
        style={label ? { margin: `0 0 ${labelMargin}px` } : {}}
        error={!!error && errorPosition === 'top' && label ? error : ''}>
        {label}
      </FormControlLabel>
      {children}
      {!!error && (errorPosition === 'bottom' || errorPosition === 'bottom-left') && label ? (
        <FormControlMessage
          error
          className={clsx(classes.bottomMessage, {
            [classes.errorBottomLeft]: errorPosition === 'bottom-left',
          })}>
          {error}
        </FormControlMessage>
      ) : null}
    </div>
  );
}
