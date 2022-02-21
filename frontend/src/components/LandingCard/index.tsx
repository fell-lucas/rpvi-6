import classNames from 'classnames';
import React from 'react';

interface LadingCardProps {
  items?: 'start' | 'center' | 'end';
  className?: string;
}

export const LandingCard: React.FC<LadingCardProps> = ({
  children,
  items = 'start',
  className,
}) => {
  return (
    <div className='bg-bg1 flex flex-1 w-full mb-6 text-black'>
      <div
        className={classNames(
          className,
          'bg-bg2 flex flex-1 my-4 mx-6 drop-shadow-2xl rounded justify-center p-8 gap-20',
          { 'items-start': items === 'start' },
          { 'items-end': items === 'end' },
          { 'items-center': items === 'center' }
        )}
      >
        {children}
      </div>
    </div>
  );
};
