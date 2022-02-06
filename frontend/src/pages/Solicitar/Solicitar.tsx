import {
  Form,
  Formik,
  FormikConfig,
  FormikErrors,
  FormikHelpers,
  FormikTouched,
  FormikValues,
} from 'formik';
import React, { Component, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';
import Spinner from 'react-spinkit';
import Swal from 'sweetalert2';
import { ValidationError } from 'yup';

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
import {
  validationSchemaEstagiario,
  validationSchemaInstituicao,
  validationSchemaUnidade,
} from './Steps/validation-schema';

export const SolicitarRoute = '/solicitar';

type Props = {
  navigation: NavigateFunction;
};

type State = {
  step: number;
  isSubmitting: boolean;
};

const steps = ['estagiario', 'unidade', 'instituicao'];
const validationsSchemas = [
  validationSchemaEstagiario,
  validationSchemaUnidade,
  validationSchemaInstituicao,
];

class Solicitar extends Component<Props, State> {
  state = {
    step: 0,
    isSubmitting: false,
  };

  render() {
    const handleBack = () => {
      if (this.state.step === 0) {
        this.props.navigation(HomeRoute);
      }
      this.setState({ step: this.state.step - 1 });
    };

    const renderStep = (
      step: number,
      errors: FormikErrors<Solicitacao>,
      touched: FormikTouched<Solicitacao>,
      values: Solicitacao
    ) => {
      return [
        <EstagiarioStep
          key='estagiario_step'
          errors={errors as FormikErrors<Solicitacao>}
          touched={touched as FormikTouched<Solicitacao>}
          values={values}
        />,
        <UnidadeConcedenteStep
          key='unidade_step'
          errors={errors as FormikErrors<Solicitacao>}
          touched={touched as FormikTouched<Solicitacao>}
        />,
        <InstituicaoStep
          key='instituicao_step'
          errors={errors as FormikErrors<Solicitacao>}
          touched={touched as FormikTouched<Solicitacao>}
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
            validationSchema={validationsSchemas[this.state.step]}
            onSubmit={(
              values: Solicitacao,
              { setSubmitting }: FormikHelpers<Solicitacao>
            ) => {
              console.log(values);

              if (this.state.step !== steps.length - 1) {
                setSubmitting(false);
                this.setState({ step: this.state.step + 1 });
                return;
              }
              setTimeout(() => {
                Swal.fire({
                  title: 'Error!',
                  text: 'Do you want to continue',
                  icon: 'error',
                  confirmButtonText: 'Cool',
                });
                setSubmitting(false);
              }, 500);
            }}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting }) => (
              <div className='text-center flex flex-col justify-between flex-1 h-full px-12 pt-8 gap-8'>
                <Form
                  onSubmit={handleSubmit}
                  className='flex-1 flex flex-col h-full justify-between'
                >
                  {renderStep(this.state.step, errors, touched, values)}
                  {console.log(errors)}
                  <div className='grid grid-cols-6 mt-8'>
                    <Button type='button' outlined onClick={handleBack}>
                      Voltar
                    </Button>
                    <div className='col-span-4'></div>
                    <Button disabled={isSubmitting} type='submit'>
                      {isSubmitting ? (
                        <Spinner
                          className='m-auto'
                          fadeIn='none'
                          color='#FFF'
                          name='double-bounce'
                        />
                      ) : this.state.step !== steps.length - 1 ? (
                        'Próximo'
                      ) : (
                        'Enviar'
                      )}
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
