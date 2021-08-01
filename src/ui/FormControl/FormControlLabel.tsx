import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Typography, { TypographyProps } from '../Typography';
import FormControlMessage from './FormControlMessage';

import classes from './formControl.module.scss';

export interface FormControlLabelProps extends TypographyProps {
  children?: ReactNode;
  className?: string;
  required?: boolean;
  annotation?: string;
  error?: string;
}

export default function FormControlLabel(props: FormControlLabelProps): JSX.Element {
  const {
    className,
    children,
    required,
    annotation,
    error,
    style,
    ...rest
  } = props;

  return (
    <div className={classes.controlLabel}>
      <Typography
        align="center"
        component="label"
        className={clsx(classes.label, className)}
        variant="content_16"
        color="black"
        style={style}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}>
        {children}
      </Typography>
      {required && <span className={classes.asterisk}>&thinsp;*</span>}
      {!!annotation && (
        <FormControlMessage className={clsx(children && classes.paddingLeft)}>
          {annotation}
        </FormControlMessage>
      )}
      {!!error && (
        <FormControlMessage error className={clsx((children || annotation) && classes.paddingLeft)}>
          {error}
        </FormControlMessage>
      )}
    </div>
  );
}
