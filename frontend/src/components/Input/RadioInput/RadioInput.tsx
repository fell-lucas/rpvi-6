import React, { Children, Component, Fragment } from 'react';

import './RadioInput.css';

type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
};

export default class RadioInput extends Component<InputProps> {
  render() {
    const p = this.props;
    return (
      <div className='inputAndLabel' style={{ justifyContent: 'flex-start' }}>
        <label htmlFor={p.name}>{p.label} : </label>
        <div className='inputAndLabel'>
          {Children.map(p.children, (child, idx) => {
            console.log(child);
            // @ts-ignore
            const value = child.props.value as string;
            // @ts-ignore
            const text = child.props.children as string;
            return (
              <Fragment>
                <input
                  type='radio'
                  className='checkbox'
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
