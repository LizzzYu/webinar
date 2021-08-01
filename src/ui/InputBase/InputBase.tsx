import React, {
  forwardRef,
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  KeyboardEventHandler,
  CSSProperties,
  Ref,
} from 'react';
import clsx from 'clsx';
import classes from './inputBase.module.scss';

type InputBaseRefs = (string & Ref<HTMLInputElement>) | (string & Ref<HTMLTextAreaElement>);

export interface InputBaseProps {
  className?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  id?: string;
  maxLength?: number;
  multiline?: boolean;
  name?: string;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClick?: MouseEventHandler;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rows?: number;
  step?: number;
  style?: CSSProperties;
  type?: string;
  value?: string | number;
}

const InputBase = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputBaseProps>(
  (props, ref) => {
    const {
      placeholder = 'Please Enter',
      className,
      multiline = false,
      rows,
      ...rest
    } = props;

    const isMulti = !!(multiline || rows);
    const Component = isMulti ? 'textarea' : 'input';

    if (isMulti) {
      (rest as InputBaseProps).rows = rows;
    }

    return (
      <Component
        ref={ref as InputBaseRefs}
        placeholder={placeholder}
        className={clsx(classes.root, className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest} />
    );
  },
);

InputBase.displayName = 'InputBase';
export default InputBase;
