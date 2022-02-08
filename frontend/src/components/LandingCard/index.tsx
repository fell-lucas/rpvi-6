import classNames from 'classnames';
import { Component } from 'react';

export default class LandingCard extends Component {
  render() {
    return (
      <div
        className={classNames(
          'bg-bg1',
          'flex',
          'flex-1',
          'w-full',
          'mb-6',
          'text-black'
        )}
      >
        <div
          className={classNames(
            'bg-bg2',
            'flex',
            'flex-1',
            'my-4',
            'mx-6',
            'drop-shadow-2xl',
            'rounded',
            'justify-center',
            'items-start',
            'p-8',
            'gap-20'
          )}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
