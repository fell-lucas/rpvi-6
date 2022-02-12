import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAxios, { configure } from 'axios-hooks';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';

import {
  Button,
  LandingCard,
  ProgressBar,
  SolicitacaoItem,
} from '../../components';

import { HomeRoute } from '..';
import { Solicitacao } from '../../models';
import { api, endpoints } from '../../services';

export const AcompanharRoute = '/acompanhar';

configure({ axios: api });

export default function Acompanhar() {
  const [{ data, loading, error }, refetch] = useAxios<Solicitacao[]>(
    endpoints.solicitacoes
  );

  return (
    <>
      <ProgressBar hide items={0} active={0} />
      <LandingCard>
        <div className='flex flex-1 flex-col h-full items-center justify-center'>
          <div className='flex items-end w-full mb-8'>
            <div className='w-1/3'>
              <Link to={HomeRoute}>
                <button
                  type='button'
                  data-testid='acompanhamentos_back'
                  className='text-primary text-4xl'
                >
                  <FontAwesomeIcon icon={faArrowLeft as IconProp} />
                </button>
              </Link>
            </div>
            <h2 className='font-bold text-2xl w-2/3 text-right border-b-gray-400 border-b pb-3'>
              SOLICITAÇÕES PENDENTES
            </h2>
          </div>

          {loading ? (
            <Spinner
              className='m-auto w-16 h-16'
              fadeIn='none'
              color='#009045'
              name='double-bounce'
            />
          ) : error ? (
            <div className='m-auto flex flex-col items-center gap-4'>
              <h2 className='text-xl text-red-700'>
                Algo deu errado ao recuperar as informações.
              </h2>
              <div>
                <Button onClick={() => refetch()}>Tentar novamente</Button>
              </div>
            </div>
          ) : data !== undefined ? (
            <div className='flex flex-col w-full h-full gap-2'>
              {data.map((solicitacao) => (
                <Link
                  key={solicitacao.id}
                  to={`${AcompanharRoute}/${solicitacao.id}`}
                >
                  <SolicitacaoItem
                    name={solicitacao.estagiario.nome}
                    status={solicitacao.status}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className='m-auto flex flex-col items-center gap-4'>
              <h2 className='text-xl text-gray-500'>
                Nenhuma solicitação cadastrada!
              </h2>
            </div>
          )}
        </div>
      </LandingCard>
    </>
  );
}
