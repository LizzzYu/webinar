import React, { useMemo } from 'react';
import { WrappedFieldProps } from 'redux-form';
import FormControl, { FormControlProps } from '../../ui/FormControl/FormControl';
import Select, { SelectorProps } from '../../ui/Select/Select';

export interface SelectFieldProps
  extends SelectorProps, Pick<FormControlProps, 'label' | 'required' | 'annotation'> {
  lockedWhenHasInitialValue?: boolean;
}

export default function SelectField(props: SelectFieldProps & WrappedFieldProps): JSX.Element {
  const {
    input: {
      value,
      onChange,
    },
    meta: {
      error,
      submitFailed,
    },
    label,
    options,
    required,
    annotation,
    disabled,
    placeholder,
  } = props;

  const errorMsg = useMemo(() => {
    if (!error) return null;
    if (!submitFailed) return null;

    return error;
  }, [
    error,
    submitFailed,
  ]);

  return (
    <FormControl
      label={label}
      required={required}
      annotation={annotation}
      errorPosition="top"
      error={errorMsg}>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        disabled={disabled}
        placeholder={placeholder}
        error={errorMsg} />
    </FormControl>
  );
}
