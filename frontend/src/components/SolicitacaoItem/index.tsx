import classNames from 'classnames';
import { FaUserCircle } from 'react-icons/fa';
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
    unidadeConcedente: { razaoSocial },
    updated_at,
  },
}: SolicitacaoItemProps) {
  const zdt = ZonedDateTime.from(
    updated_at!.toString() + '[America/Sao_Paulo]'
  );

  return (
    <div className='flex gap-3'>
      <Link className='w-full' data-testid={id} to={`${AcompanharRoute}/${id}`}>
        <div
          data-testid='solicitacao_item_div'
          className='hover:scale-95 transition-transform hover:opacity-90 bg-gradient-to-r flex flex-1 from-primary to-secondary w-full rounded-xl p-[4px] px-2 justify-between text-white'
        >
          <div className='flex items-center justify-center ml-6 gap-4'>
            <FaUserCircle size='1.7rem' color='lightgray' />
            <span className='text-lg font-bold'>{nome}</span>
            <span className='text-sm text-gray-300'>Atualizado em</span>
            <span className='text-white text-sm font-medium'>{` ${zdt.toLocaleString(
              'pt-BR'
            )} `}</span>
            <span className='text-sm text-gray-300'>Unidade Concedente: </span>
            <span className='text-md text-white font-medium'>
              {razaoSocial}
            </span>
          </div>
          <div
            className={classNames(
              'flex items-center my-2 px-2 w-1/6 justify-center rounded-xl shadow-2xl text-center',
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
