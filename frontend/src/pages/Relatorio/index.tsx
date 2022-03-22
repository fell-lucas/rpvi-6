import { Component } from 'react';
import { Link } from 'react-router-dom';

import underConstruction2 from '../../assets/under-construction2.gif';
import underConstruction from '../../assets/under-construction.gif';
import { Button, LandingCard, ProgressBar } from '../../components';

import { HomeRoute } from '../Home/Home';

export const RelatorioRoute = '/relatorio';
export default class Relatorio extends Component {
  render() {
    return (
      <>
        <ProgressBar hide items={3} active={1} />
        <LandingCard>
          <div className='flex flex-col justify-between h-full'>
            <div className='flex flex-col gap-3'>
              <h1 className='text-3xl text-gray-500 text-center'>
                Ainda não há nada aqui.
              </h1>
            </div>
            <div className='h-full items-center flex gap-6'>
              <img src={underConstruction} alt='Under Construction 1' />
              <img src={underConstruction2} alt='Under Construction' />
            </div>
            <Link to={HomeRoute}>
              <Button>Voltar</Button>
            </Link>
          </div>
        </LandingCard>
      </>
    );
  }
}
