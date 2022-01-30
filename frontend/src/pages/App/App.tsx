import LandingCard from '../../components/LandingCard/LandingCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import user from '../../assets/user-empty.png';
import './App.css';
import OutlinedButton from '../../components/OutlinedButton/OutlinedButton';
import { EstagiarioRoute } from '../Solicitar/Estagiario/Estagiario';

import React, { Component } from 'react';

export default class App extends Component {
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
