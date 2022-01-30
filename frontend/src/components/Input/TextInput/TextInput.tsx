import React, { Component } from 'react';

import './TextInput.css';

type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  start?: boolean;
};

export default class TextInput extends Component<InputProps> {
  render() {
    const p = this.props;
    return (
      <div
        className='inputAndLabel'
        style={p.start ? { justifyContent: 'flex-start' } : {}}
      >
        <label htmlFor={p.name}>{p.label} : </label>
        <input
          id={p.name}
          className='textInput'
          style={p.start ? { width: '100%' } : {}}
          type='text'
          placeholder={p.placeholder ?? p.label}
        />
      </div>
    );
  }
}
