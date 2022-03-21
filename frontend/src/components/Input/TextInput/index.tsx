import classNames from 'classnames';
import { Field, FormikErrors, FormikTouched } from 'formik';
import { Component } from 'react';

import { colSpan } from '../../../utils/helpers';

type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  start?: boolean;
  inputSpan?: string;
  labelSpan?: string;
  errors?: FormikErrors<{ [x: string]: string }>;
  touched?: FormikTouched<{ [x: string]: string }>;
  disabled?: boolean;
};

export default class TextInput extends Component<InputProps> {
  render() {
    const p = this.props;
    const fieldname = this.props.name.split('.')[1] ?? this.props.name;
    const errors = this.props.errors?.[fieldname];
    const touched = this.props.touched?.[fieldname];
    const hasError = !!errors && touched;

    return (
      <>
        <label
          className={classNames(
            'pt-6',
            'flex-shrink-0',
            'text-left',
            colSpan(p.labelSpan)
          )}
          htmlFor={p.name}
        >
          {`${p.label}: `}
        </label>
        <div
          className={classNames(
            'w-full',
            'flex',
            'flex-col',
            colSpan(p.inputSpan)
          )}
        >
          <small
            className={classNames('text-left', 'text-xs', 'text-red-600', {
              'p-1': hasError,
              'p-3': !hasError,
            })}
          >
            {hasError && this.props.errors?.[fieldname]}
          </small>
          <Field
            data-testid={`input_${p.name}`}
            disabled={p.disabled}
            name={p.name}
            id={p.name}
            className={classNames('w-full', { 'border-red-600': hasError, 'bg-gray-200' : p.disabled })}
            type={p.name === 'password' ? 'password' : 'text'}
            placeholder={p.placeholder ?? p.label}
          />
        </div>
      </>
    );
  }
}
