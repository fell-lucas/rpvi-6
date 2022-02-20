import classNames from 'classnames';
import { ZonedDateTime } from 'temporal-polyfill';

import { Observacao } from '../../models';

interface Props {
  obs: Observacao;
}

export const ObservacaoCard = ({
  obs: { created_at, nomeAutor, observacao, resolved },
}: Props) => {
  const zdt = ZonedDateTime.from(created_at.toString() + '[America/Sao_Paulo]');

  return (
    <div
      className={classNames(
        'border col-span-3 bg-white relative shadow-lg rounded-lg p-4 flex flex-col',
        {
          'border-sky-400': resolved,
          'border-amber-400': !resolved,
        }
      )}
    >
      <span
        className={classNames(
          'animate-ping -top-2 -right-2 absolute h-4 w-4 rounded-full opacity-75',
          {
            'bg-sky-400': resolved,
            'bg-amber-400': !resolved,
          }
        )}
      ></span>
      <span
        className={classNames(
          'absolute -top-2 -right-2 rounded-full h-4 w-4 bg-amber-500',
          {
            'bg-sky-400': resolved,
            'bg-amber-400': !resolved,
          }
        )}
      ></span>
      <h2 className='text-md'>
        {nomeAutor} <span className='text-gray-600'>escreveu:</span>
      </h2>
      <p className='text-lg py-3'>{observacao}</p>
      <div className='flex justify-between'>
        <h2
          className={classNames('text-sm text-right text-gray-600 font-bold', {
            'text-sky-500': resolved,
            'text-amber-500': !resolved,
          })}
        >
          {resolved ? 'Resolvido' : 'Pendente'}
        </h2>
        <h2 className='text-sm text-right text-gray-600'>
          {zdt.toLocaleString('pt-BR')}
        </h2>
      </div>
    </div>
  );
};
