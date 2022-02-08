import classNames from 'classnames';
import { ButtonHTMLAttributes, Component } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outlined?: boolean;
};

export default class Button extends Component<ButtonProps> {
  render() {
    const { outlined, ...rest } = this.props;
    return (
      <button
        type='button'
        {...rest}
        className={classNames(
          'font-bold',
          'box-border',
          'rounded-lg',
          'p-2',
          'w-full',
          'text-xl',
          'border-2',
          'border-primary',
          { 'text-primary bg-transparent': outlined },
          { 'text-white bg-primary': !outlined }
        )}
      >
        {this.props.children}
      </button>
    );
  }
}
