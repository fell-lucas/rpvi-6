import React, { Component, Fragment } from 'react';
import './ProgressBar.css';

type ProgressBarProps = {
  items: number
  hide?: boolean
}

export default class ProgressBar extends Component<ProgressBarProps> {
  render() {
    let items: JSX.Element[] = []
    for (let index = 0; index < this.props.items; index++) {
      items.push(
        <Fragment key={`ProgressBar_${index}`}>
          <div className='progressItem'>{index + 1}</div>
          {this.props.items - 1 != index && (
            <div className='line' style={{left: `calc(2.5rem + ${index * 7.5}rem + 3rem)`}}></div>
          )}
        </Fragment>
      )
    }
    return <div role='progressBar' className="progressBar">{!this.props.hide && items}</div>;
  }
}
