import { FormikErrors, FormikTouched } from 'formik';
import { Component } from 'react';

import { Solicitacao } from '../../../../models';
import { UnidadeConcedenteTextInputs } from './text-inputs';

type UnidadeConcedenteProps = {
  errors: FormikErrors<Solicitacao>;
  touched: FormikTouched<Solicitacao>;
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
        <div className='grid grid-cols-12 gap-4 items-center mt-8'>
          <UnidadeConcedenteTextInputs
            errors={this.props.errors}
            touched={this.props.touched}
          />
        </div>
      </>
    );
  }
}
