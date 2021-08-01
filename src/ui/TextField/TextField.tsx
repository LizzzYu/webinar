import React, {
  forwardRef,
  ReactNode,
  MouseEventHandler,
  CSSProperties,
} from 'react';
import clsx from 'clsx';
import classes from './textField.module.scss';

export interface TextFieldProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
}

const TextField = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  const {
    children,
    className,
    disabled,
    error,
    fullWidth,
    fullHeight,
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      className={clsx(
        classes.root,
        {
          [classes.disabled]: disabled,
          [classes.error]: error,
          [classes.fullWidth]: fullWidth,
          [classes.fullHeight]: fullHeight,
        },
        className,
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}>
      {children}
    </div>
  );
});

TextField.displayName = 'TextField';
export default TextField;
