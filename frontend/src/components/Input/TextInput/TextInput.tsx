import React, { Component } from 'react';

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
      <div className='flex gap-6 items-center justify-end'>
        <label className='flex-shrink-0' htmlFor={p.name}>
          {p.label} :{' '}
        </label>
        <input
          id={p.name}
          className='px-1 py-2 border-secondary rounded-lg'
          style={p.start ? { width: '100%' } : {}}
          type='text'
          placeholder={p.placeholder ?? p.label}
        />
      </div>
    );
  }
}
