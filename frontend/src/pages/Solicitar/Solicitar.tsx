import { Form, Formik, FormikErrors, FormikTouched } from 'formik';
import React, { Component, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';

import { Button, LandingCard, ProgressBar } from '../../components';

import { HomeRoute } from '..';
import { Estagiario, Instituicao, UnidadeConcedente } from '../../models';
import EstagiarioStep from './Steps/Estagiario';
import InstituicaoStep from './Steps/Instituicao';
import UnidadeConcedenteStep from './Steps/UnidadeConcedente';

export const SolicitarRoute = '/solicitar';

type Props = {
  navigation: NavigateFunction;
};
type State = {
  step: number;
};

class Solicitar extends Component<Props, State> {
  state = {
    step: 0,
  };

  render() {
    const handleSubmit = () => {
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
      errors: FormikErrors<Estagiario | Instituicao | UnidadeConcedente>,
      touched: FormikTouched<Estagiario | Instituicao | UnidadeConcedente>
    ) => {
      return [
        <EstagiarioStep
          key='estagiario_step'
          errors={errors as FormikErrors<Estagiario>}
          touched={touched as FormikTouched<Estagiario>}
        />,
        <InstituicaoStep
          key='instituicao_step'
          errors={errors as FormikErrors<Instituicao>}
          touched={touched as FormikTouched<Instituicao>}
        />,
        <UnidadeConcedenteStep
          key='unidade_step'
          errors={errors as FormikErrors<Instituicao>}
          touched={touched as FormikTouched<Instituicao>}
        />,
      ].map((element, index) => index === step && element);
    };
    return (
      <>
        <ProgressBar items={3} active={this.state.step + 1} />
        <LandingCard>
          <Formik enableReinitialize initialValues={{}} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <div className='text-center flex flex-col justify-between flex-1 h-full px-12 pt-8 gap-8'>
                <Form className='flex-1 flex flex-col h-full justify-between'>
                  {renderStep(this.state.step, errors, touched)}
                  <div className='grid grid-cols-6 mt-8'>
                    <Button type='button' outlined onClick={handleBack}>
                      {' '}
                      Voltar
                    </Button>
                    <div className='col-span-4'></div>
                    <Button onClick={handleSubmit}>Próximo</Button>
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
