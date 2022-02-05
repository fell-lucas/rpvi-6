import { FormikErrors, FormikTouched } from 'formik';
import React, { Component } from 'react';

import { RadioInput, TextInput } from '../../../components';

import { Estagiario } from '../../../models';

type EstagiarioProps = {
  errors: FormikErrors<Estagiario>;
  touched: FormikTouched<Estagiario>;
};

export default class EstagiarioStep extends Component<EstagiarioProps> {
  render() {
    return (
      <>
        <div className='flex items-end flex-col'>
          <h2 className='font-bold text-2xl w-2/3 text-right border-b-gray-400 border-b pb-3'>
            ESTAGIÁRIO
          </h2>
        </div>
        <div className='grid grid-cols-12 gap-8 items-center mt-8'>
          <TextInput
            label='Nome'
            name='estagiarioNome'
            placeholder='Nome completo'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Endereço'
            name='estagiarioEndereco'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Cidade'
            name='estagiarioCidade'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Matrícula Nº'
            name='estagiarioMatricula'
            placeholder='xxxxxxxxxxx'
            inputSpan='col-span-3'
          />
          <TextInput
            label='E-mail'
            name='estagiarioEmail'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Bairro'
            name='estagiarioBairro'
            inputSpan='col-span-3'
          />
          <TextInput label='UF' name='estagiarioUF' inputSpan='col-span-3' />
          <TextInput
            label='Curso'
            name='estagiarioCurso'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Telefone'
            name='estagiarioTelefone'
            placeholder='(55) 9999-9999'
            inputSpan='col-span-3'
          />
          <TextInput label='CEP' name='estagiarioCEP' inputSpan='col-span-3' />
          <TextInput
            label='Campus'
            name='estagiarioCampus'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Semestre'
            name='estagiarioSemestre'
            inputSpan='col-span-3'
          />
          <div className='col-span-6 justify-start'>
            <RadioInput label='Estágio Curricular' name='estagiarioEstagio'>
              <option value='obrigatorio'>Obrigatório</option>
              <option value='naoObrigatorio'>Não Obrigatório</option>
            </RadioInput>
          </div>
        </div>
      </>
    );
  }
}
