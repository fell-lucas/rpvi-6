import React, { Component, Fragment } from 'react';

import './ProgressBar.css';

type ProgressBarProps = {
  items: number;
  hide?: boolean;
  active: number;
};

export default class ProgressBar extends Component<ProgressBarProps> {
  render() {
    if (this.props.hide) {
      return (
        <div role='progressBar' className='progressBar'>
          <div
            title='hiddenProgressBar'
            className='progressItem'
            style={{ background: 'var(--primary)' }}
          ></div>
        </div>
      );
    }
    let items: JSX.Element[] = [];
    for (let index = 0; index < this.props.items; index++) {
      const isActive = this.props.active - 1 === index;
      items.push(
        <Fragment key={`ProgressBar_${index}`}>
          <div
            className={`progressItem ${isActive ? 'progressItemActive' : ''}`}
          >
            {index + 1}
          </div>
          {this.props.items - 1 != index && (
            <div
              className={`line ${isActive ? 'progressItemActive' : ''}`}
              style={{
                left: `calc(2.5rem + ${index * 7.5}rem + 3rem)`,
              }}
            ></div>
          )}
        </Fragment>
      );
    }
    return (
      <div role='progressBar' className='progressBar'>
        {items}
      </div>
    );
  }
}
