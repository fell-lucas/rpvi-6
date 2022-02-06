import { Field, FormikErrors, FormikTouched } from 'formik';
import React, { Component } from 'react';

import {
  RadioButton,
  RadioButtonGroup,
  TextInput,
} from '../../../../components';

import { Solicitacao } from '../../../../models';

type EstagiarioProps = {
  errors: FormikErrors<Solicitacao>;
  touched: FormikTouched<Solicitacao>;
  values?: Solicitacao;
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
        <div className='grid grid-cols-12 gap-4 items-center mt-8'>
          {[
            ['Nome', 'nome', 'Nome completo', '3'],
            ['Endereço', 'endereco', '', '3'],
            ['Cidade', 'cidade', '', '3'],
            ['Matrícula Nº', 'matricula', '**********', '3'],
            ['E-mail', 'email', '', '3'],
            ['Bairro', 'bairro', '', '3'],
            ['UF', 'uf', '', '3'],
            ['Curso', 'curso', '', '3'],
            ['Telefone', 'telefone', '( )', '3'],
            ['CEP', 'cep', '', '3'],
            ['Campus', 'campus', '', '3'],
            ['Semestre', 'semestre', '', '3'],
          ].map(([label, name, ph, span]) => (
            <TextInput
              key={name}
              label={label}
              name={`estagiario.${name}`}
              placeholder={ph !== '' ? ph : label}
              inputSpan={`col-span-${span}`}
              errors={this.props.errors}
              touched={this.props.touched}
            />
          ))}
          <div className='col-span-6 justify-start'>
            <RadioButtonGroup
              label='Estágio Obrigatório : '
              error={this.props.errors.estagiario?.estagioObrigatorio}
              touched={this.props.touched.estagiario?.estagioObrigatorio}
            >
              <Field
                component={RadioButton}
                name='estagiario.estagioObrigatorio'
                id='estagiario.estagioObrigatorio1'
                label='Obrigatório'
              />
              <Field
                component={RadioButton}
                name='estagiario.estagioObrigatorio'
                id='estagiario.estagioObrigatorio2'
                label='Não obrigatório'
              />
            </RadioButtonGroup>
          </div>
        </div>
      </>
    );
  }
}
