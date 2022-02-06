import React, { Component } from 'react';

import { Button } from '../../components';
import { TextInput } from '../../components/Input';
import LandingCard from '../../components/LandingCard/LandingCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

import { EstagiarioRoute } from './Estagiario';
import { InstituicaoRoute } from './Instituicao';

export const UnidadeConcedenteRoute = '/solicitar/unidade-concedente';

export default class UnidadeConcedente extends Component {
  render() {
    return (
      <>
        <ProgressBar items={3} active={2} />
        <LandingCard>
          <div className='text-center flex flex-col justify-between gap-8'>
            <div>
              <h1>TERMO DE COMPROMISSO DE ESTÁGIO - TCE</h1>
              <hr />
              <h2 className='text-primary'>
                UNIDADE CONCEDENTE/SETOR DA UNIPAMPA
              </h2>
            </div>
            <div className='font-bold grid grid-cols-3 gap-4'>
              <div className='col-span-2 justify-start'>
                <TextInput start label='Razão Social' name='ucRazao' />
              </div>
              <TextInput
                label='Telefone'
                name='ucTelefone'
                placeholder='(55) 9999-9999'
              />
              <TextInput label='Endereço' name='ucEndereco' />
              <TextInput label='Bairro' name='ucBairro' />
              <TextInput label='CEP' name='ucCEP' />
              <TextInput label='Cidade' name='ucCidade' />
              <TextInput label='UF' name='ucUF' />
              <TextInput label='CNPJ' name='ucCNPJ' />
              <div className='col-span-2 justify-start'>
                <TextInput
                  start
                  label='Nome do Supervisor de Estágio'
                  name='ucSupervisorNome'
                />
              </div>
              <TextInput
                label='Cargo'
                name='ucSupervisorCargo'
                placeholder='Cargo do Supervisor de Estágio'
              />
              <div className='col-span-2 justify-start'>
                <TextInput
                  start
                  label='Nome do Representante Legal'
                  name='ucRepresentanteNome'
                />
              </div>
              <TextInput
                label='Cargo'
                name='ucRepresentanteCargo'
                placeholder='Cargo do Representante Legal'
              />
            </div>
            <div className='grid grid-cols-3'>
              <Button link={EstagiarioRoute} type='filled'>
                Voltar
              </Button>
              <div></div>
              <Button link={InstituicaoRoute} type='filled'>
                Próximo
              </Button>
            </div>
          </div>
        </LandingCard>
      </>
    );
  }
}
