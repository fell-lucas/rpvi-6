import React, { Component } from 'react';

import { Button } from '../../components';
import { RadioInput, TextInput } from '../../components/Input';
import LandingCard from '../../components/LandingCard/LandingCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

import { HomeRoute } from '..';
import { UnidadeConcedenteRoute } from './UnidadeConcedente';

export const EstagiarioRoute = '/solicitar/estagiario';

export default class Estagiario extends Component {
  render() {
    return (
      <>
        <ProgressBar items={3} active={1} />
        <LandingCard>
          <div className='text-center flex flex-col justify-between gap-8'>
            <div>
              <h1>TERMO DE COMPROMISSO DE ESTÁGIO - TCE</h1>
              <hr />
              <h2 className='text-primary'>ESTAGIÁRIO</h2>
            </div>
            <div className='font-bold grid grid-cols-3 gap-4'>
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
              <div className='col-span-2 justify-start'>
                <RadioInput label='Estágio Curricular' name='estagiarioEstagio'>
                  <option value='obrigatorio'>Obrigatório</option>
                  <option value='naoObrigatorio'>Não Obrigatório</option>
                </RadioInput>
              </div>
            </div>
            <div className='grid grid-cols-3'>
              <Button link={HomeRoute} type='filled'>
                Voltar
              </Button>
              <div></div>
              <Button link={UnidadeConcedenteRoute} type='filled'>
                Próximo
              </Button>
            </div>
          </div>
        </LandingCard>
      </>
    );
  }
}
