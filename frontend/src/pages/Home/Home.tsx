import classNames from 'classnames';
import { Component } from 'react';
import { Link } from 'react-router-dom';

import emptyFile from '../../assets/file-empty.svg';
import multipleFiles from '../../assets/file-multiple.svg';
import writtenFile from '../../assets/file-written.svg';
import logo from '../../assets/unipampa.png';
import { LandingCard, ProgressBar } from '../../components';

import { SolicitarRoute } from '../Solicitar/Solicitar';

export const HomeRoute = '/';
export default class Home extends Component {
  render() {
    return (
      <>
        <ProgressBar hide items={3} active={1} />
        <LandingCard>
          <div className='flex flex-1 flex-col h-full items-center justify-center'>
            <div className='flex flex-col items-center justify-center flex-1 gap-6'>
              <img src={logo} width='80%' alt='unipampa_logo' />
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 flex-1 mt-8'>
              {[
                [
                  SolicitarRoute,
                  'Solicitar Termo de Compromisso de Estágio',
                  emptyFile,
                ],
                ['/acompanhar', 'Acompanhar Processo', writtenFile],
                ['/relatorio', 'Submeter Relatórios', multipleFiles],
              ].map(([url, desc, img]) => (
                <Link
                  className={classNames(
                    'h-60 hover:scale-90 transition-transform',
                    { 'pointer-events-none opacity-50': url === '/relatorio' }
                  )}
                  to={url}
                  key={url}
                  data-testid={`btn_${url}`}
                >
                  <div className='w-[16rem] h-full items-center flex justify-center flex-col gap-8 p-4 shadow-lg rounded-lg '>
                    <img src={img} alt={`${img}_icon`} />
                    <p className='text-center'>{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </LandingCard>
      </>
    );
  }
}
