import { FormikErrors, FormikTouched } from 'formik';
import { Component } from 'react';

import { Solicitacao } from '../../../../models';
import { DadosEstagioTextInputs } from './text-inputs';

type DadosEstagioProps = {
  errors: FormikErrors<Solicitacao>;
  touched: FormikTouched<Solicitacao>;
  values?: Solicitacao;
};

export default class DadosEstagioStep extends Component<DadosEstagioProps> {
  render() {
    return (
      <>
        <div className='flex items-end flex-col'>
          <h2 className='font-bold text-2xl w-2/3 text-right border-b-gray-400 border-b pb-3'>
            DADOS DO ESTÁGIO
          </h2>
        </div>
        <div className='grid md:grid-cols-8 lg:grid-cols-12 gap-4 items-center mt-8'>
          <DadosEstagioTextInputs
            errors={this.props.errors}
            touched={this.props.touched}
            values={this.props.values}
          />
        </div>
      </>
    );
  }
}
