import { FormikErrors, FormikTouched } from 'formik';
import { Component } from 'react';

import { Solicitacao } from '../../../../models';
import { InstituicaoTextInputs } from './text-inputs';

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
          <InstituicaoTextInputs
            errors={this.props.errors}
            touched={this.props.touched}
          />
        </div>
      </>
    );
  }
}
