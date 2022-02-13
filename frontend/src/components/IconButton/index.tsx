import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconDefinition;
}

export default function IconButton({
  icon,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      {...rest}
      type='button'
      className={classNames(
        className,
        'text-primary text-4xl transition-all hover:scale-110'
      )}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
