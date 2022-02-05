import React, { Children, Component, Fragment } from 'react';

type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
};

export default class RadioInput extends Component<InputProps> {
  render() {
    const p = this.props;
    return (
      <div
        className='flex gap-6 items-center justify-end'
        style={{ justifyContent: 'flex-start' }}
      >
        <label htmlFor={p.name}>{p.label} : </label>
        <div className='flex gap-6 items-center justify-end'>
          {Children.map(p.children, (child, idx) => {
            // @ts-ignore
            const value = child.props.value as string;
            // @ts-ignore
            const text = child.props.children as string;
            return (
              <Fragment>
                <input
                  type='radio'
                  id={p.name + idx}
                  name={p.name}
                  value={value}
                />
                <label htmlFor={p.name + idx}>{text}</label>
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}
