import classNames from 'classnames';
import React, { Component, Fragment } from 'react';

type ProgressBarProps = {
  items: number;
  hide?: boolean;
  active: number;
};

export default class ProgressBar extends Component<ProgressBarProps> {
  render() {
    if (this.props.hide) {
      return <div className='py-4'></div>;
    }
    let items: JSX.Element[] = [];
    for (let index = 0; index < this.props.items; index++) {
      const isActive = this.props.active - 1 >= index;
      items.push(
        <Fragment key={`ProgressBar_${index}`}>
          <div
            className={classNames(
              'flex',
              'text-primary',
              'w-10',
              'h-10',
              'items-center',
              'rounded-full',
              'justify-center',
              'first:ml-12',
              { 'bg-white': isActive, 'bg-inactive': !isActive }
            )}
          >
            {index + 1}
          </div>
          {this.props.items - 1 !== index && (
            <div
              className={classNames(
                'bg-gray',
                'absolute',
                'top-1/2',
                'w-20',
                'h-1',
                { 'bg-white': isActive, 'bg-inactive': !isActive }
              )}
              style={{
                left: `calc(2.5rem + ${index * 7.5}rem + 3rem)`,
              }}
            ></div>
          )}
        </Fragment>
      );
    }
    return (
      <div
        className={classNames(
          'flex',
          'relative',
          'gap-20',
          'py-4',
          'justify-start',
          'w-full'
        )}
      >
        {items}
      </div>
    );
  }
}
