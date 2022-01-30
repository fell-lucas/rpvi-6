import React, { Component } from 'react';

import { Button } from '../../components';
import { TextInput } from '../../components/Input';
import LandingCard from '../../components/LandingCard/LandingCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

import { EstagiarioRoute } from './Estagiario';
import './Solicitar.css';
import { SolicitacaoSuccessRoute } from './Success';
import { UnidadeConcedenteRoute } from './UnidadeConcedente';

export const InstituicaoRoute = '/solicitar/instituicao';

export default class Instituicao extends Component {
  render() {
    return (
      <>
        <ProgressBar items={3} active={3} />
        <LandingCard>
          <div className='formHeader'>
            <div>
              <h1>TERMO DE COMPROMISSO DE ESTÁGIO - TCE</h1>
              <hr />
              <h2>INSTITUIÇÃO DE ENSINO</h2>
            </div>
            <div className='inputGroup'>
              <div
                style={{
                  gridColumn: 'span 2 / 3',
                  justifyContent: 'flex-start !important',
                }}
              >
                <TextInput start label='Razão Social' name='instituicaoRazao' />
              </div>
              <TextInput label='Campus' name='instituicaoCampus' />
              <TextInput label='Endereço' name='instituicaoEndereco' />
              <TextInput label='Bairro' name='instituicaoBairro' />
              <TextInput label='CEP' name='instituicaoCEP' />
              <TextInput label='Cidade' name='instituicaoCidade' />
              <TextInput label='UF' name='instituicaoUF' />
              <TextInput label='CNPJ' name='instituicaoCNPJ' />
              <div
                style={{
                  gridColumn: 'span 2 / 3',
                  justifyContent: 'flex-start !important',
                }}
              >
                <TextInput
                  start
                  label='Nome do Representante Legal'
                  name='instituicaoRepresentanteNome'
                />
              </div>
              <TextInput
                label='Cargo'
                name='instituicaoRepresentanteCargo'
                placeholder='Cargo do Representante Legal'
              />
              <div
                style={{
                  gridColumn: 'span 2 / 3',
                  justifyContent: 'flex-start !important',
                }}
              >
                <TextInput
                  start
                  label='Nome do Orientador de Estágio'
                  name='instituicaoOrientadorNome'
                />
              </div>
              <TextInput
                label='Telefone'
                name='instituicaoTelefone'
                placeholder='(55) 9999-9999'
              />
            </div>
            <div className='endButtons'>
              <Button link={UnidadeConcedenteRoute} type='filled'>
                Voltar
              </Button>
              <div></div>
              <Button link={SolicitacaoSuccessRoute} type='filled'>
                Concluir
              </Button>
            </div>
          </div>
        </LandingCard>
      </>
    );
  }
}
