import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { SolicitacaoStatus } from '../../models';

interface SolicitacaoItemProps {
  status: SolicitacaoStatus;
  name: string;
}

export default function SolicitacaoItem({
  status,
  name,
}: SolicitacaoItemProps) {
  return (
    <div className='bg-gradient-to-r flex flex-1 from-primary to-secondary w-full rounded-xl p-2 justify-between text-white'>
      <div className='flex items-center justify-center ml-6 gap-4'>
        <FontAwesomeIcon
          icon={faUserCircle as IconDefinition}
          size='3x'
          color='lightgray'
        />
        <span className='text-lg font-bold'>{name}</span>
      </div>
      <div
        className={classNames(
          'flex items-center my-2 px-2 w-52 justify-center rounded-xl shadow-2xl',
          { 'bg-amber-400': status === SolicitacaoStatus.InProgress },
          { 'bg-green-700': status === SolicitacaoStatus.Approved },
          { 'bg-red-700': status === SolicitacaoStatus.Rejected }
        )}
      >
        <span className='font-bold'>{SolicitacaoStatus.toString(status)}</span>
      </div>
    </div>
  );
}
