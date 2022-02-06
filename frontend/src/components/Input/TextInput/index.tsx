import { Field, FormikErrors, FormikTouched } from 'formik';
import React, { Component } from 'react';

import { Solicitacao } from '../../../models';

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
          className={`pb-6 flex-shrink-0 text-left ${
            this.props.labelSpan ?? ''
          } `}
          htmlFor={p.name}
        >
          {p.label}:{' '}
        </label>
        <div className={`w-full flex flex-col ${this.props.inputSpan ?? ''}`}>
          <Field
            name={p.name}
            id={p.name}
            className={`${hasError ? 'border-red-600' : ''} w-full ${
              this.props.inputSpan ?? ''
            }`}
            type='text'
            placeholder={p.placeholder ?? p.label}
          />
          <small
            className={`text-left text-xs text-red-600 ${
              hasError ? 'p-1' : 'p-3'
            }`}
          >
            {hasError && this.props.errors?.[step]?.[fieldname]}
          </small>
        </div>
      </>
    );
  }
}
