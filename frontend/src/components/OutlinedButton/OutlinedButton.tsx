import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './OutlinedButton.css';

type OutlinedButtonProps = {
  link: string;
};

export default class OutlinedButton extends Component<OutlinedButtonProps> {
  render() {
    return (
      <Link to={this.props.link}>
        <button className='outlinedButton'>{this.props.children}</button>
      </Link>
    );
  }
}
