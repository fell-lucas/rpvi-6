import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFilePdf, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ZonedDateTime } from 'temporal-polyfill';

import { Solicitacao, SolicitacaoStatus } from '../../models';
import { colorAccordingToStatus } from '../../utils';

interface SolicitacaoItemProps {
  solicitacao: Solicitacao;
}

export default function SolicitacaoItem({
  solicitacao: {
    estagiario: { nome },
    status,
    updated_at,
  },
}: SolicitacaoItemProps) {
  const zdt = ZonedDateTime.from(updated_at.toString() + '[America/Sao_Paulo]');

  return (
    <div className='flex gap-3'>
      <div
        data-testid='solicitacao_item_div'
        className='hover:scale-95 transition-transform hover:opacity-90 bg-gradient-to-r flex flex-1 from-primary to-secondary w-full rounded-xl p-2 justify-between text-white'
      >
        <div className='flex items-center justify-center ml-6 gap-4'>
          <FontAwesomeIcon
            icon={faUserCircle as IconDefinition}
            size='2x'
            color='lightgray'
          />
          <span className='text-lg font-bold'>{nome}</span>
          <span className='text-sm text-gray-300'>
            Última atualização em {zdt.toLocaleString('pt-BR')}
          </span>
        </div>
        <div
          className={classNames(
            'flex items-center my-2 px-2 w-1/6 justify-center rounded-xl shadow-2xl',
            colorAccordingToStatus('bg', status)
          )}
        >
          <span className='font-bold'>
            {SolicitacaoStatus.toString(status)}
          </span>
        </div>
      </div>
      {status === SolicitacaoStatus.Approved && (
        <button className='gap-2 hover:scale-95 transition-transform hover:opacity-90 bg-secondary flex rounded-xl px-2 items-center justify-between text-white'>
          <h2>Gerar</h2>
          <FontAwesomeIcon
            icon={faFilePdf as IconDefinition}
            size={'lg'}
            color='lightgray'
          />
        </button>
      )}
    </div>
  );
}
