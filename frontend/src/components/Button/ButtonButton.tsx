import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

type ButtonProps = {
  link: string;
  type?: 'outlined' | 'filled';
};

export default class Button extends Component<ButtonProps> {
  render() {
    const buttonClass = `${this.props.type ?? 'outlined'}Button`;
    return (
      <Link to={this.props.link}>
        <button className={`${buttonClass} button`}>
          {this.props.children}
        </button>
      </Link>
    );
  }
}