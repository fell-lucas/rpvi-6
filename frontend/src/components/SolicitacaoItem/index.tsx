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
    <div className='hover:scale-95 transition-transform hover:opacity-90 bg-gradient-to-r flex flex-1 from-primary to-secondary w-full rounded-xl p-2 justify-between text-white'>
      <div className='flex items-center justify-center ml-6 gap-4'>
        <FontAwesomeIcon
          icon={faUserCircle as IconDefinition}
          size='2x'
          color='lightgray'
        />
        <span className='text-lg font-bold'>{name}</span>
      </div>
      <div
        className={classNames(
          'flex items-center my-2 px-2 w-1/6 justify-center rounded-xl shadow-2xl',
          { 'bg-blue-500': status === SolicitacaoStatus.InReview },
          {
            'bg-green-700':
              status === SolicitacaoStatus.Approved ||
              status === SolicitacaoStatus.TerminatedApproved,
          },
          {
            'bg-red-700':
              status === SolicitacaoStatus.Rejected ||
              status === SolicitacaoStatus.TerminatedRejected,
          },
          { 'bg-amber-500': status === SolicitacaoStatus.ChangeRequested }
        )}
      >
        <span className='font-bold'>{SolicitacaoStatus.toString(status)}</span>
      </div>
    </div>
  );
}
