import { FormikErrors, FormikTouched } from 'formik';
import React, { Component } from 'react';

import { TextInput } from '../../../../components';

import { Instituicao } from '../../../../models';

type InstituicaoProps = {
  errors: FormikErrors<Instituicao>;
  touched: FormikTouched<Instituicao>;
};

export default class InstituicaoStep extends Component<InstituicaoProps> {
  render() {
    return (
      <>
        <div className='flex items-end flex-col'>
          <h2 className='font-bold text-2xl w-2/3 text-right border-b-gray-400 border-b pb-3'>
            INSTITUIÇÃO DE ENSINO
          </h2>
        </div>
        <div className='grid grid-cols-12 gap-8 items-center mt-8'>
          <TextInput
            start
            label='Razão Social'
            name='instituicao.razaoSocial'
            inputSpan='col-span-6'
          />
          <TextInput
            label='Telefone'
            name='instituicao.telefone'
            placeholder='(55) 9999-9999'
            inputSpan='col-span-4'
          />
          <TextInput
            label='Endereço'
            name='instituicao.endereco'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Bairro'
            name='instituicao.bairro'
            inputSpan='col-span-2'
          />
          <TextInput
            label='CEP'
            name='instituicao.cep'
            inputSpan='col-span-4'
          />
          <TextInput
            label='Cidade'
            name='instituicao.cidade'
            inputSpan='col-span-3'
          />
          <TextInput label='UF' name='instituicao.uf' inputSpan='col-span-2' />
          <TextInput
            label='CNPJ'
            name='instituicao.cnpj'
            inputSpan='col-span-4'
          />
          <TextInput
            start
            label='Nome do Representante Legal'
            name='instituicao.representanteLegal'
            labelSpan='col-span-2'
            inputSpan='col-span-5'
          />
          <TextInput
            label='Cargo'
            name='instituicao.cargoRepresentante'
            placeholder='Cargo do Representante Legal'
            inputSpan='col-span-4'
          />
          <TextInput
            start
            label='Nome do Orientador de Estágio'
            name='instituicao.orientadorEstagio'
            labelSpan='col-span-2'
            inputSpan='col-span-5'
          />
          <TextInput
            label='Campus'
            name='instituicao.campus'
            inputSpan='col-span-4'
          />
        </div>
      </>
    );
  }
}
