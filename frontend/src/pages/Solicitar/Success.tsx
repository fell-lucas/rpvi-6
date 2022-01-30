import React, { Component } from 'react';

import { Button } from '../../components';
import LandingCard from '../../components/LandingCard/LandingCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

import './Solicitar.css';

export const SolicitacaoSuccessRoute = '/solicitar/sucesso';

export default class SolicitacaoSuccess extends Component {
  render() {
    return (
      <>
        <ProgressBar items={3} active={3} />
        <LandingCard>
          <div className='formHeader'>
            <div>
              <h1>
                SUA SOLICITAÇÃO DE TERMO DE COMPROMISSO<br></br> DE ESTÁGIO FOI
                CONCLUÍDA COM SUCESSO
              </h1>
              <hr style={{ margin: '3rem' }} />
              <div style={{ paddingLeft: '10rem', paddingRight: '10rem' }}>
                <Button link={''} type='filled'>
                  Acompanhar Processo
                </Button>
              </div>
            </div>
          </div>
        </LandingCard>
      </>
    );
  }
}
