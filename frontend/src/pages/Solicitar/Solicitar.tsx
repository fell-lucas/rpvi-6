import {
  Form,
  Formik,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from 'formik';
import React, { Component, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';

import { Button, LandingCard, ProgressBar } from '../../components';

import { HomeRoute } from '..';
import {
  Estagiario,
  Instituicao,
  Solicitacao,
  UnidadeConcedente,
} from '../../models';
import EstagiarioStep from './Steps/Estagiario';
import { estagiarioInitialValues } from './Steps/Estagiario/initial-values';
import InstituicaoStep from './Steps/Instituicao';
import { instituicaoInitialValues } from './Steps/Instituicao/initial-values';
import UnidadeConcedenteStep from './Steps/UnidadeConcedente';
import { unidadeInitialValues } from './Steps/UnidadeConcedente/initialValues';

export const SolicitarRoute = '/solicitar';

type Props = {
  navigation: NavigateFunction;
};
type State = {
  step: number;
};

const steps = ['estagiario', 'unidade', 'instituicao'];

class Solicitar extends Component<Props, State> {
  state = {
    step: 0,
  };

  render() {
    const handleSubmit = (values: Solicitacao) => {
      if (this.state.step === steps.length - 1) {
        alert(JSON.stringify(values, null, 2));
        return;
      }
      this.setState({ step: this.state.step + 1 });
    };

    const handleBack = () => {
      if (this.state.step === 0) {
        this.props.navigation(HomeRoute);
      }
      this.setState({ step: this.state.step - 1 });
    };

    const renderStep = (
      step: number,
      errors: FormikErrors<Solicitacao>,
      touched: FormikTouched<Solicitacao>
    ) => {
      return [
        <EstagiarioStep
          key='estagiario_step'
          errors={errors as FormikErrors<Estagiario>}
          touched={touched as FormikTouched<Estagiario>}
        />,
        <UnidadeConcedenteStep
          key='unidade_step'
          errors={errors as FormikErrors<UnidadeConcedente>}
          touched={touched as FormikTouched<UnidadeConcedente>}
        />,
        <InstituicaoStep
          key='instituicao_step'
          errors={errors as FormikErrors<Instituicao>}
          touched={touched as FormikTouched<Instituicao>}
        />,
      ].map((element, index) => index === step && element);
    };

    return (
      <>
        <ProgressBar items={3} active={this.state.step + 1} />
        <LandingCard>
          <Formik
            enableReinitialize
            initialValues={
              {
                estagiario: estagiarioInitialValues,
                instituicao: instituicaoInitialValues,
                unidadeConcedente: unidadeInitialValues,
              } as Solicitacao
            }
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched }) => (
              <div className='text-center flex flex-col justify-between flex-1 h-full px-12 pt-8 gap-8'>
                <Form className='flex-1 flex flex-col h-full justify-between'>
                  {renderStep(this.state.step, errors, touched)}
                  <div className='grid grid-cols-6 mt-8'>
                    <Button type='button' outlined onClick={handleBack}>
                      {' '}
                      Voltar
                    </Button>
                    <div className='col-span-4'></div>
                    <Button onClick={() => handleSubmit(values)}>
                      {this.state.step !== steps.length - 1
                        ? 'Próximo'
                        : 'Enviar'}
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </LandingCard>
      </>
    );
  }
}

export default () => {
  const navigation = useNavigate();

  return <Solicitar navigation={navigation}></Solicitar>;
};
