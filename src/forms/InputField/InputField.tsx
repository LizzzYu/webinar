import React, { useMemo } from 'react';
import type { WrappedFieldProps } from 'redux-form';
import clsx from 'clsx';
import classes from './inputField.module.scss';
import Input, { InputProps } from '../../ui/Input/Input';
import FormControl, { FormControlProps } from '../../ui/FormControl/FormControl';

export interface InputFieldProps
  extends Pick<InputProps, 'disabled' | 'fullHeight' | 'multiline' | 'maxLength' | 'maxLength' | 'placeholder' | 'type' | 'rows'>,
  Pick<FormControlProps, 'label' | 'required' | 'annotation' | 'errorPosition'> {
  submitErrorMessage?: string | null;
  noSpaces?: boolean;
  preventEnter?: boolean;
}

export default function InputField(props: WrappedFieldProps & InputFieldProps): JSX.Element {
  const {
    input: {
      value,
      onChange,
      onBlur,
      onFocus,
    },
    meta: {
      error,
      submitFailed,
    },
    label,
    required,
    annotation,
    disabled,
    multiline,
    fullHeight = false,
    maxLength,
    noSpaces = false,
    preventEnter = false,
    placeholder = 'Please Enter',
    submitErrorMessage,
    errorPosition = 'top',
    ...restInputProps
  } = props;

  const errorMsg = useMemo(() => {
    if (submitErrorMessage) return submitErrorMessage;

    if (!error) return null;
    if (!submitFailed) return null;

    return error;
  }, [
    error,
    submitFailed,
    submitErrorMessage,
  ]);

  return (
    <FormControl
      label={label}
      required={required}
      annotation={annotation}
      errorPosition={errorPosition}
      error={errorMsg}
      className={clsx({ [classes.fullHeight]: fullHeight })}>
      <Input
        fullWidth
        multiline={multiline}
        fullHeight={fullHeight}
        maxLength={maxLength ?? 500}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        error={errorMsg}
        onKeyDown={(event) => {
          if ((noSpaces && event.code === 'Space') || (preventEnter && event.key === 'Enter')) {
            event.preventDefault();
          }
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restInputProps} />
    </FormControl>
  );
}
