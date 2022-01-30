import React, { Component } from 'react';

import user from '../../assets/user-empty.png';
import { LandingCard, OutlinedButton, ProgressBar } from '../../components';

import { EstagiarioRoute } from '../Solicitar/Estagiario/Estagiario';
import './Home.css';

export const HomeRoute = '/';
export default class Home extends Component {
  render() {
    return (
      <>
        <ProgressBar hide items={3} active={1} />
        <LandingCard>
          <div className='userInfo'>
            <img src={user} alt='user_pic' />
            <h1>Bem vindo, Usuário</h1>
            <h3>usuario.aluno@unipampa.edu.br</h3>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              flex: 1,
            }}
          >
            <OutlinedButton link={EstagiarioRoute}>
              Solicitar Termo de Compromisso de Estágio
            </OutlinedButton>
            <OutlinedButton link='/acompanhar'>
              Acompanhar Processo
            </OutlinedButton>
            <OutlinedButton link='/relatorio'>
              Submeter Relatório
            </OutlinedButton>
          </div>
        </LandingCard>
      </>
    );
  }
}
