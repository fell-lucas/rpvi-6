import { FieldAttributes } from 'formik';
import React, { InputHTMLAttributes, ReactNode } from 'react';

type RadioButtonGroupProps = {
  error?: string;
  touched?: boolean;
  label: string;
  children: ReactNode;
};

export const RadioButtonGroup = ({
  error,
  touched,
  label,
  children,
}: RadioButtonGroupProps) => {
  return (
    <div className='flex flex-col'>
      <div className='flex gap-6 items-center'>
        <legend>{label}</legend>
        {children}
      </div>
      <small
        className={`text-left text-xs text-red-600 ${
          !!error && touched ? 'p-1' : 'p-3'
        }`}
      >
        {!!error && touched && error}
      </small>
    </div>
  );
};

type RadioButtonProps = {
  field: FieldAttributes<InputHTMLAttributes<HTMLInputElement>>;
  id: string;
  label: string;
};

export const RadioButton = ({
  field: { name, onChange, value },
  id,
  label,
}: RadioButtonProps) => {
  return (
    <div className='flex gap-6 items-center'>
      <input
        name={name}
        id={id}
        type='radio'
        value={label}
        checked={value === label}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
