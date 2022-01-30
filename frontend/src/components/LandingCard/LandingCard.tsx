import React, { Component } from 'react';
import './LandingCard.css';

export default class LandingCard extends Component {
  render() {
    return (
      <div className='cardWrapper'>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
