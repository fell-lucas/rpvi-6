import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import user from '../../assets/user-empty.png';
import { Button, LandingCard, ProgressBar } from '../../components';

import { SolicitarRoute } from '../Solicitar/Solicitar';

export const HomeRoute = '/';
export default class Home extends Component {
  render() {
    return (
      <>
        <ProgressBar hide items={3} active={1} />
        <LandingCard>
          <div className='flex flex-1 h-full items-center justify-center'>
            <div className='flex flex-col items-center justify-center flex-1 gap-6'>
              <img src={user} alt='user_pic' />
              <h1>Bem vindo, Usuário</h1>
              <h3>usuario.aluno@unipampa.edu.br</h3>
            </div>
            <div className='flex flex-col gap-4 flex-1'>
              {[
                [SolicitarRoute, 'Solicitar Termo de Compromisso de Estágio'],
                ['/acompanhar', 'Acompanhar Processo'],
                ['/relatorio', 'Submeter Relatório'],
              ].map(([url, desc]) => (
                <Link to={url} key={url}>
                  <Button outlined>{desc}</Button>
                </Link>
              ))}
            </div>
          </div>
        </LandingCard>
      </>
    );
  }
}
