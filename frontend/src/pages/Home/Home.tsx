import React, { Component } from 'react';

import user from '../../assets/user-empty.png';
import { Button, LandingCard, ProgressBar } from '../../components';

import { EstagiarioRoute } from '../Solicitar/Estagiario';
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
            <Button link={EstagiarioRoute}>
              Solicitar Termo de Compromisso de Estágio
            </Button>
            <Button link='/acompanhar'>Acompanhar Processo</Button>
            <Button link='/relatorio'>Submeter Relatório</Button>
          </div>
        </LandingCard>
      </>
    );
  }
}
