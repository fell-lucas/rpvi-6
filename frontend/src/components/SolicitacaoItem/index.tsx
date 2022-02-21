import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FaFileExport } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ZonedDateTime } from 'temporal-polyfill';

import { AcompanharRoute } from '../../pages';
import { ExportarRoute } from '../../pages/Exportar';

import { Solicitacao, SolicitacaoStatus } from '../../models';
import { colorAccordingToStatus } from '../../utils';

interface SolicitacaoItemProps {
  solicitacao: Solicitacao;
}

export default function SolicitacaoItem({
  solicitacao: {
    id,
    estagiario: { nome },
    status,
    updated_at,
  },
}: SolicitacaoItemProps) {
  const zdt = ZonedDateTime.from(updated_at.toString() + '[America/Sao_Paulo]');

  return (
    <div className='flex gap-3'>
      <Link className='w-full' data-testid={id} to={`${AcompanharRoute}/${id}`}>
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
      </Link>
      {status === SolicitacaoStatus.Approved && (
        <Link
          className='hover:scale-95 transition-transform hover:opacity-90 bg-secondary flex rounded-xl px-2 items-center justify-between text-white'
          to={`${ExportarRoute}/${id}`}
        >
          <button className='flex gap-2 items-center'>
            <h2>Exportar</h2>
            <FaFileExport size={'2rem'} />
          </button>
        </Link>
      )}
    </div>
  );
}
