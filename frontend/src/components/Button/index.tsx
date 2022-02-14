import classNames from 'classnames';
import { ButtonHTMLAttributes, Component } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outlined?: boolean;
};

export default class Button extends Component<ButtonProps> {
  render() {
    const { outlined, className, ...rest } = this.props;
    return (
      <button
        type='button'
        {...rest}
        className={classNames(
          className,
          'font-bold box-border rounded-lg p-2 w-full text-lg border border-primary hover:border-secondary',
          'transition-all active:scale-95 ',
          {
            'text-primary bg-transparent hover:text-secondary disabled:bg-gray-200':
              outlined,
          },
          {
            'text-white bg-primary hover:bg-secondary disabled:bg-green-900':
              !outlined,
          }
        )}
      >
        {this.props.children}
      </button>
    );
  }
}
