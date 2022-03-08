import { FormikErrors, FormikTouched } from 'formik';
import { Component } from 'react';

import { Solicitacao } from '../../../../models';
import { EstagiarioTextInputs } from './text-inputs';

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
        <div className='grid md:grid-cols-8 grid-cols-12 gap-4 items-center mt-8'>
          <EstagiarioTextInputs
            errors={this.props.errors}
            touched={this.props.touched}
          />
        </div>
      </>
    );
  }
}
