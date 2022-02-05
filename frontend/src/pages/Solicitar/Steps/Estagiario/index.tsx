import { FormikErrors, FormikTouched } from 'formik';
import React, { Component } from 'react';

import { RadioInput, TextInput } from '../../../../components';

import { Estagiario } from '../../../../models';

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
            name='estagiario.nome'
            placeholder='Nome completo'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Endereço'
            name='estagiario.endereco'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Cidade'
            name='estagiario.cidade'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Matrícula Nº'
            name='estagiario.matricula'
            placeholder='xxxxxxxxxxx'
            inputSpan='col-span-3'
          />
          <TextInput
            label='E-mail'
            name='estagiario.email'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Bairro'
            name='estagiario.bairro'
            inputSpan='col-span-3'
          />
          <TextInput label='UF' name='estagiario.uf' inputSpan='col-span-3' />
          <TextInput
            label='Curso'
            name='estagiario.curso'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Telefone'
            name='estagiario.telefone'
            placeholder='(55) 9999-9999'
            inputSpan='col-span-3'
          />
          <TextInput label='CEP' name='estagiario.cep' inputSpan='col-span-3' />
          <TextInput
            label='Campus'
            name='estagiario.campus'
            inputSpan='col-span-3'
          />
          <TextInput
            label='Semestre'
            name='estagiario.semestre'
            inputSpan='col-span-3'
          />
          <div className='col-span-6 justify-start'>
            <RadioInput
              label='Estágio Curricular'
              name='estagiario.estagioObrigatorio'
            >
              <option value='obrigatorio'>Obrigatório</option>
              <option value='naoObrigatorio'>Não Obrigatório</option>
            </RadioInput>
          </div>
        </div>
      </>
    );
  }
}
