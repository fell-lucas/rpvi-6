import React, { Component } from 'react';

import { Button, Done } from '../../components';
import LandingCard from '../../components/LandingCard/LandingCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

export const SolicitacaoSuccessRoute = '/solicitar/sucesso';

export default class SolicitacaoSuccess extends Component {
  render() {
    return (
      <>
        <ProgressBar items={3} active={3} />
        <LandingCard>
          <Done btnLink='' btnText='Acompanhar Processo'>
            SUA SOLICITAÇÃO DE TERMO DE COMPROMISSO<br></br> DE ESTÁGIO FOI
            CONCLUÍDA COM SUCESSO
          </Done>
        </LandingCard>
      </>
    );
  }
}
