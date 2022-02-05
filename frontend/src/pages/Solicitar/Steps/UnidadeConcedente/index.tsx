import { FormikErrors, FormikTouched } from 'formik';
import React, { Component } from 'react';

import { TextInput } from '../../../../components';

import { UnidadeConcedente } from '../../../../models';

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
            name='unidadeConcedente.razaoSocial'
            inputSpan='col-span-6'
          />
          <TextInput
            label='Telefone'
            name='unidadeConcedente.telefone'
            placeholder='(55) 9999-9999'
            inputSpan='col-span-4'
          />
          <TextInput
            label='Endereço'
            name='unidadeConcedente.endereco'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Bairro'
            name='unidadeConcedente.bairro'
            inputSpan='col-span-2'
          />
          <TextInput
            label='CEP'
            name='unidadeConcedente.cep'
            inputSpan='col-span-4'
          />
          <TextInput
            label='Cidade'
            name='unidadeConcedente.cidade'
            inputSpan='col-span-3'
          />
          <TextInput
            label='UF'
            name='unidadeConcedente.uf'
            inputSpan='col-span-2'
          />
          <TextInput
            label='CNPJ'
            name='unidadeConcedente.cnpj'
            inputSpan='col-span-4'
          />
          <TextInput
            start
            label='Nome do Supervisor de Estágio'
            name='unidadeConcedente.supervisorEstagio'
            labelSpan='col-span-2'
            inputSpan='col-span-5'
          />
          <TextInput
            label='Cargo'
            name='unidadeConcedente.cargoSupervisor'
            placeholder='Cargo do Supervisor de Estágio'
            inputSpan='col-span-4'
          />
          <TextInput
            start
            label='Nome do Representante Legal'
            name='unidadeConcedente.representanteLegal'
            labelSpan='col-span-2'
            inputSpan='col-span-5'
          />
          <TextInput
            label='Cargo'
            name='unidadeConcedente.cargoRepresentante'
            placeholder='Cargo do Representante Legal'
            inputSpan='col-span-4'
          />
        </div>
      </>
    );
  }
}
