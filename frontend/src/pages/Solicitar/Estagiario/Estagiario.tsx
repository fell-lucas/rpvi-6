import React, { Component } from 'react';

import { RadioInput, TextInput } from '../../../components/Input';
import LandingCard from '../../../components/LandingCard/LandingCard';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';

import '../Solicitar.css';

export const EstagiarioRoute = '/solicitar/estagiario';

export default class Estagiario extends Component {
  render() {
    return (
      <>
        <ProgressBar items={3} active={1} />
        <LandingCard>
          <div className='formHeader'>
            <h1>TERMO DE COMPROMISSO DE ESTÁGIO - TCE</h1>
            <hr />
            <h2>ESTAGIÁRIO</h2>
            <div>
              <div className='inputGroup'>
                <TextInput
                  label='Nome'
                  name='estagiarioNome'
                  placeholder='Nome completo'
                />
                <TextInput label='Endereço' name='estagiarioEndereco' />
                <TextInput label='Cidade' name='estagiarioCidade' />
                <TextInput
                  label='Matrícula Nº'
                  name='estagiarioMatricula'
                  placeholder='xxxxxxxxxxx'
                />
                <RadioInput label='Estágio Curricular' name='estagiarioEstagio'>
                  <option value='obrigatorio'>Obrigatório</option>
                  <option value='naoObrigatorio'>Não Obrigatório</option>
                </RadioInput>
              </div>
            </div>
          </div>
        </LandingCard>
      </>
    );
  }
}
