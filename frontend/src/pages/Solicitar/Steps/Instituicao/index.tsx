import { FormikErrors, FormikTouched } from 'formik';
import { Component } from 'react';

import { TextInput } from '../../../../components';

import { Solicitacao } from '../../../../models';

type InstituicaoProps = {
  errors: FormikErrors<Solicitacao>;
  touched: FormikTouched<Solicitacao>;
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
        <div className='grid grid-cols-12 gap-4 items-center mt-8'>
          {[
            ['Razão Social', 'razaoSocial', 'Nome completo', '6'],
            ['Telefone', 'telefone', '( )', '4'],
            ['Endereço', 'endereco', '', '3'],
            ['Bairro', 'bairro', '', '2'],
            ['CEP', 'cep', '', '4'],
            ['Cidade', 'cidade', '', '3'],
            ['UF', 'uf', '', '2'],
            ['CNPJ', 'cnpj', '', '4'],
            ['Nome do Representante Legal', 'representanteLegal', '', '5', '2'],
            [
              'Cargo',
              'cargoRepresentante',
              'Cargo do Representante Legal',
              '4',
            ],
            [
              'Nome do Orientador de Estágio',
              'orientadorEstagio',
              '',
              '5',
              '2',
            ],
            ['Campus', 'campus', '', '4'],
          ].map(([label, name, ph, span, labelSpan]) => (
            <TextInput
              key={name}
              label={label}
              name={`instituicao.${name}`}
              placeholder={ph !== '' ? ph : label}
              inputSpan={span}
              labelSpan={labelSpan}
              errors={this.props.errors.instituicao}
              touched={this.props.touched.instituicao}
            />
          ))}
        </div>
      </>
    );
  }
}
