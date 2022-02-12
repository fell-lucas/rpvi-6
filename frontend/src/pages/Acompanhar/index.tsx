import useAxios, { configure } from 'axios-hooks';
import classNames from 'classnames';
import Spinner from 'react-spinkit';

import { LandingCard, ProgressBar, SolicitacaoItem } from '../../components';

import { api, endpoints } from '../../services';

export const AcompanharRoute = '/acompanhar';

configure({ axios: api });

export default function Acompanhar() {
  const [{ data, loading, error }, refetch] = useAxios(endpoints.solicitacoes);
  console.log(data);

  return (
    <>
      <ProgressBar hide items={0} active={0} />
      <LandingCard>
        <div
          className={classNames(
            'flex',
            'flex-1',
            'flex-col',
            'h-full',
            'items-center',
            'justify-center'
          )}
        >
          <div className='flex items-end flex-col w-full mb-8'>
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
          ) : (
            <div className='w-full h-full'>
              <SolicitacaoItem />
            </div>
          )}
        </div>
      </LandingCard>
    </>
  );
}
