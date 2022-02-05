import { FormikErrors, FormikTouched } from 'formik';
import React, { Component } from 'react';

import { TextInput } from '../../../components';

import { UnidadeConcedente } from '../../../models';

type UnidadeConcedenteProps = {
  errors: FormikErrors<UnidadeConcedente>;
  touched: FormikTouched<UnidadeConcedente>;
};

export default class UnidadeConcedenteStep extends Component<UnidadeConcedenteProps> {
  render() {
    return (
      <>
        <div className='flex items-end flex-col'>
          <h2 className='font-bold text-2xl w-2/3 text-right border-b-gray-400 border-b pb-3'>
            UNIDADE CONCEDENTE / SETOR DA UNIPAMPA
          </h2>
        </div>
        <div className='grid grid-cols-12 gap-8 items-center mt-8'>
          <TextInput
            start
            label='Razão Social'
            name='unidadeRazao'
            inputSpan='col-span-6'
          />
          <TextInput
            label='Telefone'
            name='unidadeTelefone'
            placeholder='(55) 9999-9999'
            inputSpan='col-span-4'
          />
          <TextInput
            label='Endereço'
            name='unidadeEndereco'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Bairro'
            name='unidadeBairro'
            inputSpan='col-span-2'
          />
          <TextInput label='CEP' name='unidadeCEP' inputSpan='col-span-4' />
          <TextInput
            label='Cidade'
            name='unidadeCidade'
            inputSpan='col-span-3'
          />
          <TextInput label='UF' name='unidadeUF' inputSpan='col-span-2' />
          <TextInput label='CNPJ' name='unidadeCNPJ' inputSpan='col-span-4' />
          <TextInput
            start
            label='Nome do Supervisor de Estágio'
            name='unidadeOrientadorNome'
            labelSpan='col-span-2'
            inputSpan='col-span-5'
          />
          <TextInput
            label='Cargo'
            name='unidadeSupervisorCargo'
            placeholder='Cargo do Supervisor de Estágio'
            inputSpan='col-span-4'
          />
          <TextInput
            start
            label='Nome do Representante Legal'
            name='unidadeRepresentanteNome'
            labelSpan='col-span-2'
            inputSpan='col-span-5'
          />
          <TextInput
            label='Cargo'
            name='unidadeRepresentanteCargo'
            placeholder='Cargo do Representante Legal'
            inputSpan='col-span-4'
          />
        </div>
      </>
    );
  }
}
