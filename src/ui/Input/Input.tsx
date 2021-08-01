import React, { Ref, CSSProperties, forwardRef } from 'react';
import InputBase, { InputBaseProps } from '../InputBase/InputBase';
import TextField, { TextFieldProps } from '../TextField/TextField';

export interface InputProps extends Omit<TextFieldProps, 'children'>, InputBaseProps {
  inputClassName?: string;
  inputRef?: Ref<HTMLInputElement>;
  inputStyle?: CSSProperties;
}

const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const {
    className,
    multiline,
    disabled,
    error,
    fullWidth,
    fullHeight,
    inputClassName,
    inputRef,
    inputStyle,
    required,
    style,
    value,
    ...inputProps
  } = props;

  return (
    <TextField
      ref={ref}
      className={className}
      style={style}
      error={error}
      disabled={disabled}
      fullWidth={fullWidth}
      fullHeight={fullHeight}>
      <InputBase
        ref={inputRef}
        className={inputClassName}
        disabled={disabled}
        required={required}
        style={inputStyle}
        value={value}
        multiline={multiline}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...inputProps} />
    </TextField>
  );
});

Input.displayName = 'Input';
export default Input;
