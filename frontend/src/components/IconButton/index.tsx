import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

export const IconButton = ({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      type='button'
      className={classNames(
        className,
        'text-primary text-4xl transition-all hover:scale-110'
      )}
    >
      {children}
    </button>
  );
};
