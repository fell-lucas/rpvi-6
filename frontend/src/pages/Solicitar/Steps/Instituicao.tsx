import { FormikErrors, FormikTouched } from 'formik';
import React, { Component } from 'react';

import { TextInput } from '../../../components';

import { Instituicao } from '../../../models';

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
            name='instituicaoRazao'
            inputSpan='col-span-6'
          />
          <TextInput
            label='Telefone'
            name='instituicaoTelefone'
            placeholder='(55) 9999-9999'
            inputSpan='col-span-4'
          />
          <TextInput
            label='Endereço'
            name='instituicaoEndereco'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Bairro'
            name='instituicaoBairro'
            inputSpan='col-span-2'
          />
          <TextInput label='CEP' name='instituicaoCEP' inputSpan='col-span-4' />
          <TextInput
            label='Cidade'
            name='instituicaoCidade'
            inputSpan='col-span-3'
          />
          <TextInput label='UF' name='instituicaoUF' inputSpan='col-span-2' />
          <TextInput
            label='CNPJ'
            name='instituicaoCNPJ'
            inputSpan='col-span-4'
          />
          <TextInput
            start
            label='Nome do Representante Legal'
            name='instituicaoRepresentanteNome'
            labelSpan='col-span-2'
            inputSpan='col-span-5'
          />
          <TextInput
            label='Cargo'
            name='instituicaoRepresentanteCargo'
            placeholder='Cargo do Representante Legal'
            inputSpan='col-span-4'
          />
          <TextInput
            start
            label='Nome do Orientador de Estágio'
            name='instituicaoOrientadorNome'
            labelSpan='col-span-2'
            inputSpan='col-span-5'
          />
          <TextInput
            label='Campus'
            name='instituicaoCampus'
            inputSpan='col-span-4'
          />
        </div>
      </>
    );
  }
}
