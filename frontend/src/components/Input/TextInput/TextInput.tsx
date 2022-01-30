import React, { Component } from 'react';

import './TextInput.css';

type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
};

export default class TextInput extends Component<InputProps> {
  render() {
    const p = this.props;
    return (
      <div className='inputAndLabel'>
        <label htmlFor={p.name}>{p.label} : </label>
        <input
          id={p.name}
          className='textInput'
          type='text'
          placeholder={p.placeholder ?? p.label}
        />
      </div>
    );
  }
}
