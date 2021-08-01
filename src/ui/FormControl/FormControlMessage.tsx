import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Typography, { TypographyProps } from '../Typography';
import classes from './formControl.module.scss';

export interface FormControlMessageProps extends TypographyProps {
  children?: ReactNode;
  className?: string;
  error?: boolean;
}

export default function FormControlMessage(props: FormControlMessageProps): JSX.Element {
  const {
    className,
    children,
    error,
    color = 'grey',
    style,
    ...rest
  } = props;

  return (
    <Typography
      component="span"
      className={clsx(classes.message, className)}
      variant="content_16"
      color={error ? 'error' : color}
      style={style}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}>
      {children}
    </Typography>
  );
}
