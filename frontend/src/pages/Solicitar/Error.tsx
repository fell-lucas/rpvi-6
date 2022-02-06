import React, { Component } from 'react';

import { Button, Done } from '../../components';
import LandingCard from '../../components/LandingCard/LandingCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

export const SolicitacaoErrorRoute = '/solicitar/erro';

export default class SolicitacaoError extends Component {
  render() {
    return (
      <>
        <ProgressBar items={3} active={3} />
        <LandingCard>
          <Done btnLink='' btnText='Voltar'>
            SUA SOLICITAÇÃO DE TERMO DE COMPROMISSO<br></br> DE ESTÁGIO NÃO FOI
            CONCLUÍDA
          </Done>
        </LandingCard>
      </>
    );
  }
}
