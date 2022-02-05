import { Field } from 'formik';
import React, { Component } from 'react';

type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  start?: boolean;
  inputSpan?: string;
  labelSpan?: string;
};

export default class TextInput extends Component<InputProps> {
  render() {
    const p = this.props;
    return (
      <>
        <label
          className={`flex-shrink-0 text-left ${this.props.labelSpan ?? ''}`}
          htmlFor={p.name}
        >
          {p.label}:{' '}
        </label>
        <Field
          name={p.name}
          id={p.name}
          className={`w-full ${this.props.inputSpan ?? ''}`}
          type='text'
          placeholder={p.placeholder ?? p.label}
        />
      </>
    );
  }
}
