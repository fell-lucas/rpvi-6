import React, { Component } from 'react';

import { Button } from '../../components';
import { RadioInput, TextInput } from '../../components/Input';
import LandingCard from '../../components/LandingCard/LandingCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

import { HomeRoute } from '..';
import { EstagiarioRoute } from './Estagiario';
import './Solicitar.css';

export const UnidadeConcedenteRoute = '/solicitar/unidade-concedente';

export default class UnidadeConcedente extends Component {
  render() {
    return (
      <>
        <ProgressBar items={3} active={2} />
        <LandingCard>
          <div className='formHeader'>
            <div>
              <h1>TERMO DE COMPROMISSO DE ESTÁGIO - TCE</h1>
              <hr />
              <h2>UNIDADE CONCEDENTE/SETOR DA UNIPAMPA</h2>
            </div>
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
              <TextInput label='E-mail' name='estagiarioEmail' />
              <TextInput label='Bairro' name='estagiarioBairro' />
              <TextInput label='UF' name='estagiarioUF' />
              <TextInput label='Curso' name='estagiarioCurso' />
              <TextInput
                label='Telefone'
                name='estagiarioTelefone'
                placeholder='(55) 9999-9999'
              />
              <TextInput label='CEP' name='estagiarioCEP' />
              <TextInput label='Campus' name='estagiarioCampus' />
              <TextInput label='Semestre' name='estagiarioSemestre' />
              <div
                style={{
                  gridColumn: 'span 2 / 3',
                  justifyContent: 'flex-start !important',
                }}
              >
                <RadioInput label='Estágio Curricular' name='estagiarioEstagio'>
                  <option value='obrigatorio'>Obrigatório</option>
                  <option value='naoObrigatorio'>Não Obrigatório</option>
                </RadioInput>
              </div>
            </div>
            <div className='endButtons'>
              <Button link={EstagiarioRoute} type='filled'>
                Voltar
              </Button>
              <div></div>
              <Button link={''} type='filled'>
                Próximo
              </Button>
            </div>
          </div>
        </LandingCard>
      </>
    );
  }
}
