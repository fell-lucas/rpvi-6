import React, { ButtonHTMLAttributes, Component } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outlined?: boolean;
};

export default class Button extends Component<ButtonProps> {
  render() {
    const { outlined, ...rest } = this.props;
    const custom = `${
      outlined ? 'text-primary bg-transparent' : 'text-white bg-primary '
    }`;
    return (
      <button
        type='button'
        {...rest}
        className={`font-bold box-border rounded-lg p-2 w-full text-xl border-2 border-primary ${custom}`}
      >
        {this.props.children}
      </button>
    );
  }
}
