import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
          'border-green-400': resolved,
          'border-amber-400': !resolved,
        }
      )}
    >
      {!resolved && (
        <span className='animate-ping -top-3 -right-3 absolute h-6 w-6 rounded-full opacity-75 bg-amber-400'></span>
      )}
      <FontAwesomeIcon
        icon={
          resolved
            ? (faCheck as IconDefinition)
            : (faExclamation as IconDefinition)
        }
        color='white'
        size='sm'
        className={classNames(
          'absolute p-1 -top-3 -right-3 rounded-full h-4 w-4 bg-amber-500',
          {
            'bg-green-400': resolved,
            'bg-amber-400': !resolved,
          }
        )}
      />
      <h2 className='text-md'>
        {nomeAutor} <span className='text-gray-600'>escreveu:</span>
      </h2>
      <p className='text-lg py-3'>{observacao}</p>
      <div className='flex justify-between'>
        <h2
          className={classNames('text-sm text-right text-gray-600 font-bold', {
            'text-green-500': resolved,
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
