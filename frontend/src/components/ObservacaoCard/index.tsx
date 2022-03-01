import classNames from 'classnames';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { FaCheck, FaExclamation } from 'react-icons/fa';
import Spinner from 'react-spinkit';
import Swal from 'sweetalert2';
import { ZonedDateTime } from 'temporal-polyfill';

import useUser from '../../hooks/useUser';
import { Observacao } from '../../models';
import { api, endpoints } from '../../services';
import { errorAlert, warningAlert } from '../../utils/swal-alerts';

interface Props {
  obs: Observacao;
  disabled: boolean;
}

export const ObservacaoCard = ({
  obs: { created_at, nomeAutor, observacao, resolved, id },
  disabled = false,
}: Props) => {
  const zdt = ZonedDateTime.from(created_at.toString() + '[America/Sao_Paulo]');
  const [fakeResolved, setFakeResolved] = useState(resolved);
  const { isAluno } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleResolve = async () => {
    const { isConfirmed } = await Swal.fire({
      ...warningAlert,
      text: 'Deseja mesmo resolver?',
      confirmButtonText: 'Resolver',
    });
    if (!isConfirmed || !id) return;
    console.log(id);
    setIsLoading(true);
    try {
      await api.patch(
        `${endpoints.observacoes}/${id}`,
        JSON.stringify({ resolved: true } as Observacao)
      );
      setIsLoading(false);
      setFakeResolved(!resolved);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Swal.fire(errorAlert);
    }
  };

  return (
    <button
      title={disabled || fakeResolved || isAluno ? '' : 'Clique para resolver'}
      disabled={disabled || fakeResolved || isAluno}
      onClick={() => handleResolve()}
      className={classNames('group flex flex-col flex-start col-span-3')}
    >
      <div
        className={classNames(
          'transition-colors border w-full bg-white relative shadow-lg rounded-lg p-4 flex flex-col',
          {
            'border-green-400 group-hover:bg-green-500': fakeResolved,
            'border-amber-400 group-hover:bg-amber-500': !fakeResolved,
          }
        )}
      >
        {!fakeResolved && (
          <span className='animate-ping -top-3 -right-3 absolute h-6 w-6 rounded-full opacity-75 bg-amber-400'></span>
        )}
        <IconContext.Provider
          value={{
            color: 'white',
            className: classNames(
              'absolute p-1 -top-2 -right-2 rounded-full h-4 w-4',
              {
                'bg-green-500': fakeResolved,
                'bg-amber-500': !fakeResolved,
              }
            ),
          }}
        >
          {fakeResolved ? <FaCheck /> : <FaExclamation />}
        </IconContext.Provider>
        <>
          <h2 className='text-md text-left'>
            <span className='group-hover:text-white'>{nomeAutor}&nbsp;</span>
            <span className='text-gray-600 group-hover:text-gray-100'>
              escreveu:
            </span>
          </h2>
          {isLoading ? (
            <Spinner
              className={classNames('m-auto my-3', {
                'text-green-500 group-hover:text-green-200': fakeResolved,
                'text-amber-500 group-hover:text-amber-200': !fakeResolved,
              })}
              fadeIn='none'
              name='double-bounce'
            />
          ) : (
            <p className='text-lg py-3 text-left group-hover:text-white'>
              {observacao}
            </p>
          )}

          <div className='flex justify-between w-full'>
            <h2
              className={classNames('text-sm text-right font-bold ', {
                'text-green-500 group-hover:text-green-200': fakeResolved,
                'text-amber-500 group-hover:text-amber-200': !fakeResolved,
              })}
            >
              {fakeResolved ? 'Resolvido' : 'Pendente'}
            </h2>
            <h2 className='text-sm text-right text-gray-600 group-hover:text-gray-100'>
              {zdt.toLocaleString('pt-BR')}
            </h2>
          </div>
        </>
      </div>
    </button>
  );
};
