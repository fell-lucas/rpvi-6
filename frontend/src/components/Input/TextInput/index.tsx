import classNames from 'classnames';
import { Field, FormikErrors, FormikTouched } from 'formik';
import React, { Component } from 'react';

import { Solicitacao } from '../../../models';
import { colSpan } from '../../../utils/helpers';

type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  start?: boolean;
  inputSpan?: string;
  labelSpan?: string;
  errors?: FormikErrors<Solicitacao>;
  touched?: FormikTouched<Solicitacao>;
};

export default class TextInput extends Component<InputProps> {
  render() {
    const p = this.props;
    const [step, fieldname] = this.props.name.split('.');
    const errors = this.props.errors?.[step]?.[fieldname];
    const touched = this.props.touched?.[step]?.[fieldname];
    const hasError = Boolean(errors) && touched;
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
            {hasError && this.props.errors?.[step]?.[fieldname]}
          </small>
          <Field
            name={p.name}
            id={p.name}
            className={classNames('w-full', { 'border-red-600': hasError })}
            type='text'
            placeholder={p.placeholder ?? p.label}
          />
        </div>
      </>
    );
  }
}
